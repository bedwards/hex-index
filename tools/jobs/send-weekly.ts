/**
 * Job: Send weekly Reader email/text to subscribers
 *
 * Reads subscribers from a Google Sheet (public CSV export),
 * sends each an email (and optionally SMS via carrier gateway)
 * with the latest epub URL and cover image.
 *
 * Secrets loaded from ~/.config/.env:
 *   GMAIL_USER, GMAIL_APP_PASSWORD, GOOGLE_SHEET_ID
 */

import { createTransport } from 'nodemailer';
import { createHmac } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';

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

const SMS_GATEWAYS: Record<string, string> = {
  att: '@txt.att.net',
  verizon: '@vtext.com',
  tmobile: '@tmomail.net',
  sprint: '@messaging.sprintpcs.com',
};

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
    .filter(s => s.email || (s.phone && s.carrier))
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

// ── Email/SMS content ───────────────────────────────────────────────

function buildEmailHtml(week: WeekInfo, subscriberName: string, subscriberEmail: string): string {
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

function buildEmailText(week: WeekInfo, subscriberName: string, subscriberEmail: string): string {
  const greeting = subscriberName ? `Hi ${subscriberName},` : 'Hi,';
  const unsubscribeUrl = subscriberEmail ? buildUnsubscribeUrl(subscriberEmail) : '';
  return `${greeting}

This week's Hex Index Reader is ready — original commentary on the best long-form writing from the past week.

Download EPUB: https://hex-index.com/weekly/${week.label}.epub

Browse all editions: https://hex-index.com/weekly/

---
Hex Index Reader — Week of ${week.display}${unsubscribeUrl ? `\nUnsubscribe: ${unsubscribeUrl}` : ''}`;
}

function buildSmsText(subscriberEmail: string): string {
  const unsubscribeUrl = subscriberEmail ? buildUnsubscribeUrl(subscriberEmail) : '';
  return `Hex Index Reader is ready: https://hex-index.com/weekly/${unsubscribeUrl ? `\nSTOP: ${unsubscribeUrl}` : ''}`;
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const secrets = loadSecrets();
  const week = getCurrentWeek();

  console.info(`Hex Index Reader — Week of ${week.display}`);
  console.info(`Week label: ${week.label}`);

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

  // Verify connection
  await transport.verify();
  console.info('SMTP connection verified');

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
          html: buildEmailHtml(week, sub.name, sub.email),
          text: buildEmailText(week, sub.name, sub.email),
        });
        emailsSent++;
        console.info(`  Email sent: ${sub.name || sub.email}`);
      } catch (err) {
        errors++;
        console.error(`  Email failed (${sub.email}): ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Send SMS via email-to-SMS gateway
    if (sub.phone && sub.carrier) {
      const gateway = SMS_GATEWAYS[sub.carrier];
      if (!gateway) {
        console.warn(`  Unknown carrier "${sub.carrier}" for ${sub.name || sub.phone}`);
        errors++;
        continue;
      }

      const digits = sub.phone.replace(/\D/g, '');
      const smsAddress = `${digits}${gateway}`;

      try {
        await transport.sendMail({
          from: 'noreply@hex-index.com',
          to: smsAddress,
          subject: '',
          text: buildSmsText(sub.email),
        });
        smsSent++;
        console.info(`  SMS sent: ${sub.name || sub.phone} (${sub.carrier})`);
      } catch (err) {
        errors++;
        console.error(`  SMS failed (${smsAddress}): ${err instanceof Error ? err.message : String(err)}`);
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
