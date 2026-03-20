/**
 * Wikipedia article rewriter
 * Transforms encyclopedic content into enjoyable reading
 *
 * Architecture: model writes prose only (plain text), script wraps in HTML.
 * Model never produces HTML tags — script handles all formatting.
 */

import { WikipediaContent } from './types.js';
import { generateText } from './ollama.js';

export interface RewriteResult {
  html: string;
  wordCount: number;
  estimatedReadTimeMinutes: number;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function inlineMarkdown(escaped: string): string {
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/**
 * Convert plain text (model output) to semantic HTML (script logic)
 *
 * Conventions the model is asked to follow:
 *   - Blank line between paragraphs
 *   - ## Heading for section breaks
 *   - ### Subheading for subsections
 *   - > Quote for blockquotes
 *   - Lines starting with - or * for list items
 */
function textToHtml(text: string, sourceUrl: string, sourceTitle: string): string {
  const parts: string[] = [];

  // Source attribution (script generates this, not the model)
  parts.push(`<p class="source-note">Based on <a href="${escapeHtml(sourceUrl)}">Wikipedia: ${escapeHtml(sourceTitle)}</a></p>`);

  // Split into blocks on blank lines
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

  let inList = false;

  for (const block of blocks) {
    const lines = block.split('\n');

    // Check if this block is a heading
    if (lines.length === 1 && lines[0].startsWith('## ')) {
      if (inList) { parts.push('</ul>'); inList = false; }
      const level = lines[0].startsWith('### ') ? 'h3' : 'h2';
      const heading = lines[0].replace(/^#{2,3}\s+/, '');
      parts.push(`<${level}>${escapeHtml(heading)}</${level}>`);
      continue;
    }

    // Check if this block is a blockquote
    if (lines.every(l => l.startsWith('> ') || l.startsWith('>'))) {
      if (inList) { parts.push('</ul>'); inList = false; }
      const quoteText = lines.map(l => l.replace(/^>\s?/, '')).join(' ');
      parts.push(`<blockquote>${inlineMarkdown(escapeHtml(quoteText))}</blockquote>`);
      continue;
    }

    // Check if this block is a list
    if (lines.every(l => /^[-*]\s/.test(l))) {
      if (!inList) { parts.push('<ul>'); inList = true; }
      for (const line of lines) {
        const item = line.replace(/^[-*]\s+/, '');
        parts.push(`<li>${inlineMarkdown(escapeHtml(item))}</li>`);
      }
      continue;
    }

    // Regular paragraph
    if (inList) { parts.push('</ul>'); inList = false; }
    const paraText = lines.join(' ');
    parts.push(`<p>${inlineMarkdown(escapeHtml(paraText))}</p>`);
  }

  if (inList) { parts.push('</ul>'); }

  return parts.join('\n');
}

/**
 * Prepare Wikipedia source content for the model (script pre-processing)
 * Trim to manageable size, keep the most important sections
 */
function prepareSourceText(content: WikipediaContent): string {
  const parts: string[] = [];

  // Main intro content (most important)
  if (content.mainContent) {
    parts.push(content.mainContent);
  }

  // Add sections until we hit ~10,000 chars
  let totalLength = parts.join('\n\n').length;
  for (const section of content.sections) {
    const sectionText = `## ${section.heading}\n\n${section.content}`;
    if (totalLength + sectionText.length > 10000) { break; }
    parts.push(sectionText);
    totalLength += sectionText.length;
  }

  return parts.join('\n\n');
}

/**
 * Rewrite Wikipedia content as an enjoyable essay
 * Model writes plain text prose. Script wraps in HTML.
 */
export async function rewriteWikipediaArticle(
  content: WikipediaContent,
  substackTitle: string,
  _substackExcerpt: string
): Promise<RewriteResult> {
  const sourceText = prepareSourceText(content);

  // Model's only job: rewrite as engaging prose, plain text
  const prompt = `Rewrite this Wikipedia article as an engaging essay for a general reader.

ARTICLE: ${content.title}

CONTENT:
${sourceText}

CONTEXT: This is related to a Substack article titled "${substackTitle}".

Guidelines:
- Start with an interesting hook, not a dry definition
- Explain from first principles — don't assume prior knowledge
- Vary paragraph length — mix short punchy paragraphs with longer ones
- Aim for 10-30 minutes of reading material

Write plain text only. Use blank lines between paragraphs. Use ## before section headings. Use > before quotes. No HTML tags.`;

  let text = await generateText(prompt, { temperature: 0.8, numPredict: 12000 });

  // Strip markdown code fences if model wraps output
  if (text.startsWith('```')) {
    text = text.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
  }
  text = text.trim();

  // Script converts plain text to HTML
  const html = textToHtml(text, content.url, content.title);

  // Count words in the prose output
  const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = countWords(textOnly);
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
