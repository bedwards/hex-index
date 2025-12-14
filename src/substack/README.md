# Substack Publishing Integration

Programmatic posting to Substack using reverse-engineered internal APIs. This enables automated newsletter publication for the Weekly Vibe digest.

## Overview

Substack has no official API, so this integration uses session cookie authentication to interact with Substack's internal JSON APIs. This approach is based on reverse-engineering research and community implementations.

## Setup

### 1. Configure Environment Variables

Add to `.env`:
```bash
SUBSTACK_EMAIL=brian.mabry.edwards@gmail.com
SUBSTACK_SUBDOMAIN=weeklyvibe
```

Add to `.secrets`:
```bash
SUBSTACK_SESSION_COOKIE=your_session_cookie_here
SUBSTACK_PASSWORD=your_password_here
```

### 2. Get Session Cookie

Run the automated cookie refresh script:

```bash
npx tsx tools/substack/refresh-session.ts
```

This will:
1. Launch a headless browser
2. Authenticate with your email/password
3. Extract the `connect.sid` cookie
4. Update `.secrets` automatically

**Note**: If your account uses magic link authentication instead of password, you'll need to manually extract the cookie from your browser's DevTools after logging in.

### 3. Manual Cookie Extraction (if needed)

If automatic refresh doesn't work:

1. Open browser and log in to substack.com
2. Open DevTools (F12)
3. Go to Application → Cookies → https://substack.com
4. Find `connect.sid` cookie
5. Copy the value to `.secrets`:
   ```
   SUBSTACK_SESSION_COOKIE=s%3A[long_string_here]
   ```

## Usage

### Create a Draft Post

```typescript
import { loadAuthConfig } from './src/substack/auth.js';
import { createDraft } from './src/substack/publisher.js';

const config = loadAuthConfig();

const result = await createDraft(config!, {
  title: 'Weekly Vibe: December 14',
  subtitle: 'Your weekly digest of diverse perspectives',
  body_html: `
    <h2>Politics & Policy</h2>
    <p>This week's top political stories...</p>
  `,
});

if (result.success) {
  console.log(`Draft created: ${result.postUrl}`);
} else {
  console.error(`Failed: ${result.error}`);
}
```

### Publish a Post (not recommended - use drafts)

```typescript
import { publishPost } from './src/substack/publisher.js';

const result = await publishPost(config!, {
  title: 'My Newsletter',
  body_html: '<p>Content here</p>',
  draft: false,  // Publishes immediately!
  send_email: true,  // Sends to subscribers!
});
```

**⚠️ Warning**: Publishing directly is risky. Always use `draft: true` and manually review in Substack dashboard before publishing.

### Test the Integration

```bash
npx tsx tools/substack/test-draft.ts
```

This creates a test draft on weeklyvibe.substack.com to verify everything works.

## API Reference

### Types

```typescript
interface SubstackPost {
  title: string;
  subtitle?: string;
  body_html: string;
  type?: 'newsletter' | 'podcast' | 'thread';
  audience?: 'everyone' | 'only_paid' | 'only_free' | 'founding';
  draft?: boolean;
  send_email?: boolean;
  cover_image?: string;
  canonical_url?: string;
}

interface PublishResult {
  success: boolean;
  postUrl?: string;
  slug?: string;
  error?: string;
  sessionExpired?: boolean;
}
```

### Functions

#### `loadAuthConfig()`
Loads auth config from environment variables.

```typescript
const config = loadAuthConfig();
if (!config) {
  console.error('Missing SUBSTACK_SESSION_COOKIE');
}
```

#### `validateSession(config)`
Checks if session cookie is still valid.

```typescript
const status = await validateSession(config);
if (!status.valid) {
  console.log('Session expired, need to refresh');
}
```

#### `createDraft(config, post)`
Creates a draft post (recommended).

```typescript
const result = await createDraft(config, {
  title: 'My Post',
  body_html: '<p>Content</p>',
});
```

#### `publishPost(config, post)`
Creates a post (draft or published).

```typescript
const result = await publishPost(config, {
  title: 'My Post',
  body_html: '<p>Content</p>',
  draft: true,  // Safe: creates draft
});
```

## Maintenance

### Cookie Expiration

Session cookies typically expire after 30-90 days. When you see `sessionExpired: true` in results:

```bash
npx tsx tools/substack/refresh-session.ts
```

Or manually extract a new cookie from your browser.

### Monitoring

Check session validity:

```typescript
import { loadAuthConfig, validateSession } from './src/substack/auth.js';

const config = loadAuthConfig()!;
const status = await validateSession(config);

console.log(`Session valid: ${status.valid}`);
if (!status.valid) {
  console.log(`Error: ${status.error}`);
}
```

## Security

### ⚠️ Important Security Notes

1. **Never commit `.secrets`** - It's gitignored, keep it that way
2. **Session cookies are sensitive** - They grant full account access
3. **Rotate cookies monthly** - Run refresh script regularly
4. **Use drafts, not direct publishing** - Always manual review before publishing
5. **Rate limiting unknown** - Be conservative with API calls

### What Can Go Wrong

- **Session expires unexpectedly**: Refresh and try again
- **Substack changes API**: Integration may break (monitor GitHub issues)
- **Account security**: Session cookies bypass 2FA, protect them carefully

## Limitations

### Known Issues

1. **Unofficial API**: May break at any time if Substack changes internals
2. **No official documentation**: Based on reverse-engineering
3. **Rate limits unknown**: Proceed cautiously
4. **Image upload unclear**: Cover images may need external hosting

### Workarounds

- Always test with drafts first
- Keep local backups of all content
- Have manual fallback process ready
- Monitor for API changes

## Troubleshooting

### "Session expired" error

```bash
npx tsx tools/substack/refresh-session.ts
```

### "connect.sid not found"

Check that cookie value starts with `s%3A` (URL-encoded). If you copied from browser, it should be the full value including that prefix.

### Draft created but can't find it

1. Check weeklyvibe.substack.com/publish/posts
2. Look in "Drafts" tab
3. Sort by "Most recent"

### Playwright fails to authenticate

- Check that email/password are correct in .env/.secrets
- Try manual cookie extraction instead
- Ensure no 2FA blocking automation

## Resources

- [Reverse-engineering Substack API](https://iam.slys.dev/p/no-official-api-no-problem-how-i)
- [n8n Substack integration](https://iam.slys.dev/p/how-you-can-build-substack-notes)
- [substack-api TypeScript library](https://github.com/jakub-k-slys/substack-api)

## Future Improvements

- [ ] Automatic cookie rotation (monthly cron)
- [ ] Better error messages for common failures
- [ ] Image upload support
- [ ] Batch draft creation
- [ ] Webhook notifications on publish
- [ ] Analytics integration

## Contributing

This is an unofficial integration. If Substack changes their API and this breaks:

1. File a GitHub issue with error details
2. Check for API endpoint changes
3. Update type definitions if needed
4. Test thoroughly before committing

## License

MIT - Use at your own risk. Not affiliated with Substack.
