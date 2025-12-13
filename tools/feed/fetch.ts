/**
 * Feed Fetch CLI Tool
 *
 * Fetches and parses Substack RSS feeds.
 *
 * Usage:
 *   npm run feed:fetch -- --url https://example.substack.com/feed
 *   npm run feed:fetch -- --publication example
 *   npm run feed:fetch -- --url https://example.substack.com/feed --json
 */

import { config } from 'dotenv';
import {
  fetchFeed,
  getSubstackFeedUrl,
  estimateReadTime,
  countWords,
} from '../../src/feed/index.js';

config();

interface CLIOptions {
  url?: string;
  publication?: string;
  json?: boolean;
  verbose?: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const value = args[i + 1];

    switch (arg) {
      case '--url':
      case '-u':
        options.url = value;
        i++;
        break;
      case '--publication':
      case '-p':
        options.publication = value;
        i++;
        break;
      case '--json':
      case '-j':
        options.json = true;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
    }
  }

  return options;
}

function printUsage(): void {
  console.info(`
Feed Fetch Tool - Fetch and parse Substack RSS feeds

Usage:
  npm run feed:fetch -- --url <feed-url>
  npm run feed:fetch -- --publication <slug>
  npm run feed:fetch -- -p <slug> --json

Options:
  --url, -u         Full feed URL
  --publication, -p Publication slug (e.g., "example" for example.substack.com)
  --json, -j        Output as JSON
  --verbose, -v     Show detailed output

Examples:
  npm run feed:fetch -- -p heathercoxrichardson
  npm run feed:fetch -- --url https://noahpinion.substack.com/feed
  npm run feed:fetch -- -p astralcodexten --json
`);
}

async function main(): Promise<void> {
  const options = parseArgs();

  // Get feed URL
  let feedUrl: string;
  if (options.url) {
    feedUrl = options.url;
  } else if (options.publication) {
    feedUrl = getSubstackFeedUrl(options.publication);
  } else {
    printUsage();
    process.exit(1);
  }

  console.info(`Fetching feed: ${feedUrl}`);

  const result = await fetchFeed(feedUrl);

  if (!result.success || !result.feed) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }

  const feed = result.feed;

  if (options.json) {
    // JSON output
    const output = {
      title: feed.title,
      description: feed.description,
      link: feed.link,
      feedUrl: feed.feedUrl,
      author: feed.author,
      lastBuildDate: feed.lastBuildDate?.toISOString(),
      itemCount: feed.items.length,
      items: feed.items.map((item) => ({
        title: item.title,
        url: item.url,
        publishedAt: item.publishedAt.toISOString(),
        author: item.author,
        wordCount: countWords(item.contentHtml),
        readTimeMinutes: estimateReadTime(item.contentHtml),
        summary: item.summary?.slice(0, 200),
        imageUrl: item.imageUrl,
      })),
    };
    console.info(JSON.stringify(output, null, 2));
  } else {
    // Human-readable output
    console.info(`\n📰 ${feed.title}`);
    if (feed.description) {
      console.info(`   ${feed.description.slice(0, 100)}${feed.description.length > 100 ? '...' : ''}`);
    }
    console.info(`   ${feed.link}`);
    console.info(`   ${feed.items.length} articles found\n`);

    console.info('Recent articles:');
    console.info('─'.repeat(60));

    for (const item of feed.items.slice(0, 10)) {
      const readTime = estimateReadTime(item.contentHtml);
      const wordCount = countWords(item.contentHtml);
      const date = item.publishedAt.toLocaleDateString();

      console.info(`\n📄 ${item.title}`);
      console.info(`   📅 ${date} | ⏱️ ${readTime} min read | 📝 ${wordCount} words`);
      console.info(`   🔗 ${item.url}`);

      if (options.verbose && item.summary) {
        console.info(`   ${item.summary.slice(0, 150)}...`);
      }
    }

    if (feed.items.length > 10) {
      console.info(`\n... and ${feed.items.length - 10} more articles`);
    }

    console.info(`\n${result.cached ? '(from cache)' : '(fetched fresh)'}`);
  }
}

main().catch((err: unknown) => {
  console.error('Error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
