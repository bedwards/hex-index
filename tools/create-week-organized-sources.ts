#!/usr/bin/env npx tsx
/**
 * Create comprehensive sources file organized by The Week magazine sections
 * Combines user-provided feeds with discovered publications
 */

import { writeFile, readFile } from 'fs/promises';

interface Publication {
  name: string;
  slug: string;
  feedUrl: string;
  url?: string;
  author?: string;
  topics?: string[];
  priority?: string;
}

interface UserSourcesFile {
  metadata: Record<string, unknown>;
  publications: Publication[];
}

// Load the user-provided feeds from comprehensive-user-sources.json
const userSources = JSON.parse(
  await readFile('content/comprehensive-user-sources.json', 'utf8')
) as UserSourcesFile;

// Publications organized by The Week magazine sections
const weekOrganizedPublications = {
  metadata: {
    description:
      'Comprehensive library sources organized by The Week magazine editorial sections',
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    criteria: [
      'Aligned with The Week magazine editorial structure',
      'High-quality, long-form text content (10+ minute reads)',
      'Active publications (posted within last 30 days)',
      'Professional journalists and subject matter experts',
      'Will be filtered by ingestion pipeline: text-only, English, 10+ minute reads',
    ],
  },
  sections: {
    'Politics & Government': [
      {
        name: 'Letters from an American',
        slug: 'heathercoxrichardson',
        feedUrl: 'https://heathercoxrichardson.substack.com/feed',
        url: 'https://heathercoxrichardson.substack.com/',
        author: 'Heather Cox Richardson',
        topics: ['politics', 'history', 'democracy'],
        priority: 'high',
      },
      {
        name: 'The Bulwark',
        slug: 'thebulwark',
        feedUrl: 'https://www.thebulwark.com/feed',
        url: 'https://www.thebulwark.com/',
        author: 'Sarah Longwell, Tim Miller, Bill Kristol',
        topics: ['politics', 'democracy', 'conservatism'],
        priority: 'high',
      },
      {
        name: 'Popular Information',
        slug: 'popular',
        feedUrl: 'https://popular.info/feed',
        url: 'https://popular.info/',
        author: 'Judd Legum',
        topics: ['politics', 'accountability', 'investigations'],
        priority: 'high',
      },
      {
        name: 'The Free Press',
        slug: 'thefp',
        feedUrl: 'https://www.thefp.com/feed',
        url: 'https://www.thefp.com/',
        author: 'Bari Weiss',
        topics: ['journalism', 'politics', 'culture'],
        priority: 'high',
      },
      {
        name: 'Law Dork',
        slug: 'lawdork',
        feedUrl: 'https://www.lawdork.com/feed',
        url: 'https://www.lawdork.com/',
        author: 'Chris Geidner',
        topics: ['law', 'supreme-court', 'lgbtq'],
        priority: 'high',
      },
    ],
    'Business & Economics': [
      {
        name: "Lenny's Newsletter",
        slug: 'lennysnewsletter',
        feedUrl: 'https://www.lennysnewsletter.com/feed',
        url: 'https://www.lennysnewsletter.com/',
        author: 'Lenny Rachitsky',
        topics: ['product', 'growth', 'startups'],
        priority: 'high',
      },
      {
        name: 'Chartbook',
        slug: 'adamtooze',
        feedUrl: 'https://adamtooze.substack.com/feed',
        url: 'https://adamtooze.substack.com/',
        author: 'Adam Tooze',
        topics: ['economics', 'geopolitics', 'history'],
        priority: 'high',
      },
      {
        name: 'Slow Boring',
        slug: 'slowboring',
        feedUrl: 'https://www.slowboring.com/feed',
        url: 'https://www.slowboring.com/',
        author: 'Matthew Yglesias',
        topics: ['policy', 'economics', 'politics'],
        priority: 'high',
      },
      {
        name: 'Full Stack Economics',
        slug: 'fullstackeconomics',
        feedUrl: 'https://fullstackeconomics.substack.com/feed',
        url: 'https://fullstackeconomics.substack.com/',
        author: 'Timothy B. Lee',
        topics: ['economics', 'data', 'policy'],
        priority: 'medium',
      },
      {
        name: "DeLong's Grasping Reality",
        slug: 'braddelong',
        feedUrl: 'https://braddelong.substack.com/feed',
        url: 'https://braddelong.substack.com/',
        author: 'Brad DeLong',
        topics: ['economics', 'history', 'policy'],
        priority: 'high',
      },
    ],
    'Science & Technology': [
      {
        name: 'Your Local Epidemiologist',
        slug: 'yourlocalepidemiologist',
        feedUrl: 'https://yourlocalepidemiologist.substack.com/feed',
        url: 'https://yourlocalepidemiologist.substack.com/',
        author: 'Dr. Katelyn Jetelina',
        topics: ['public-health', 'epidemiology', 'science'],
        priority: 'high',
      },
      {
        name: 'Ground Truths',
        slug: 'erictopol',
        feedUrl: 'https://erictopol.substack.com/feed',
        url: 'https://erictopol.substack.com/',
        author: 'Dr. Eric Topol',
        topics: ['medicine', 'ai', 'research'],
        priority: 'high',
      },
      {
        name: 'The Pragmatic Engineer',
        slug: 'pragmaticengineer',
        feedUrl: 'https://newsletter.pragmaticengineer.com/feed',
        url: 'https://newsletter.pragmaticengineer.com/',
        author: 'Gergely Orosz',
        topics: ['engineering', 'tech', 'careers'],
        priority: 'high',
      },
      {
        name: 'ByteByteGo Newsletter',
        slug: 'bytebytego',
        feedUrl: 'https://blog.bytebytego.com/feed',
        url: 'https://blog.bytebytego.com/',
        author: 'Alex Xu',
        topics: ['systems', 'engineering', 'architecture'],
        priority: 'high',
      },
      {
        name: 'One Useful Thing',
        slug: 'oneusefulthing',
        feedUrl: 'https://www.oneusefulthing.org/feed',
        url: 'https://www.oneusefulthing.org/',
        author: 'Ethan Mollick',
        topics: ['ai', 'innovation', 'education'],
        priority: 'high',
      },
    ],
    'Health & Wellness': [
      {
        name: 'Dan Harris Newsletter (10% Happier)',
        slug: 'danharris',
        feedUrl: 'https://www.danharris.com/feed',
        url: 'https://www.danharris.com/',
        author: 'Dan Harris',
        topics: ['mindfulness', 'mental-health', 'meditation'],
        priority: 'high',
      },
      {
        name: 'Two Percent',
        slug: 'twopercent',
        feedUrl: 'https://twopercent.substack.com/feed',
        url: 'https://twopercent.substack.com/',
        author: 'Michael Easter',
        topics: ['health', 'fitness', 'performance'],
        priority: 'medium',
      },
      {
        name: 'Well Well Well',
        slug: 'wellwellwell',
        feedUrl: 'https://wellwellwell.substack.com/feed',
        url: 'https://wellwellwell.substack.com/',
        author: 'Rosamund Dean',
        topics: ['wellness', 'mental-health', 'women-health'],
        priority: 'medium',
      },
      {
        name: 'Well To Do',
        slug: 'welltodo',
        feedUrl: 'https://welltodo.substack.com/feed',
        url: 'https://welltodo.substack.com/',
        author: 'Rina Raphael',
        topics: ['wellness-industry', 'investigations', 'health'],
        priority: 'medium',
      },
      {
        name: 'The Marginalian',
        slug: 'themarginalian',
        feedUrl: 'https://www.themarginalian.org/feed',
        url: 'https://www.themarginalian.org/',
        author: 'Maria Popova',
        topics: ['philosophy', 'art', 'science', 'wisdom'],
        priority: 'high',
      },
    ],
    'International Affairs & Foreign Policy': [
      {
        name: 'Drop Site News',
        slug: 'dropsite',
        feedUrl: 'https://www.dropsitenews.com/feed',
        url: 'https://www.dropsitenews.com/',
        author: 'Ryan Grim & Jeremy Scahill',
        topics: ['investigations', 'foreign-policy', 'war'],
        priority: 'high',
      },
      {
        name: 'China Talk',
        slug: 'chinatalk',
        feedUrl: 'https://chinatalk.substack.com/feed',
        url: 'https://www.chinatalk.media/',
        author: 'Jordan Schneider',
        topics: ['china', 'technology', 'policy'],
        priority: 'high',
      },
      {
        name: 'Diplomatic',
        slug: 'diplomatic',
        feedUrl: 'https://diplomatic.substack.com/feed',
        url: 'https://diplomatic.substack.com/',
        author: 'Laura Rozen',
        topics: ['diplomacy', 'foreign-policy', 'washington'],
        priority: 'medium',
      },
      {
        name: 'The Cosmopolitan Globalist',
        slug: 'claireberlinski',
        feedUrl: 'https://claireberlinski.substack.com/feed',
        url: 'https://claireberlinski.substack.com/',
        author: 'Claire Berlinski',
        topics: ['international-news', 'democracy', 'geopolitics'],
        priority: 'medium',
      },
      {
        name: 'Timothy Snyder',
        slug: 'timothysnyder',
        feedUrl: 'https://snyder.substack.com/feed',
        url: 'https://snyder.substack.com/',
        author: 'Timothy Snyder',
        topics: ['history', 'authoritarianism', 'democracy'],
        priority: 'high',
      },
    ],
    'Arts & Culture': [
      {
        name: 'Book Post',
        slug: 'books',
        feedUrl: 'https://books.substack.com/feed',
        url: 'https://books.substack.com/',
        author: 'Ann Kjellberg',
        topics: ['books', 'literary-criticism', 'culture'],
        priority: 'high',
      },
      {
        name: 'Sweater Weather',
        slug: 'sweaterweather',
        feedUrl: 'https://sweaterweather.substack.com/feed',
        url: 'https://sweaterweather.substack.com/',
        author: 'Brandon Taylor',
        topics: ['culture', 'creativity', 'writing'],
        priority: 'medium',
      },
      {
        name: 'The Republic of Letters',
        slug: 'republicofletters',
        feedUrl: 'https://republicofletters.substack.com/feed',
        url: 'https://republicofletters.substack.com/',
        author: 'Various',
        topics: ['literature', 'culture', 'essays'],
        priority: 'medium',
      },
      {
        name: 'The Reveal',
        slug: 'thereveal',
        feedUrl: 'https://thereveal.substack.com/feed',
        url: 'https://thereveal.substack.com/',
        author: 'Scott Tobias & Keith Phipps',
        topics: ['film', 'television', 'criticism'],
        priority: 'medium',
      },
      {
        name: 'MovieStruck',
        slug: 'moviestruck',
        feedUrl: 'https://moviestruck.substack.com/feed',
        url: 'https://moviestruck.substack.com/',
        author: 'Ivan Webster',
        topics: ['film', 'criticism', 'culture'],
        priority: 'medium',
      },
    ],
    'Climate & Environment': [
      {
        name: 'The Climate Brink',
        slug: 'theclimatebrink',
        feedUrl: 'https://www.theclimatebrink.com/feed',
        url: 'https://www.theclimatebrink.com/',
        author: 'Andrew Dessler & Zeke Hausfather',
        topics: ['climate-science', 'environment', 'policy'],
        priority: 'high',
      },
      {
        name: 'The Honest Broker',
        slug: 'thehonestbroker',
        feedUrl: 'https://rogerpielkejr.substack.com/feed',
        url: 'https://rogerpielkejr.substack.com/',
        author: 'Roger Pielke Jr.',
        topics: ['climate', 'energy', 'policy'],
        priority: 'medium',
      },
      {
        name: "Robert Bryce's Newsletter",
        slug: 'robertbryce',
        feedUrl: 'https://robertbryce.substack.com/feed',
        url: 'https://robertbryce.substack.com/',
        author: 'Robert Bryce',
        topics: ['energy', 'power', 'markets'],
        priority: 'medium',
      },
      {
        name: 'Sustainability by Numbers',
        slug: 'sustainabilitybynumbers',
        feedUrl: 'https://sustainabilitybynumbers.substack.com/feed',
        url: 'https://sustainabilitybynumbers.substack.com/',
        author: 'Hannah Ritchie',
        topics: ['sustainability', 'data', 'environment'],
        priority: 'medium',
      },
      {
        name: 'Weekly Climate Briefing',
        slug: 'weeklyclimatebriefing',
        feedUrl: 'https://weeklyclimatebriefing.substack.com/feed',
        url: 'https://weeklyclimatebriefing.substack.com/',
        author: 'Dr. Chris Wedding',
        topics: ['climate-tech', 'clean-energy', 'sustainability'],
        priority: 'medium',
      },
    ],
    'Legal Affairs': [
      {
        name: 'Original Jurisdiction',
        slug: 'originaljurisdiction',
        feedUrl: 'https://davidlat.substack.com/feed',
        url: 'https://davidlat.substack.com/',
        author: 'David Lat',
        topics: ['law', 'legal-profession', 'courts'],
        priority: 'high',
      },
      {
        name: 'Law Dork',
        slug: 'lawdork',
        feedUrl: 'https://www.lawdork.com/feed',
        url: 'https://www.lawdork.com/',
        author: 'Chris Geidner',
        topics: ['law', 'supreme-court', 'lgbtq', 'criminal-justice'],
        priority: 'high',
      },
      {
        name: 'One First',
        slug: 'onefirst',
        feedUrl: 'https://onefirst.substack.com/feed',
        url: 'https://onefirst.substack.com/',
        author: 'Steve Vladeck',
        topics: ['supreme-court', 'constitutional-law', 'legal-analysis'],
        priority: 'high',
      },
    ],
  },
};

