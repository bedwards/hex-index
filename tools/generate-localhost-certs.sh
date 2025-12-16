#!/bin/bash
# Generate self-signed SSL certificates for localhost development
#
# These certificates are required for Speechify text highlighting to work.
# Speechify Chrome extension requires HTTPS to enable text highlighting features.
#
# The certificates are valid for 1 year and safe to commit to the repository
# since they're only used for local development.

set -e

echo "🔐 Generating self-signed SSL certificates for localhost..."

# Generate private key
openssl genrsa -out localhost.key 2048

# Generate certificate signing request and self-signed certificate
openssl req -new -x509 -key localhost.key -out localhost.crt -days 365 \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

# Set proper permissions
chmod 600 localhost.key
chmod 644 localhost.crt

echo "✅ SSL certificates generated successfully!"
echo ""
echo "Files created:"
echo "  - localhost.key (private key)"
echo "  - localhost.crt (certificate)"
echo ""
echo "These are already configured in vite.config.ts"
echo "Your browser will show a security warning - this is expected for self-signed certs."
echo "Just click 'Advanced' → 'Proceed to localhost' to accept the certificate."
