/**
 * Job: Send weekly Reader email/text to subscribers
 *
 * Reads subscribers from a Google Sheet via authenticated Apps Script endpoint,
 * sends each an email (via Gmail SMTP) and SMS (via Twilio).
 *
 * Secrets loaded from ~/.config/.env:
 *   GMAIL_USER, GMAIL_APP_PASSWORD, SUBSCRIBER_TOKEN,
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MESSAGING_SERVICE_SID
 */

import 'dotenv/config';
import { createTransport } from 'nodemailer';
import { createHmac } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import twilio from 'twilio';
import { Pool } from 'pg';

// ── Secret loading ──────────────────────────────────────────────────

interface Secrets {
  gmailUser: string;
  gmailAppPassword: string;
}

const ENV_PATH = join(process.env.HOME ?? '/Users/bedwards', '.config', '.env');
const ENV_CONTENT = readFileSync(ENV_PATH, 'utf-8');

function loadSecret(key: string): string {
  const match = ENV_CONTENT.match(new RegExp(`^${key}=(.+)$`, 'm'));
  if (!match) {throw new Error(`${key} not found in ~/.config/.env`);}
  return match[1].trim();
}

function loadSecrets(): Secrets {
  return {
    gmailUser: loadSecret('GMAIL_USER'),
    gmailAppPassword: loadSecret('GMAIL_APP_PASSWORD'),
  };
}

// ── Subscriber types ────────────────────────────────────────────────

interface Subscriber {
  name: string;
  email: string;
  phone: string;
  carrier: string;
}


// ── Fetch subscribers via authenticated Apps Script endpoint ────────

async function fetchSubscribers(): Promise<Subscriber[]> {
  const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw484H_YXlBlQ5lFGmz4-6nOls4jEBU5lWGL3yf5ZTQpyihux47AcwZ2MN2F1R9eFfoxw/exec';
  const token = loadSecret('SUBSCRIBER_TOKEN');

  const response = await fetch(`${appsScriptUrl}?token=${token}`, {
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch subscribers: ${response.status}`);
  }

  const data = await response.json() as {
    status: string;
    subscribers?: Array<{ email: string; phone: string; carrier: string }>;
  };

  if (data.status !== 'ok' || !data.subscribers) {
    throw new Error(`Subscriber API error: ${data.status}`);
  }

  return data.subscribers
    .filter(s => s.email || s.phone)
    .map(s => ({
      name: '',
      email: s.email ?? '',
      phone: s.phone ?? '',
      carrier: (s.carrier ?? '').toLowerCase(),
    }));
}


// ── Week calculation (matches weekly.ts) ────────────────────────────

interface WeekInfo {
  label: string;
  display: string;
}

function getCurrentWeek(): WeekInfo {
  const now = new Date();
  // Find the Saturday that starts this week
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay();
  const diffToSat = day >= 6 ? day - 6 : day + 1;
  const saturday = new Date(d);
  saturday.setUTCDate(d.getUTCDate() - diffToSat);

  const friday = new Date(saturday);
  friday.setUTCDate(saturday.getUTCDate() + 6);

  // Match weekly.ts label format: hex-index-YYYY-MM-DD (Friday date)
  const label = `hex-index-${friday.getUTCFullYear()}-${String(friday.getUTCMonth() + 1).padStart(2, '0')}-${String(friday.getUTCDate()).padStart(2, '0')}`;

  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
  const startMonth = monthFmt.format(saturday);
  const endMonth = monthFmt.format(friday);
  const year = saturday.getUTCFullYear();

  let display: string;
  if (startMonth === endMonth) {
    display = `${startMonth} ${saturday.getUTCDate()}\u2013${friday.getUTCDate()}, ${year}`;
  } else {
    display = `${startMonth} ${saturday.getUTCDate()} \u2013 ${endMonth} ${friday.getUTCDate()}, ${year}`;
  }

  return { label, display };
}

// ── Unsubscribe link ────────────────────────────────────────────────

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw484H_YXlBlQ5lFGmz4-6nOls4jEBU5lWGL3yf5ZTQpyihux47AcwZ2MN2F1R9eFfoxw/exec';

function buildUnsubscribeUrl(email: string): string {
  const token = loadSecret('SUBSCRIBER_TOKEN');
  const sig = createHmac('sha256', token).update(email.trim().toLowerCase()).digest('hex').slice(0, 16);
  return `${APPS_SCRIPT_URL}?action=unsubscribe&email=${encodeURIComponent(email.trim().toLowerCase())}&sig=${sig}`;
}

// ── Affiliate book picks ────────────────────────────────────────────

interface AffiliateBook {
  title: string;
  author: string;
  description: string;
  articlePageUrl: string;
}

async function getWeeklyAffiliateBooks(weekLabel: string): Promise<AffiliateBook[]> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { return []; }

  const pool = new Pool({ connectionString: dbUrl });
  try {
    // Get top affiliate books from this week's consolidated entries
    const { rows } = await pool.query<{
      affiliate_links: Array<{asin: string; title: string; author: string; description: string}>;
      article_ids: string[];
    }>(`
      SELECT affiliate_links, article_ids
      FROM app.weekly_consolidated
      WHERE week_label = $1
        AND jsonb_array_length(affiliate_links) > 0
      ORDER BY created_at
    `, [weekLabel]);

    // Flatten, dedupe, and resolve article page URLs
    const seen = new Set<string>();
    const results: AffiliateBook[] = [];

    for (const row of rows) {
      for (const link of row.affiliate_links) {
        if (!seen.has(link.asin) && results.length < 3) {
          seen.add(link.asin);
          // Link to the first article that has this book recommendation
          const articleId = row.article_ids[0];
          results.push({
            title: link.title,
            author: link.author,
            description: link.description,
            articlePageUrl: `https://hex-index.com/article/${articleId}/index.html`,
          });
        }
      }
    }

    return results;
  } finally {
    await pool.end();
  }
}

