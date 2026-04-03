/**
 * Privacy and Terms page generators (A2P 10DLC compliance)
 */

import { staticLayout } from '../templates.js';
import { writeFile } from '../utils.js';
import { join } from 'path';

/**
 * Generate the Privacy Policy page
 */
export async function generatePrivacyPage(outputDir: string): Promise<void> {
  const pathToRoot = '../';

  const content = `
    <article class="about-page">
      <h1>Privacy Policy</h1>

      <p>
        Hex Index Reader collects your email address and phone number when you
        subscribe through the form on hex-index.com. That data is used for one
        purpose: sending you the weekly Hex Index Reader notification every Friday.
        One email and one SMS per week. Nothing else.
      </p>

      <h2>How Your Data Is Handled</h2>

      <p>
        Phone numbers are transmitted to <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener">Twilio</a>
        for SMS delivery. Email addresses are transmitted to Gmail SMTP for email
        delivery. Subscriber data is stored in a Google Sheet accessible only to the
        site operator.
      </p>

      <p>
        Your data is never sold, shared with third parties for marketing, or used
        for any purpose beyond delivering the weekly Reader notification.
      </p>

      <h2>Opting Out</h2>

      <p>
        You can unsubscribe at any time. Reply STOP to any SMS to stop receiving
        text messages. Click the unsubscribe link in any email to stop receiving
        emails.
      </p>

      <h2>Contact</h2>

      <p>
        Questions about this policy: <a href="mailto:brian.mabry.edwards@gmail.com">brian.mabry.edwards@gmail.com</a>
      </p>
    </article>
  `;

  const html = staticLayout('Privacy Policy', content, pathToRoot);
  await writeFile(join(outputDir, 'privacy', 'index.html'), html);
  console.info('  Generated privacy page');
}

/**
 * Generate the Terms and Conditions page
 */
export async function generateTermsPage(outputDir: string): Promise<void> {
  const pathToRoot = '../';

  const content = `
    <article class="about-page">
      <h1>Terms and Conditions</h1>

      <h2>Hex Index Reader SMS Program</h2>

      <p>
        By subscribing to Hex Index Reader, you agree to receive one SMS message
        per week (Fridays) notifying you that a new edition of the Reader is
        available. Message and data rates may apply.
      </p>

      <h2>Opting Out and Help</h2>

      <p>
        Reply STOP to any message to opt out of SMS notifications. Reply HELP to
        any message for assistance. You can also reach support at
        <a href="mailto:brian.mabry.edwards@gmail.com">brian.mabry.edwards@gmail.com</a>
        or (512) 584-6841.
      </p>

      <h2>Cost</h2>

      <p>
        The Hex Index Reader service is free. Standard carrier messaging and data
        rates may apply depending on your mobile plan.
      </p>

      <h2>Changes to Service</h2>

      <p>
        Hex Index reserves the right to modify or discontinue the service at any
        time.
      </p>
    </article>
  `;

  const html = staticLayout('Terms and Conditions', content, pathToRoot);
  await writeFile(join(outputDir, 'terms', 'index.html'), html);
  console.info('  Generated terms page');
}
