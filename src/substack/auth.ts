/**
 * Substack authentication and session management
 */

import { SubstackAuthConfig, SessionStatus } from './types.js';

/**
 * Validate a Substack session cookie by making a test API call
 */
export async function validateSession(
  config: SubstackAuthConfig
): Promise<SessionStatus> {
  try {
    // Test session by fetching user info endpoint
    const response = await fetch(
      `https://${config.subdomain}.substack.com/api/v1/me`,
      {
        method: 'GET',
        headers: {
          Cookie: `connect.sid=${config.sessionCookie}`,
          'User-Agent': 'Mozilla/5.0 (compatible; WeeklyVibeBot/1.0)',
        },
      }
    );

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: 'Session expired or invalid',
      };
    }

    if (!response.ok) {
      return {
        valid: false,
        error: `API returned ${response.status}: ${response.statusText}`,
      };
    }

    // Session is valid
    return {
      valid: true,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Load Substack auth config from environment variables
 */
export function loadAuthConfig(): SubstackAuthConfig | null {
  const sessionCookie = process.env.SUBSTACK_SESSION_COOKIE;
  const subdomain = process.env.SUBSTACK_SUBDOMAIN || 'weeklyvibe';

  if (!sessionCookie) {
    return null;
  }

  return {
    sessionCookie,
    subdomain,
  };
}

/**
 * Extract session cookie from full cookie string
 */
export function extractSessionCookie(cookieString: string): string | null {
  const match = cookieString.match(/connect\.sid=([^;]+)/);
  return match ? match[1] : null;
}
