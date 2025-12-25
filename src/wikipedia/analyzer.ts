/**
 * Topic analyzer for finding Wikipedia articles related to Substack content
 * Identifies specific, educational topics worth exploring
 * Uses one-shot Claude Code CLI invocations for analysis
 */

import * as cheerio from 'cheerio';
import { spawn } from 'child_process';
import { TopicSuggestion } from './types.js';
import { searchWikipedia, checkWikipediaArticleLength } from './scraper.js';

/**
 * Invoke Claude Code CLI with a prompt and return the response
 * Uses the user's existing Claude subscription (no API key needed)
 */
async function invokeClaude(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const claude = spawn('claude', ['--print'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    claude.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    claude.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    claude.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Claude CLI exited with code ${code}: ${stderr}`));
        return;
      }
      resolve(stdout.trim());
    });

    claude.on('error', (err) => {
      reject(new Error(`Failed to spawn claude CLI: ${err.message}`));
    });

    // Write prompt to stdin and close
    claude.stdin.write(prompt);
    claude.stdin.end();
  });
}

/**
 * Extract Wikipedia links from article HTML
 */
export function extractWikipediaLinks(html: string): string[] {
  const $ = cheerio.load(html);
  const links: string[] = [];

  $('a[href*="wikipedia.org"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/wiki/') && !href.includes('Special:') && !href.includes('Wikipedia:')) {
      links.push(href);
    }
  });

  return [...new Set(links)];
}

/**
 * Extract key terms and concepts from article text
 */
export function extractKeyTerms(html: string): string[] {
  const $ = cheerio.load(html);

  // Get text content
  const text = $('body').text();

  // Find capitalized phrases that might be proper nouns or concepts
  const capitalizedPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
  const matches = text.match(capitalizedPattern) ?? [];

  // Filter out common words and duplicates
  const commonWords = new Set([
    'The', 'This', 'That', 'These', 'Those', 'There', 'Their',
    'What', 'When', 'Where', 'Which', 'While', 'Who', 'Why', 'How',
    'And', 'But', 'For', 'Not', 'You', 'All', 'Can', 'Had', 'Her',
    'Was', 'One', 'Our', 'Out', 'Are', 'Has', 'His', 'Its', 'May',
    'New', 'Now', 'Old', 'See', 'Way', 'Who', 'Did', 'Get', 'Has',
    'Him', 'His', 'How', 'Man', 'New', 'Now', 'Old', 'See', 'Two',
    'Way', 'Who', 'Boy', 'Did', 'Its', 'Let', 'Say', 'She', 'Too',
    'Use', 'Read', 'More', 'Subscribe', 'Share', 'Like', 'Comment',
    'Posted', 'Written', 'Published', 'Today', 'Yesterday', 'Monday',
    'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    'January', 'February', 'March', 'April', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ]);

  const terms = matches
    .filter(term => !commonWords.has(term))
    .filter(term => term.length > 3);

  // Count occurrences
  const counts = new Map<string, number>();
  for (const term of terms) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  // Sort by frequency and return top terms
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([term]) => term);
}

/**
 * Use Claude to analyze article and suggest Wikipedia topics
 */
export async function analyzeArticleForTopics(
  articleHtml: string,
  articleTitle: string,
  publicationName: string
): Promise<TopicSuggestion[]> {
  // Extract text for analysis
  const $ = cheerio.load(articleHtml);
  $('.subscribe-widget, .subscription-widget, .share, .button-wrapper').remove();
  const articleText = $('body').text().slice(0, 8000); // Limit context

  // Get existing Wikipedia links
  const existingLinks = extractWikipediaLinks(articleHtml);
  const keyTerms = extractKeyTerms(articleHtml);

  const prompt = `Analyze this article and suggest 3 specific Wikipedia topics that would provide valuable context for the reader.

ARTICLE TITLE: ${articleTitle}
PUBLICATION: ${publicationName}

ARTICLE TEXT (excerpt):
${articleText}

KEY TERMS DETECTED: ${keyTerms.join(', ')}
EXISTING WIKIPEDIA LINKS: ${existingLinks.length > 0 ? existingLinks.join(', ') : 'None'}

REQUIREMENTS:
1. Topics must be SPECIFIC, not general (e.g., "Dunbar's number" not "Psychology")
2. Topics should be educational - things the reader likely doesn't know deeply
3. Topics should be mentioned, referenced, or directly relevant to the article
4. Each Wikipedia article must have enough content for at least 10 minutes of reading
5. Avoid topics the reader likely already knows well given they read this publication
6. Prefer historical events, scientific concepts, specific people, or phenomena over broad categories

Respond with exactly 3 topics in this JSON format:
[
  {
    "topic": "Exact Wikipedia article title",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Article_Title",
    "reason": "Brief explanation of why this is relevant and educational",
    "confidence": "high" | "medium" | "low"
  }
]

Only output the JSON array, no other text.`;

  // Spawn claude CLI to analyze the article
  const responseText = await invokeClaude(prompt);

  // Parse response
  let suggestions: TopicSuggestion[];
  try {
    suggestions = JSON.parse(responseText) as TopicSuggestion[];
  } catch {
    // Try to extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      suggestions = JSON.parse(jsonMatch[0]) as TopicSuggestion[];
    } else {
      throw new Error('Failed to parse topic suggestions from Claude response');
    }
  }

  // Validate and filter suggestions
  const validatedSuggestions: TopicSuggestion[] = [];

  for (const suggestion of suggestions) {
    if (!suggestion.topic || !suggestion.reason) {
      continue;
    }

    // If no URL provided, search for it
    if (!suggestion.wikipediaUrl) {
      const url = await searchWikipedia(suggestion.topic);
      if (url) {
        suggestion.wikipediaUrl = url;
      } else {
        continue;
      }
    }

    // Check article length
    const { meetsMinimum, estimatedReadTime } = await checkWikipediaArticleLength(
      suggestion.wikipediaUrl,
      10
    );

    if (meetsMinimum) {
      validatedSuggestions.push(suggestion);
    } else if (estimatedReadTime >= 5) {
      // Accept shorter articles with lower confidence
      suggestion.confidence = 'low';
      validatedSuggestions.push(suggestion);
    }

    if (validatedSuggestions.length >= 3) {
      break;
    }
  }

  return validatedSuggestions.slice(0, 3);
}

/**
 * Quick analysis using just extracted links and terms (no API call)
 */
export async function quickAnalyzeForTopics(
  articleHtml: string
): Promise<TopicSuggestion[]> {
  const existingLinks = extractWikipediaLinks(articleHtml);
  const suggestions: TopicSuggestion[] = [];

  for (const link of existingLinks.slice(0, 5)) {
    const { meetsMinimum, estimatedReadTime } = await checkWikipediaArticleLength(link, 10);

    if (meetsMinimum) {
      // Extract topic from URL
      const topicMatch = link.match(/\/wiki\/([^#?]+)/);
      if (topicMatch) {
        const topic = decodeURIComponent(topicMatch[1].replace(/_/g, ' '));
        suggestions.push({
          topic,
          wikipediaUrl: link.startsWith('http') ? link : `https://en.wikipedia.org${link}`,
          reason: `Referenced in the article (${estimatedReadTime} min read)`,
          confidence: 'high',
        });
      }
    }

    if (suggestions.length >= 3) {
      break;
    }
  }

  return suggestions;
}
