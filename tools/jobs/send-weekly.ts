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
import RestException from 'twilio/lib/base/RestException';
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
  phone: string | null;
  carrier: string;
}


// ── Phone normalization ─────────────────────────────────────────────

/**
 * Normalize a phone number to E.164 format (+1XXXXXXXXXX for US numbers).
 * Accepts strings, numbers, null, or undefined. Returns null if invalid.
 */
function normalizePhone(raw: unknown): string | null {
  if (raw == null) {
    return null;
  }
  const digits = String(raw as string | number).replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return null;
}

// ── Twilio error handling ───────────────────────────────────────────

/**
 * Known permanent Twilio error codes that should not be retried.
 * See https://www.twilio.com/docs/api/errors
 */
const PERMANENT_TWILIO_ERRORS: Record<number, string> = {
  21211: 'Invalid phone number',
  21214: 'Phone number not owned by account',
  21217: 'Phone number not verified',
  21408: 'Permission not granted to send to this country',
  21610: 'Recipient opted out (STOP)',
  21612: 'Message body too long',
  21614: 'Not a valid mobile number',
  30003: 'Unreachable destination handset',
  30004: 'Message blocked',
  30005: 'Unknown destination handset',
  30006: 'Landline or unreachable carrier',
  30007: 'Message filtered by carrier',
  30008: 'Unknown error (permanent)',
  30032: 'Toll-free number not verified',
  30034: 'A2P 10DLC campaign not registered',
};

/**
 * Transient Twilio error codes that are worth retrying.
 */
const TRANSIENT_TWILIO_ERRORS: Record<number, string> = {
  20429: 'Rate limit exceeded',
  20500: 'Twilio internal server error',
  20503: 'Twilio service temporarily unavailable',
  30001: 'Queue overflow (temporary)',
  30009: 'Missing segment (temporary)',
  30010: 'Message price exceeds max price',
};

const SMS_MAX_RETRIES = 3;

interface SmsFailure {
  phone: string;
  name: string;
  code: number | undefined;
  description: string;
  permanent: boolean;
}

function isTwilioRestException(err: unknown): err is RestException {
  return err instanceof RestException;
}

function isTransientError(err: unknown): boolean {
  if (isTwilioRestException(err)) {
    // Check if it's a known transient error code
    if (err.code !== undefined && err.code in TRANSIENT_TWILIO_ERRORS) {
      return true;
    }
    // Treat 5xx HTTP status as transient
    if (err.status >= 500) {
      return true;
    }
    // If it's a known permanent error, definitely not transient
    if (err.code !== undefined && err.code in PERMANENT_TWILIO_ERRORS) {
      return false;
    }
  }
  // Network errors are transient
  if (err instanceof TypeError && 'cause' in err) {
    return true;
  }
  if (err instanceof Error && /ECONNRESET|ETIMEDOUT|ECONNREFUSED|socket hang up/i.test(err.message)) {
    return true;
  }
  return false;
}

function describeTwilioError(err: unknown): string {
  if (isTwilioRestException(err)) {
    const code = err.code;
    if (code !== undefined) {
      const permanent = PERMANENT_TWILIO_ERRORS[code];
      if (permanent) { return `[${code}] ${permanent}`; }
      const transient = TRANSIENT_TWILIO_ERRORS[code];
      if (transient) { return `[${code}] ${transient}`; }
      return `[${code}] ${err.message}`;
    }
    return `[HTTP ${err.status}] ${err.message}`;
  }
  return err instanceof Error ? err.message : String(err);
}

/**
 * Send SMS with retry for transient errors and exponential backoff.
 */
