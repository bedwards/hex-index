/**
 * Substack integration types
 * Based on reverse-engineered Substack internal API
 */

export interface SubstackAuthConfig {
  /** Session cookie value (connect.sid) */
  sessionCookie: string;
  /** Substack subdomain (e.g., "weeklyvibe") */
  subdomain: string;
}

export interface SubstackPost {
  /** Post title */
  title: string;
  /** Post subtitle (optional) */
  subtitle?: string;
  /** HTML content body */
  body_html: string;
  /** Post type (newsletter, podcast, thread, etc.) */
  type?: 'newsletter' | 'podcast' | 'thread';
  /** Audience visibility */
  audience?: 'everyone' | 'only_paid' | 'only_free' | 'founding';
  /** Draft mode - if true, post is saved but not published */
  draft?: boolean;
  /** Send email notification to subscribers */
  send_email?: boolean;
  /** Cover image URL (optional) */
  cover_image?: string;
  /** Canonical URL for cross-posting */
  canonical_url?: string;
}

export interface SubstackPostResponse {
  /** Unique post ID */
  id: number;
  /** Post slug for URL */
  slug: string;
  /** Full post URL */
  canonical_url: string;
  /** Publication date (if published) */
  post_date?: string;
  /** Whether post is in draft mode */
  draft: boolean;
  /** Post title */
  title: string;
}

export interface SubstackAPIError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status: number;
  /** Additional error details */
  details?: unknown;
}

export interface PublishResult {
  /** Whether operation succeeded */
  success: boolean;
  /** Post URL if successful */
  postUrl?: string;
  /** Post slug if successful */
  slug?: string;
  /** Error message if failed */
  error?: string;
  /** Whether error was due to session expiration */
  sessionExpired?: boolean;
}

export interface SessionStatus {
  /** Whether session cookie is valid */
  valid: boolean;
  /** Session expiration date (if known) */
  expiresAt?: Date;
  /** Error message if invalid */
  error?: string;
}
