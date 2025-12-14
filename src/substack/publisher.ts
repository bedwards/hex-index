/**
 * Substack post publishing functionality
 */

import {
  SubstackAuthConfig,
  SubstackPost,
  SubstackPostResponse,
  PublishResult,
} from './types.js';
import { validateSession } from './auth.js';

/**
 * Publish a post to Substack (as draft or live)
 */
export async function publishPost(
  config: SubstackAuthConfig,
  post: SubstackPost
): Promise<PublishResult> {
  try {
    // Validate session first
    const sessionStatus = await validateSession(config);
    if (!sessionStatus.valid) {
      return {
        success: false,
        error: `Invalid session: ${sessionStatus.error}`,
        sessionExpired: true,
      };
    }

    // Prepare post data
    const postData = {
      title: post.title,
      subtitle: post.subtitle || '',
      body_html: post.body_html,
      type: post.type || 'newsletter',
      audience: post.audience || 'everyone',
      draft: post.draft !== undefined ? post.draft : true, // Default to draft
      send_email: post.send_email || false,
      ...(post.cover_image && { cover_image: post.cover_image }),
      ...(post.canonical_url && { canonical_url: post.canonical_url }),
    };

    // Make API request
    const response = await fetch(
      `https://${config.subdomain}.substack.com/api/v1/posts`,
      {
        method: 'POST',
        headers: {
          Cookie: `connect.sid=${config.sessionCookie}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; WeeklyVibeBot/1.0)',
        },
        body: JSON.stringify(postData),
      }
    );

    // Handle errors
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: 'Session expired - please refresh authentication',
        sessionExpired: true,
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Substack API error (${response.status}): ${errorText}`,
      };
    }

    // Parse success response
    const result = (await response.json()) as SubstackPostResponse;

    const postUrl = `https://${config.subdomain}.substack.com/p/${result.slug}`;

    return {
      success: true,
      postUrl,
      slug: result.slug,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Create a draft post (convenience wrapper)
 */
export async function createDraft(
  config: SubstackAuthConfig,
  post: Omit<SubstackPost, 'draft'>
): Promise<PublishResult> {
  return publishPost(config, {
    ...post,
    draft: true,
  });
}

/**
 * Publish a draft (update existing draft to published state)
 */
export async function publishDraft(
  config: SubstackAuthConfig,
  postId: number
): Promise<PublishResult> {
  try {
    const sessionStatus = await validateSession(config);
    if (!sessionStatus.valid) {
      return {
        success: false,
        error: `Invalid session: ${sessionStatus.error}`,
        sessionExpired: true,
      };
    }

    const response = await fetch(
      `https://${config.subdomain}.substack.com/api/v1/posts/${postId}`,
      {
        method: 'PATCH',
        headers: {
          Cookie: `connect.sid=${config.sessionCookie}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; WeeklyVibeBot/1.0)',
        },
        body: JSON.stringify({ draft: false }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Failed to publish draft: ${errorText}`,
      };
    }

    const result = (await response.json()) as SubstackPostResponse;
    const postUrl = `https://${config.subdomain}.substack.com/p/${result.slug}`;

    return {
      success: true,
      postUrl,
      slug: result.slug,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