// ── Email/SMS content ───────────────────────────────────────────────

function escapeEmailHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildEmailHtml(week: WeekInfo, subscriberName: string, subscriberEmail: string, books: AffiliateBook[] = []): string {
  const coverUrl = `https://hex-index.com/weekly/cover-${week.label}.webp`;
  const weeklyUrl = 'https://hex-index.com/weekly/';
  const epubUrl = `https://hex-index.com/weekly/${week.label}.epub`;
  const unsubscribeUrl = subscriberEmail ? buildUnsubscribeUrl(subscriberEmail) : weeklyUrl;
  const greeting = subscriberName ? `Hi ${subscriberName},` : 'Hi,';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <img src="${coverUrl}" alt="Hex Index Reader — Week of ${week.display}" style="max-width: 280px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
  </div>

  <p style="font-size: 16px; line-height: 1.6;">${greeting}</p>

  <p style="font-size: 16px; line-height: 1.6;">
    This week's <strong>Hex Index Reader</strong> is ready — original commentary on the best long-form writing from the past week, organized by topic with deep dives.
  </p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${epubUrl}" style="display: inline-block; background: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 16px; font-weight: bold;">Download EPUB</a>
  </div>

  ${books.length > 0 ? `<div style="margin: 32px 0; padding: 24px 0; border-top: 1px solid #e0e0e0;">
  <p style="font-size: 14px; font-weight: bold; color: #1a1a1a; margin-bottom: 16px;">This Week's Recommended Reading</p>
  ${books.map(b => `
  <div style="margin-bottom: 16px;">
    <a href="${b.articlePageUrl}" style="color: #1a1a1a; text-decoration: none; font-size: 15px; font-weight: bold;">${escapeEmailHtml(b.title)}</a>
    <span style="color: #666; font-size: 14px;"> by ${escapeEmailHtml(b.author)}</span>
    <p style="font-size: 13px; color: #666; margin: 4px 0 0 0; line-height: 1.5;">${escapeEmailHtml(b.description)}</p>
  </div>
  `).join('')}
</div>` : ''}

  <p style="font-size: 14px; color: #666; text-align: center;">
    <a href="${weeklyUrl}" style="color: #666;">Browse all editions</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0;" />

  <p style="font-size: 12px; color: #999; text-align: center;">
    Hex Index Reader &mdash; Week of ${week.display}<br/>
    <a href="${unsubscribeUrl}" style="color: #999;">Unsubscribe</a>
  </p>
</body>
</html>`;
}

function buildEmailText(week: WeekInfo, subscriberName: string, subscriberEmail: string, books: AffiliateBook[] = []): string {
  const greeting = subscriberName ? `Hi ${subscriberName},` : 'Hi,';
  const unsubscribeUrl = subscriberEmail ? buildUnsubscribeUrl(subscriberEmail) : '';
  return `${greeting}

This week's Hex Index Reader is ready — original commentary on the best long-form writing from the past week.

Download EPUB: https://hex-index.com/weekly/${week.label}.epub
${books.length > 0 ? `\nThis Week's Recommended Reading:\n${books.map(b => `- ${b.title} by ${b.author}: ${b.articlePageUrl}`).join('\n')}\n` : ''}
Browse all editions: https://hex-index.com/weekly/

---
Hex Index Reader — Week of ${week.display}${unsubscribeUrl ? `\nUnsubscribe: ${unsubscribeUrl}` : ''}`;
}

function buildSmsText(subscriberEmail: string, topBook: {title: string; articlePageUrl: string} | null = null): string {
  const weeklyUrl = 'https://hex-index.com/weekly/';
  const unsubscribeUrl = subscriberEmail ? buildUnsubscribeUrl(subscriberEmail) : '';
  const bookLine = topBook ? `\nReading pick: ${topBook.title} — ${topBook.articlePageUrl}` : '';
  return `Hex Index Reader is ready: ${weeklyUrl}${bookLine}${unsubscribeUrl ? `\nSTOP: ${unsubscribeUrl}` : ''}`;
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const secrets = loadSecrets();
  const week = getCurrentWeek();

  console.info(`Hex Index Reader — Week of ${week.display}`);
  console.info(`Week label: ${week.label}`);

  // Load affiliate book picks
  const books = await getWeeklyAffiliateBooks(week.label);
  console.info(`Loaded ${books.length} affiliate book picks`);
  const topBook = books.length > 0 ? { title: books[0].title, articlePageUrl: books[0].articlePageUrl } : null;

  // Fetch subscribers
  const subscribers = await fetchSubscribers();
  if (subscribers.length === 0) {
    console.info('No subscribers found in sheet');
    return;
  }
  console.info(`Found ${subscribers.length} subscriber(s)`);

  // Create SMTP transport
  const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: secrets.gmailUser,
      pass: secrets.gmailAppPassword,
    },
  });

  // Verify SMTP connection
  await transport.verify();
  console.info('SMTP connection verified');

  // Initialize Twilio
  const twilioClient = twilio(
    loadSecret('TWILIO_ACCOUNT_SID'),
    loadSecret('TWILIO_AUTH_TOKEN')
  );

  const subject = `Hex Index Reader \u2014 Week of ${week.display}`;
  let emailsSent = 0;
  let smsSent = 0;
  let errors = 0;

  for (const sub of subscribers) {
    // Send email
    if (sub.email) {
      try {
        await transport.sendMail({
          from: '"Hex Index Reader" <noreply@hex-index.com>',
          to: sub.email,
          subject,
          html: buildEmailHtml(week, sub.name, sub.email, books),
          text: buildEmailText(week, sub.name, sub.email, books),
        });
        emailsSent++;
        console.info(`  Email sent: ${sub.name || sub.email}`);
      } catch (err) {
        errors++;
        console.error(`  Email failed (${sub.email}): ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Send SMS via Twilio
    if (sub.phone) {
      const digits = sub.phone.replace(/\D/g, '');
      const to = digits.startsWith('1') ? `+${digits}` : `+1${digits}`;

      try {
        await twilioClient.messages.create({
          messagingServiceSid: loadSecret('TWILIO_MESSAGING_SERVICE_SID'),
          to,
          body: buildSmsText(sub.email, topBook),
        });
        smsSent++;
        console.info(`  SMS sent: ${sub.name || sub.phone}`);
      } catch (err) {
        errors++;
        console.error(`  SMS failed (${to}): ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Brief pause between sends to avoid rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  transport.close();
  console.info(`\nDone: ${emailsSent} emails, ${smsSent} SMS, ${errors} errors`);
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
