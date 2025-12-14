#!/usr/bin/env npx tsx
/**
 * Test Substack draft creation
 *
 * Usage:
 *   npx tsx tools/substack/test-draft.ts
 *
 * This will create a test draft post to verify the integration works.
 */

import { config } from 'dotenv';
import { loadAuthConfig } from '../../src/substack/auth.js';
import { createDraft } from '../../src/substack/publisher.js';

config();

async function main(): Promise<void> {
  console.log('🧪 Testing Substack draft creation...\n');

  // Load auth config
  const authConfig = loadAuthConfig();
  if (!authConfig) {
    console.error('❌ Missing Substack credentials');
    console.error('   Set SUBSTACK_SESSION_COOKIE in .secrets');
    console.error('   Run: npx tsx tools/substack/refresh-session.ts');
    process.exit(1);
  }

  console.log(`📝 Creating test draft on ${authConfig.subdomain}.substack.com...\n`);

  // Create test draft
  const testPost = {
    title: `Test Draft - ${new Date().toLocaleString()}`,
    subtitle: 'This is a test draft created by the Weekly Vibe automation system',
    body_html: `
      <h2>🧪 Test Draft</h2>
      <p>This is a test post to verify the Substack publishing integration works correctly.</p>

      <h3>System Information</h3>
      <ul>
        <li><strong>Created:</strong> ${new Date().toLocaleString()}</li>
        <li><strong>Subdomain:</strong> ${authConfig.subdomain}</li>
        <li><strong>Mode:</strong> Draft (not published)</li>
      </ul>

      <h3>Next Steps</h3>
      <p>If you can see this draft in your Substack dashboard, the integration is working! You can:</p>
      <ol>
        <li>Review the draft in the Substack editor</li>
        <li>Make any edits you want</li>
        <li>Delete it (it's just a test)</li>
        <li>Or publish it if you want to share that the automation is working</li>
      </ol>

      <p><em>🤖 Generated with Weekly Vibe automation system</em></p>
    `,
  };

  const result = await createDraft(authConfig, testPost);

  if (result.success) {
    console.log('✅ Test draft created successfully!\n');
    console.log(`📎 Draft URL: ${result.postUrl}\n`);
    console.log('Next steps:');
    console.log('  1. Open the draft in your Substack dashboard');
    console.log('  2. Verify it looks correct');
    console.log('  3. Delete it or publish it');
  } else {
    console.error('❌ Failed to create draft\n');
    console.error(`Error: ${result.error}\n`);

    if (result.sessionExpired) {
      console.error('Session expired. Run: npx tsx tools/substack/refresh-session.ts');
    }

    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
