/**
 * About page generator
 */

import { staticLayout } from '../templates.js';
import { writeFile } from '../utils.js';
import { join } from 'path';

/**
 * Generate the About page
 */
export async function generateAboutPage(outputDir: string): Promise<void> {
  const pathToRoot = '../';

  const content = `
    <article class="about-page">
      <h1>About Hex Index</h1>

      <p>
        Hex Index is a curated reading library built by
        <strong>Brian Mabry Edwards</strong> — a collection of long-form articles
        from across the web, enriched with Wikipedia deep dives and
        rewritten for enjoyable reading.
      </p>

      <p>
        Every article is selected from independent publications and newsletters
        that reward careful attention. The library favors depth over breadth:
        pieces that take ten minutes or more to read, that explore ideas worth
        sitting with, that benefit from context you didn't know you needed.
      </p>

      <h2>How It Works</h2>

      <p>
        The library runs on a set of automated pipelines. New articles are
        ingested hourly from RSS feeds. For each article, the system identifies
        related Wikipedia topics, scrapes them, and rewrites the encyclopedic
        content as engaging essays — the kind of background reading that makes
        a good article great. Every illustration is generated specifically for
        its article.
      </p>

      <p>
        The entire system is open source, built with TypeScript, PostgreSQL,
        and a local language model running on a Mac Studio. The public site
        you're reading is static HTML served from GitHub Pages — no database,
        no server, no tracking.
      </p>

      <h2>About Brian</h2>

      <p>
        Brian writes about human-AI collaboration at
        <a href="https://lluminate.substack.com" target="_blank" rel="noopener">LLuMinate</a>,
        where he coined the term to describe "the act of writing with the assistance
        of large language models — the spark of human intention meeting the strange
        mirror of machine language." He explores vibe coding, rapid prototyping with
        Claude Code, and the craft of building software at the speed of thought.
      </p>

      <p>
        He also makes music at
        <a href="https://jalopy.music" target="_blank" rel="noopener">jalopy.music</a>.
      </p>
    </article>
  `;

  const html = staticLayout('About', content, pathToRoot);
  await writeFile(join(outputDir, 'about', 'index.html'), html);
  console.info('  Generated about page');
}
