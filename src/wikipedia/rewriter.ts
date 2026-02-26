/**
 * Wikipedia article rewriter
 * Transforms encyclopedic content into enjoyable reading for Speechify
 * Uses local Ollama for rewrites
 */

import { WikipediaContent } from './types.js';
import { generateText } from './ollama.js';

export interface RewriteResult {
  html: string;
  wordCount: number;
  estimatedReadTimeMinutes: number;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Rewrite Wikipedia content as an enjoyable essay
 */
export async function rewriteWikipediaArticle(
  content: WikipediaContent,
  substackTitle: string,
  substackExcerpt: string
): Promise<RewriteResult> {
  // Prepare source content
  const sourceText = [
    content.mainContent,
    ...content.sections.map(s => `## ${s.heading}\n\n${s.content}`)
  ].join('\n\n');

  const prompt = `You are rewriting a Wikipedia article for a personal reading library. The goal is to transform encyclopedic content into an enjoyable essay optimized for text-to-speech reading with Speechify.

## Source Wikipedia Article
Title: ${content.title}
URL: ${content.url}
Word Count: ${content.wordCount} words (~${content.estimatedReadTime} min read)

## Content to Rewrite:
${sourceText.slice(0, 15000)}

## Context
This Wikipedia article is related to a Substack article titled "${substackTitle}".
Article excerpt: ${substackExcerpt.slice(0, 500)}

## Writing Guidelines
1. **Don't bury the lede** - Start with the most interesting hook, not a dry definition
2. **Vary paragraph length** - Mix short punchy paragraphs (1-2 sentences) with longer explanatory ones
3. **Vary sentence length** - Create rhythm for audio listening; avoid monotonous patterns
4. **Spell out acronyms** - First use: "the North Atlantic Treaty Organization (NATO)"
5. **Avoid jargon** - If you must use a technical term, explain it immediately in plain language
6. **Explain from first principles** - Don't assume prior knowledge; build understanding step by step
7. **Differentiate concepts** - Explain how this differs from similar things, and what its opposite is
8. **Add interesting connections** - Draw on your knowledge to add fascinating related facts
9. **Flow naturally** - This is an essay, not a reference document; use transitions and narrative
10. **Keep it substantive** - Aim for 10-30 minutes of reading material

## Output Format
Return the rewritten article as clean HTML with semantic markup:
- Use <p> for paragraphs
- Use <h2> and <h3> for section headings (not h1)
- Use <blockquote> for quotes
- Use <ul>/<ol> for lists
- Use <em> for emphasis

Start with a brief note crediting the source:
<p class="source-note">Based on <a href="${content.url}">Wikipedia: ${content.title}</a></p>

Then write the essay. Do not include any explanation or commentary outside the HTML content.`;

  // Call Ollama to rewrite the article
  let html = await generateText(prompt, { temperature: 0.8, numPredict: 12000, timeout: 600_000 });

  // Clean up any markdown code blocks if present
  if (html.startsWith('```html')) {
    html = html.slice(7);
  }
  if (html.startsWith('```')) {
    html = html.slice(3);
  }
  if (html.endsWith('```')) {
    html = html.slice(0, -3);
  }
  html = html.trim();

  // Count words in output
  const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = countWords(textContent);
  const estimatedReadTimeMinutes = Math.ceil(wordCount / 200);

  return {
    html,
    wordCount,
    estimatedReadTimeMinutes,
  };
}

/**
 * Generate a slug from a title
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}
