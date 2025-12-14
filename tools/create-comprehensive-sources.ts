#!/usr/bin/env npx tsx
/**
 * Create comprehensive sources file from all provided feed URLs
 */

import { writeFile } from 'fs/promises';

// All feed URLs from user input (combining all lists, removing comments)
const allFeeds = [
  // From first list (all feeds, commented and uncommented)
  "https://3blue1brown.substack.com/feed",
  "https://aaronjohnbastani.substack.com/feed",
  "https://amnestyinternationalusa.substack.com/feed",
  "https://amnestyinternationalusa510722.substack.com/feed",
  "https://chrislatray.substack.com/feed",
  "https://arcadiascience.substack.com/feed",
  "https://cyrilhedoin.substack.com/feed",
  "https://www.asimov.press/feed",
  "https://www.astralcodexten.com/feed",
  "https://auraist.substack.com/feed",
  "https://benthams.substack.com/feed",
  "https://www.betonit.ai/feed",
  "https://www.thebignewsletter.com/feed",
  "https://www.bigtechontrial.com/feed",
  "https://www.bloodinthemachine.com/feed",
  "https://www.theborderchronicle.com/feed",
  "https://www.broadview.news/feed",
  "https://jeffrich.substack.com/feed",
  "https://arbesman.substack.com/feed",
  "https://www.caitlinjohnst.one/feed",
  "https://adamtooze.substack.com/feed",
  "https://claygtmengineering.substack.com/feed",
  "https://www.commonreader.co.uk/feed",
  "https://www.conspicuouscognition.com/feed",
  "https://www.construction-physics.com/feed",
  "https://theconvivialsociety.substack.com/feed",
  "https://claireberlinski.substack.com/feed",
  "https://thecrudechronicles.substack.com/feed",
  "https://annehelen.substack.com/feed",
  "https://culturestudypod.substack.com/feed",
  "https://curtjaimungal.substack.com/feed",
  "https://decodingbio.substack.com/feed",
  "https://www.discourseblog.com/feed",
  "https://www.dropsitenews.com/feed",
  "https://duanemcmullen.substack.com/feed",
  "https://egorkotkin.substack.com/feed",
  "https://www.henrikkarlsson.xyz/feed",
  "https://experiencemachines.substack.com/feed",
  "https://www.exponentialview.co/feed",
  "https://extelligence.substack.com/feed",
  "https://fakenous.substack.com/feed",
  "https://focus966.substack.com/feed",
  "https://freddiedeboer.substack.com/feed",
  "https://greenwald.substack.com/feed",
  "https://www.globaldispatches.org/feed",
  "https://goodscience.substack.com/feed",
  "https://www.goodthoughts.blog/feed",
  "https://grandhotelabyss.substack.com/feed",
  "https://haljohnsonbooks.substack.com/feed",
  "https://hmreads89.substack.com/feed",
  "https://www.the-hinternet.com/feed",
  "https://www.honest-broker.com/feed",
  "https://www.markkoyama.com/feed",
  "https://www.hamiltonnolan.com/feed",
  "https://hunterharris.substack.com/feed",
  "https://thehuntfortomclancy.substack.com/feed",
  "https://www.imightbewrong.org/feed",
  "https://indieauthors.substack.com/feed",
  "https://www.infinitelymore.xyz/feed",
  "https://interconnect.substack.com/feed",
  "https://www.theintrinsicperspective.com/feed",
  "https://itsherfactory.substack.com/feed",
  "https://jasonhickel.substack.com/feed",
  "https://mearsheimer.substack.com/feed",
  "https://juliabelluz.substack.com/feed",
  "https://krystalkyleandfriends.substack.com/feed",
  "https://www.kvetch.au/feed",
  "https://tarahenley.substack.com/feed",
  "https://www.leefang.com/feed",
  "https://www.lennysnewsletter.com/feed",
  "https://stephaniekelton.substack.com/feed",
  "https://heathercoxrichardson.substack.com/feed",
  "https://likeababybird.substack.com/feed",
  "https://www.lukewsavage.com/feed",
  "https://davidperlmutter.substack.com/feed",
  "https://www.metropolitanreview.org/feed",
  "https://www.mtracey.net/feed",
  "https://newsletter.mkt1.co/feed",
  "https://monicacmiller.substack.com/feed",
  "https://mostly.substack.com/feed",
  "https://www.narratively.com/feed",
  "https://www.narrativelyacademy.com/feed",
  "https://newworkinphilosophy.substack.com/feed",
  "https://www.noahpinion.blog/feed",
  "https://www.offmessage.net/feed",
  "https://thekevinalexander.substack.com/feed",
  "https://optimistsbarn.substack.com/feed",
  "https://www.readtheorchard.org/feed",
  "https://erikangner.substack.com/feed",
  "https://philosophizethis.substack.com/feed",
  "https://benburgis.substack.com/feed",
  "https://www.pilcrowmag.com/feed",
  "https://popular.info/feed",
  "https://www.port-of-entry.com/feed",
  "https://www.racket.news/feed",
  "https://ranaayyub.substack.com/feed",
  "https://aaronbastani.substack.com/feed",
  "https://www.richardhanania.com/feed",
  "https://www.robkhenderson.com/feed",
  "https://therope.substack.com/feed",
  "https://nicolasdelon.substack.com/feed",
  "https://samharris.substack.com/feed",
  "https://savageminds.substack.com/feed",
  "https://seanfisher971.substack.com/feed",
  "https://jaimebrooks.substack.com/feed",
  "https://seymourhersh.substack.com/feed",
  "https://www.natesilver.net/feed",
  "https://jessesingal.substack.com/feed",
  "https://sinocism.com/feed",
  "https://www.slowboring.com/feed",
  "https://blog.spec.tech/feed",
  "https://eschwitz.substack.com/feed",
  "https://www.sportspolitika.news/feed",
  "https://www.statsignificant.com/feed",
  "https://thetechbubble.substack.com/feed",
  "https://travelsofsamwise.substack.com/feed",
  "https://tvphilosophy.substack.com/feed",
  "https://walterkirn.substack.com/feed",
  "https://jimmyalfonsolicon.substack.com/feed",
  "https://ksetiya.substack.com/feed",
  "https://theupheaval.substack.com/feed",
  "https://thewalrusca.substack.com/feed",
  "https://matthewclayfield.substack.com/feed",
  "https://andymasley.substack.com/feed",
  "https://www.woman-of-letters.com/feed",
  "https://woodfromeden.substack.com/feed",
  "https://wesleyyang.substack.com/feed",
  "https://jenn5c3s4.substack.com/feed",
  "https://zeteo.com/feed",
  // From second list (additional feeds)
  "https://the.ink/feed",
  "https://www.gelliottmorris.com/feed",
];

