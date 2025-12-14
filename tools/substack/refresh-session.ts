#!/usr/bin/env npx tsx
/**
 * Refresh Substack session cookie using Playwright automation
 *
 * Usage:
 *   npx tsx tools/substack/refresh-session.ts
 *
 * Prerequisites:
 *   - SUBSTACK_EMAIL set in .env
 *   - SUBSTACK_PASSWORD set in .secrets
 */

import { chromium } from 'playwright';
import { config } from 'dotenv';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';

config();

async function refreshSubstackSession(): Promise<void> {
  const email = process.env.SUBSTACK_EMAIL;
  const password = process.env.SUBSTACK_PASSWORD;

  if (!email || !password) {
    console.error('❌ Missing credentials');
    console.error('   Set SUBSTACK_EMAIL in .env');
    console.error('   Set SUBSTACK_PASSWORD in .secrets');
    process.exit(1);
  }

  console.info('🔐 Starting Substack authentication...');

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    });
    const page = await context.newPage();

    // Navigate to login
    console.info('📱 Navigating to Substack login...');
    await page.goto('https://substack.com/sign-in', {
      waitUntil: 'networkidle',
    });

    // Enter email
    console.info('✉️  Entering email...');
    await page.fill('input[type="email"]', email);
    await page.click('button[type="submit"]');

    // Wait for either password field or magic link message
    await page.waitForTimeout(2000);

    // Check if password field appears (account has password set)
    const passwordField = page.locator('input[type="password"]');
    const passwordFieldVisible = await passwordField.isVisible().catch(() => false);

    if (passwordFieldVisible) {
      console.info('🔑 Entering password...');
      await passwordField.fill(password);
      await page.click('button[type="submit"]');
    } else {
      console.info('📧 Substack sent magic link email');
      console.info('   Please check brian.mabry.edwards@gmail.com');
      console.info('   Click the link, then run this script again');
      process.exit(1);
    }

    // Wait for successful login
    console.info('⏳ Waiting for authentication...');
    await page.waitForURL('https://substack.com/home', {
      timeout: 30000,
    });

    console.info('✅ Login successful!');

    // Extract session cookie
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'connect.sid');

    if (!sessionCookie) {
      console.error('❌ Session cookie not found');
      process.exit(1);
    }

    console.info('🍪 Session cookie extracted');

    // Update .secrets file
    const secretsPath = '.secrets';
    let secretsContent = '';

    if (existsSync(secretsPath)) {
      secretsContent = await readFile(secretsPath, 'utf8');
    }

    // Remove old SUBSTACK_SESSION_COOKIE if exists
    const lines = secretsContent.split('\n').filter(
      (line) => !line.startsWith('SUBSTACK_SESSION_COOKIE=')
    );

    // Add new cookie
    lines.push(`SUBSTACK_SESSION_COOKIE=${sessionCookie.value}`);

    await writeFile(secretsPath, lines.join('\n') + '\n');

    console.info('💾 Updated .secrets file');
    console.info('');
    console.info('✨ Session refresh complete!');
    console.info('');
    console.info('Next steps:');
    console.info('  1. Reload your shell: source .secrets');
    console.info('  2. Test the session: npx tsx tools/substack/test-draft.ts');
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

refreshSubstackSession().catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
