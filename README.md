# hex-index

Personal reading library for Substack articles with Speechify text-to-speech support.

## Speechify Text Highlighting (HTTPS Required)

**This app runs on HTTPS for local development.** The Speechify Chrome extension requires HTTPS to enable text highlighting and synchronized reading features. Without HTTPS, Speechify will play audio but won't highlight the text being read.

When you access `https://localhost:5173`, your browser will show a security warning because we use self-signed certificates. This is expected and safe for localhost development. Click "Advanced" → "Proceed to localhost" to accept the certificate.

**Do not remove the HTTPS configuration from `vite.config.ts`** - it's required for the core reading experience.