import { readFile, writeFile } from 'fs/promises';

interface Publication {
  name: string;
  slug: string;
  author: string;
  topics: string[];
  category: string;
}

interface DiscoveredData {
  publications: Publication[];
}

const data = JSON.parse(await readFile('content/discovered-publications.json', 'utf8')) as DiscoveredData;

const transformed = {
    publications: data.publications.map((pub: Publication) => ({
        name: pub.name,
        slug: pub.slug,
        feedUrl: `https://${pub.slug}.substack.com/feed`,
        url: `https://${pub.slug}.substack.com`,
        author: pub.author,
        topics: pub.topics,
        category: pub.category
    }))
};

await writeFile('content/ingestion-ready-publications.json', JSON.stringify(transformed, null, 2));
