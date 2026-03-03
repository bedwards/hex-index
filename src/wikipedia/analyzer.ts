/**
 * Topic analyzer for finding Wikipedia articles related to Substack content
 * Identifies specific, educational topics worth exploring
 *
 * Architecture: script handles URL resolution, validation, structure.
 * Model only picks topic names from article context (plain text output).
 */

import * as cheerio from 'cheerio';
import { TopicSuggestion } from './types.js';
import { searchWikipedia, checkWikipediaArticleLength } from './scraper.js';
import { generateText } from './ollama.js';

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
 * Extract key terms and concepts from article text (script logic, no model)
 */
export function extractKeyTerms(html: string): string[] {
  const $ = cheerio.load(html);
  const text = $('body').text();

  // Find capitalized phrases that might be proper nouns or concepts
  const capitalizedPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
  const matches = text.match(capitalizedPattern) ?? [];

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

  const counts = new Map<string, number>();
  for (const term of terms) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([term]) => term);
}

/**
 * Analyze article and suggest Wikipedia topics
 * PRIORITY 1: Wikipedia links already in the article (no model needed)
 * PRIORITY 2: Model picks topic names, script resolves URLs
 */
export async function analyzeArticleForTopics(
  articleHtml: string,
  articleTitle: string,
  publicationName: string
): Promise<TopicSuggestion[]> {
  const validatedSuggestions: TopicSuggestion[] = [];

  // ── PRIORITY 1: Extract and validate Wikipedia links from the article ──
  const existingLinks = extractWikipediaLinks(articleHtml);
  console.info(`  Found ${existingLinks.length} Wikipedia links in article`);

  for (const link of existingLinks) {
    if (validatedSuggestions.length >= 3) { break; }

    const { meetsMinimum, estimatedReadTime } = await checkWikipediaArticleLength(link, 10);

    if (meetsMinimum || estimatedReadTime >= 5) {
      const topicMatch = link.match(/\/wiki\/([^#?]+)/);
      if (topicMatch) {
        const topic = decodeURIComponent(topicMatch[1].replace(/_/g, ' '));
        validatedSuggestions.push({
          topic,
          wikipediaUrl: link.startsWith('http') ? link : `https://en.wikipedia.org${link}`,
          reason: `Linked in the article (${estimatedReadTime} min read)`,
          confidence: meetsMinimum ? 'high' : 'low',
        });
        console.info(`    ✓ Using linked article: ${topic}`);
      }
    }
  }

  if (validatedSuggestions.length >= 3) {
    return validatedSuggestions.slice(0, 3);
  }

  // ── PRIORITY 2: Model picks topic names, script resolves everything else ──
  const remainingSlots = 3 - validatedSuggestions.length;
  console.info(`  Need ${remainingSlots} more topics from LLM analysis`);

  const $ = cheerio.load(articleHtml);
  $('.subscribe-widget, .subscription-widget, .share, .button-wrapper').remove();
  const articleText = $('body').text().slice(0, 3000);
  const keyTerms = extractKeyTerms(articleHtml);

  const alreadyUsed = validatedSuggestions.map(s => s.topic);

  // Model's only job: read article context, output topic names (plain text)
  const prompt = `You are selecting Wikipedia articles that would give readers valuable context for this article.

ARTICLE: "${articleTitle}" from ${publicationName}

EXCERPT:
${articleText}

KEY TERMS: ${keyTerms.join(', ')}
${alreadyUsed.length > 0 ? `ALREADY SELECTED (do not repeat): ${alreadyUsed.join(', ')}` : ''}

Name exactly ${remainingSlots} specific Wikipedia articles that would be most educational for someone reading this article. Pick topics that are specific (not broad categories), substantial, and directly relevant.

Return ONLY the topic names, one per line. No numbering, no explanation, no URLs.`;

  const responseText = await generateText(prompt, { temperature: 0.3, numPredict: 200 });

  // Script parses plain-text response into topic names
  const topicNames = responseText
    .split('\n')
    .map(line => line.replace(/^\d+[.)]\s*/, '').trim()) // strip numbering if model adds it
    .filter(line => line.length > 2 && line.length < 200)
    .filter(line => !line.startsWith('http'))               // skip URLs if model outputs them
    .slice(0, remainingSlots + 2);                          // grab extras in case some fail validation

  console.info(`  LLM suggested: ${topicNames.join(', ')}`);

  // Script resolves each topic name to a real Wikipedia URL
  for (const topicName of topicNames) {
    if (validatedSuggestions.length >= 3) { break; }

    // Skip if already used
    if (alreadyUsed.some(t => t.toLowerCase() === topicName.toLowerCase())) { continue; }

    // Script searches Wikipedia API for the topic
    const url = await searchWikipedia(topicName);
    if (!url) {
      console.info(`    ✗ Not found on Wikipedia: ${topicName}`);
      continue;
    }

    // Script validates article length
    const { meetsMinimum, estimatedReadTime } = await checkWikipediaArticleLength(url, 10);

    if (meetsMinimum) {
      validatedSuggestions.push({
        topic: topicName,
        wikipediaUrl: url,
        reason: `Related to "${articleTitle}" (${estimatedReadTime} min read)`,
        confidence: 'high',
      });
      alreadyUsed.push(topicName);
      console.info(`    ✓ Validated: ${topicName} (${estimatedReadTime} min)`);
    } else if (estimatedReadTime >= 5) {
      validatedSuggestions.push({
        topic: topicName,
        wikipediaUrl: url,
        reason: `Related to "${articleTitle}" (${estimatedReadTime} min read)`,
        confidence: 'low',
      });
      alreadyUsed.push(topicName);
      console.info(`    ~ Short but usable: ${topicName} (${estimatedReadTime} min)`);
    } else {
      console.info(`    ✗ Too short: ${topicName} (${estimatedReadTime} min)`);
    }
  }

  return validatedSuggestions.slice(0, 3);
}

/**
 * Quick analysis using just extracted links and terms (no model call)
 */
export async function quickAnalyzeForTopics(
  articleHtml: string
): Promise<TopicSuggestion[]> {
  const existingLinks = extractWikipediaLinks(articleHtml);
  const suggestions: TopicSuggestion[] = [];

  for (const link of existingLinks.slice(0, 5)) {
    const { meetsMinimum, estimatedReadTime } = await checkWikipediaArticleLength(link, 10);

    if (meetsMinimum) {
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

    if (suggestions.length >= 3) { break; }
  }

  return suggestions;
}
