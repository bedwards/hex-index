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
        Hex Index is a reading library for people who want to go deep. Long-form
        articles and video transcripts from independent writers and educators —
        curated, enriched with Wikipedia deep dives, and adapted for an enjoyable
        reading experience. No ads. No tracking. No algorithmic feed. Just good
        writing, ten minutes or longer, from sources worth your attention.
      </p>

      <h2>Why This Exists</h2>

      <p>
        I love Substack and YouTube. I subscribe to dozens of independent writers
        and creators — people who do real reporting, real analysis, real teaching.
        I can spot a quality educator. I know what careful thinking looks like
        in print.
      </p>

      <p>
        But the reading experience frustrated me. Substack's web interface is a
        single-page app, which means I have to Command-click every article to
        open it in a new tab if I want my text-to-speech extension to work.
        Then I'm managing twenty tabs and forgetting which ones I've read.
        The subscription feed shows everything — audio posts, short updates,
        paywalled teasers with three paragraphs of free content. There's no way
        to filter for what I actually want: text articles with ten minutes or
        more of free reading material.
      </p>

      <p>
        YouTube is worse. Brilliant long-form content buried under an interface
        designed for short attention spans. No way to read a transcript as an
        article. No way to collect video essays alongside written ones.
      </p>

      <p>
        I wanted Substack and YouTube in one place, from a curated list of
        sources, filtered to the good stuff. So I built it.
      </p>

      <h2>The Deeper Problem</h2>

      <p>
        There's something else. I'm worried about the state of journalism.
        Monopoly ownership. Fascist attacks on the press. Both sides parroting
        party lines instead of investigating. The constant churn of headline
        news — one crisis to the next with no context, no history, no depth.
        Everything is fed to you. Everything is brief. Everything is designed
        to be consumed and forgotten.
      </p>

      <p>
        Hex Index is my small answer to that. A spotlight on independent,
        top-notch coverage. Slow burn. Context. Thoughtful. Long form. The
        kind of reading that <em>The Week</em> magazine used to offer in its
        heyday — a curated window into the best thinking happening right now.
      </p>

      <h2>How It Works</h2>

      <p>
        Every hour, the system pulls new articles from RSS feeds and YouTube
        transcripts. It filters for text content with ten minutes or more of
        free reading — paywalled articles are fine as long as the free portion
        is substantial. For each article, it identifies three related Wikipedia
        topics, scrapes them, and rewrites the encyclopedic content as engaging
        essays — the kind of background reading that makes a good article great.
        Every illustration is generated specifically for its article.
      </p>

      <p>
        Articles are also editorially adapted: restructured for clarity,
        converted to third person, and enhanced with light counterpoints and
        editorial judgment. The original is always linked. We're curators and
        editors, not replacements.
      </p>

      <p>
        The entire system runs on a Mac Studio with a local language model.
        The public site is static HTML — no database, no server, no tracking,
        no cookies. Just words.
      </p>

      <h2>About Brian</h2>

      <p>
        Brian Mabry Edwards writes about human-AI collaboration at
        <a href="https://lluminate.substack.com" target="_blank" rel="noopener">LLuMinate</a>,
        where he coined the term to describe "the act of writing with the
        assistance of large language models — the spark of human intention
        meeting the strange mirror of machine language."
      </p>

      <p>
        He also makes music at
        <a href="https://jalopy.music" target="_blank" rel="noopener">jalopy.music</a>.
      </p>

      <p>
        Happy reading.
      </p>
    </article>
  `;

  const html = staticLayout('About', content, pathToRoot);
  await writeFile(join(outputDir, 'about', 'index.html'), html);
  console.info('  Generated about page');
}