async function sendSmsWithRetry(
  twilioClient: ReturnType<typeof twilio>,
  messagingServiceSid: string,
  to: string,
  body: string,
): Promise<void> {
  for (let attempt = 1; attempt <= SMS_MAX_RETRIES; attempt++) {
    try {
      await twilioClient.messages.create({
        messagingServiceSid,
        to,
        body,
      });
      return;
    } catch (err) {
      if (attempt < SMS_MAX_RETRIES && isTransientError(err)) {
        const delayMs = 1000 * 2 ** (attempt - 1); // 1s, 2s, 4s
        console.warn(`  SMS attempt ${attempt}/${SMS_MAX_RETRIES} failed (transient): ${describeTwilioError(err)} — retrying in ${delayMs}ms`);
        await new Promise(r => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
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
    subscribers?: Array<{ email: string; phone: string | number; carrier: string }>;
  };

  if (data.status !== 'ok' || !data.subscribers) {
    throw new Error(`Subscriber API error: ${data.status}`);
  }

  return data.subscribers
    .filter(s => s.email || s.phone)
    .map(s => ({
      name: '',
      email: s.email ?? '',
      phone: normalizePhone(s.phone),
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
    // Try to get article IDs from weekly_consolidated first
    const { rows: consolidatedRows } = await pool.query<{ article_ids: string[] }>(`
      SELECT article_ids
      FROM app.weekly_consolidated
      WHERE week_label = $1
    `, [weekLabel]);

    let articleRows: Array<{ id: string; affiliate_links: Array<{asin: string; title: string; author: string; description: string}> }>;

    if (consolidatedRows.length > 0) {
      // Get affiliate links from the articles referenced by weekly_consolidated
      const allArticleIds = consolidatedRows.flatMap(r => r.article_ids);
      if (allArticleIds.length === 0) { return []; }

      const { rows } = await pool.query<{
        id: string;
        affiliate_links: Array<{asin: string; title: string; author: string; description: string}>;
      }>(`
        SELECT id, affiliate_links
        FROM app.articles
        WHERE id = ANY($1)
          AND jsonb_array_length(affiliate_links) > 0
      `, [allArticleIds]);
      articleRows = rows;
    } else {
      // Fallback: query articles directly for the week's date range
      // Week label format: hex-index-YYYY-MM-DD (Friday date)
      const match = weekLabel.match(/^hex-index-(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) { return []; }

      const friday = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
      const saturday = new Date(friday);
      saturday.setUTCDate(friday.getUTCDate() - 6);

      const { rows } = await pool.query<{
        id: string;
        affiliate_links: Array<{asin: string; title: string; author: string; description: string}>;
      }>(`
        SELECT id, affiliate_links
        FROM app.articles
        WHERE published_at >= $1
          AND published_at < ($2::timestamptz + interval '1 day')
          AND jsonb_array_length(affiliate_links) > 0
        ORDER BY published_at DESC
      `, [saturday.toISOString(), friday.toISOString()]);
      articleRows = rows;
    }

    // Flatten, dedupe, and pick top 3
    const seen = new Set<string>();
    const results: AffiliateBook[] = [];

    for (const row of articleRows) {
      for (const link of row.affiliate_links) {
        if (!seen.has(link.asin) && results.length < 3) {
          seen.add(link.asin);
          results.push({
            title: link.title,
            author: link.author,
            description: link.description,
            articlePageUrl: `https://hex-index.com/article/${row.id}/index.html`,
          });
        }
      }
    }

    return results;
  } catch (err) {
    console.error(`Failed to fetch affiliate books for week ${weekLabel}: ${err instanceof Error ? err.message : String(err)}`);
    return [];
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

  const messagingServiceSid = loadSecret('TWILIO_MESSAGING_SERVICE_SID');
  const subject = `Hex Index Reader \u2014 Week of ${week.display}`;
  let emailsSent = 0;
  let smsSent = 0;
  let emailErrors = 0;
  const smsFailures: SmsFailure[] = [];

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
        emailErrors++;
        console.error(`  Email failed (${sub.email}): ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Send SMS via Twilio (with retry for transient errors)
    if (sub.phone) {
      try {
        await sendSmsWithRetry(twilioClient, messagingServiceSid, sub.phone, buildSmsText(sub.email, topBook));
        smsSent++;
        console.info(`  SMS sent: ${sub.name || sub.phone}`);
      } catch (err) {
        const code = isTwilioRestException(err) ? err.code : undefined;
        const permanent = code !== undefined && code in PERMANENT_TWILIO_ERRORS;
        const description = describeTwilioError(err);
        smsFailures.push({
          phone: sub.phone,
          name: sub.name || sub.phone,
          code,
          description,
          permanent,
        });
        const retryNote = permanent ? ' (permanent, skipped retry)' : ` (failed after ${SMS_MAX_RETRIES} attempts)`;
        console.error(`  SMS failed (${sub.phone}): ${description}${retryNote}`);
      }
    }

    // Brief pause between sends to avoid rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  transport.close();

  // Log summary
  const totalErrors = emailErrors + smsFailures.length;
  console.info(`\nDone: ${emailsSent} emails, ${smsSent} SMS, ${totalErrors} errors`);

  if (smsFailures.length > 0) {
    console.info(`\nSMS failure summary (${smsFailures.length} failed):`);
    const byType = new Map<string, string[]>();
    for (const f of smsFailures) {
      const key = f.description;
      const list = byType.get(key) ?? [];
      list.push(f.name);
      byType.set(key, list);
    }
    for (const [desc, names] of byType) {
      console.info(`  ${desc}: ${names.join(', ')}`);
    }
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