// Deduplicate
const uniqueFeeds = Array.from(new Set(allFeeds)).sort();

// Extract slug from feed URL
function extractSlug(feedUrl: string): string {
  // Remove https://
  let url = feedUrl.replace('https://', '');

  // Handle substack URLs: something.substack.com/feed -> something
  if (url.includes('.substack.com/feed')) {
    return url.split('.substack.com')[0];
  }

  // Handle custom domains: www.example.com/feed -> example
  url = url.replace('www.', '').replace('/feed', '');

  // Get domain name
  const domain = url.split('/')[0].split('.')[0];
  return domain;
}

// Extract base URL
function extractBaseUrl(feedUrl: string): string {
  return feedUrl.replace('/feed', '');
}

// Create publications array
const publications = uniqueFeeds.map((feedUrl) => ({
  name: '', // Will be filled in during ingestion
  slug: extractSlug(feedUrl),
  feedUrl,
  url: extractBaseUrl(feedUrl),
  author: '', // Will be filled in during ingestion
  topics: [] as string[],
  category: 'user-provided',
}));

const outputData = {
  metadata: {
    description: 'Comprehensive list of all user-provided publication feeds',
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    totalPublications: publications.length,
    criteria: [
      'All user-provided feeds (including previously commented-out entries)',
      'Will be filtered by ingestion pipeline: text-only, 10+ minute reads',
    ],
  },
  publications,
};

await writeFile('content/comprehensive-user-sources.json', JSON.stringify(outputData, null, 2));

console.info(`✅ Created comprehensive-user-sources.json with ${publications.length} unique publications`);