// Flatten all publications from sections
const allDiscoveredPubs = [];
for (const [section, pubs] of Object.entries(weekOrganizedPublications.sections)) {
  for (const pub of pubs as Array<{
    feedUrl: string;
    [key: string]: unknown;
  }>) {
    allDiscoveredPubs.push({ ...pub, section });
  }
}

// Add user-provided publications that aren't already in the discovered set
const discoveredFeedUrls = new Set(allDiscoveredPubs.map((p) => p.feedUrl));
const uniqueUserPubs: Publication[] = userSources.publications.filter(
  (p) => !discoveredFeedUrls.has(p.feedUrl)
);

// Combine and organize final output
const finalOutput = {
  metadata: {
    description:
      'Comprehensive library sources: The Week magazine sections + user-provided feeds',
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    totalPublications: allDiscoveredPubs.length + uniqueUserPubs.length,
    organizationMethod: 'The Week magazine editorial structure',
    criteria: [
      'High-quality, long-form text content (10+ minute reads)',
      'Active publications (posted within last 30 days)',
      'Professional journalists and subject matter experts',
      'Will be filtered by ingestion pipeline: text-only, English, 10+ minute reads',
    ],
  },
  // Publications organized by The Week sections
  sectionOrganized: weekOrganizedPublications.sections,
  // Additional user-provided publications not yet categorized
  userProvided: uniqueUserPubs,
  // Flat list for ingestion
  allPublications: [...allDiscoveredPubs, ...uniqueUserPubs],
};

await writeFile(
  'content/comprehensive-library-sources.json',
  JSON.stringify(finalOutput, null, 2)
);

console.info(`✅ Created comprehensive-library-sources.json`);
console.info(`   Publications from The Week sections: ${allDiscoveredPubs.length}`);
console.info(`   Additional user-provided publications: ${uniqueUserPubs.length}`);
console.info(`   Total publications: ${finalOutput.metadata.totalPublications}`);
console.info(`\nOrganized by The Week magazine sections:`);
for (const [section, pubs] of Object.entries(weekOrganizedPublications.sections)) {
  console.info(`   ${section}: ${(pubs as unknown[]).length} publications`);
}
