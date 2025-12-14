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

  console.log('🔐 Starting Substack authentication...');

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
    console.log('📱 Navigating to Substack login...');
    await page.goto('https://substack.com/sign-in', {
      waitUntil: 'networkidle',
    });

    // Enter email
    console.log('✉️  Entering email...');
    await page.fill('input[type="email"]', email);
    await page.click('button[type="submit"]');

    // Wait for either password field or magic link message
    await page.waitForTimeout(2000);

    // Check if password field appears (account has password set)
    const passwordField = page.locator('input[type="password"]');
    const passwordFieldVisible = await passwordField.isVisible().catch(() => false);

    if (passwordFieldVisible) {
      console.log('🔑 Entering password...');
      await passwordField.fill(password);
      await page.click('button[type="submit"]');
    } else {
      console.log('📧 Substack sent magic link email');
      console.log('   Please check brian.mabry.edwards@gmail.com');
      console.log('   Click the link, then run this script again');
      process.exit(1);
    }

    // Wait for successful login
    console.log('⏳ Waiting for authentication...');
    await page.waitForURL('https://substack.com/home', {
      timeout: 30000,
    });

    console.log('✅ Login successful!');

    // Extract session cookie
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'connect.sid');

    if (!sessionCookie) {
      console.error('❌ Session cookie not found');
      process.exit(1);
    }

    console.log('🍪 Session cookie extracted');

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

    console.log('💾 Updated .secrets file');
    console.log('');
    console.log('✨ Session refresh complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Reload your shell: source .secrets');
    console.log('  2. Test the session: npx tsx tools/substack/test-draft.ts');
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
