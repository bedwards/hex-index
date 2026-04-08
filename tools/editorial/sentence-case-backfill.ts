/**
 * One-shot: convert every article title in app.articles to sentence case.
 *
 * Sentence-case rules (deterministic, no LLM):
 *  - First letter of first word: capitalized.
 *  - First letter after sentence-ending punctuation (. ! ? :) + space: capitalized.
 *  - All other words: lowercased.
 *  - Words in KNOWN_ACRONYMS preserved as uppercase.
 *  - Words in the original title that contain an interior uppercase letter
 *    (e.g. "iPhone", "GitHub", "McDonald's") are preserved verbatim — heuristic
 *    for brand names and intra-cap proper nouns.
 *  - Words in PROPER_NOUNS preserved as-is (best-effort list).
 *
 * Run:
 *   npx tsx tools/editorial/sentence-case-backfill.ts            # dry-run, prints diff
 *   npx tsx tools/editorial/sentence-case-backfill.ts --apply    # writes UPDATEs
 */

import 'dotenv/config';
import { Pool } from 'pg';

const KNOWN_ACRONYMS = new Set([
  'AI','AIDS','API','BBC','CCP','CEO','CFO','CIA','CTO','DEA','DOD','DOGE','DOJ',
  'EPA','EU','FAA','FBI','FCC','FDA','FEMA','FTC','GDP','GOP','GPT','HHS','HUD',
  'ICE','IDF','IMF','IRS','ISIS','LLC','LLM','MAGA','MIT','NASA','NATO','NBA','NCAA',
  'NFL','NHL','NHS','NIH','NSA','NYC','OECD','OPEC','PBS','PR','RNC','SCOTUS','SEC',
  'TSA','UK','UN','US','USA','USD','VA','WHO','WTO','XR','II','III','IV','VI','VII',
  'VIII','IX','XI','XII','EV','EVs','UFO','UFOs','OK',
]);

// Proper nouns we want to preserve as Capital. Best-effort, expand over time.
// Kept lowercase here, matched case-insensitively.
const PROPER_NOUNS_LC = new Set([
  // countries / regions
  'america','american','americans','britain','british','china','chinese','russia','russian',
  'ukraine','ukrainian','iran','iranian','israel','israeli','japan','japanese','korea','korean',
  'india','indian','germany','german','france','french','italy','italian','spain','spanish',
  'mexico','mexican','canada','canadian','europe','european','africa','african','asia','asian',
  'taiwan','taiwanese','vietnam','vietnamese','venezuela','venezuelan','syria','syrian',
  'afghanistan','afghan','iraq','iraqi','poland','polish','greece','greek','turkey','turkish',
  'switzerland','swiss','sweden','swedish','norway','norwegian','denmark','danish','finland',
  'finnish','netherlands','dutch','belgium','belgian','austria','austrian','hungary','hungarian',
  'czech','romania','romanian','bulgaria','bulgarian','portugal','portuguese','egypt','egyptian',
  'saudi','arabia','arabian','arab','arabs','argentina','argentine','brazil','brazilian',
  'colombia','colombian','peru','peruvian','chile','chilean','australia','australian','indonesia',
  'indonesian','malaysia','malaysian','philippines','filipino','thailand','thai','singapore',
  'pakistan','pakistani','bangladesh','bangladeshi','nigeria','nigerian','kenya','kenyan',
  'ethiopia','ethiopian','south','north','west','east','western','eastern','northern','southern',
  // states + cities
  'alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware',
  'florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky',
  'louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri',
  'montana','nebraska','nevada','ohio','oklahoma','oregon','pennsylvania','tennessee','texas',
  'utah','vermont','virginia','washington','wisconsin','wyoming',
  'london','paris','tokyo','beijing','moscow','berlin','rome','madrid','vienna','prague',
  'budapest','warsaw','dublin','lisbon','athens','istanbul','cairo','jerusalem','tehran',
  'baghdad','damascus','kabul','seoul','sydney','melbourne','mumbai','delhi','bangkok',
  'jakarta','manila','singapore','hanoi','shanghai','hong','kong','dubai','mecca','medina',
  'kyiv','kiev','kharkiv','mariupol','bakhmut','donetsk','luhansk','crimea','odesa','sevastopol','dnipro','lviv','zaporizhzhia','minsk','riga','tallinn','helsinki','stockholm','oslo','copenhagen','amsterdam',
  'brussels','geneva','zurich','milan','barcelona','seville','porto','bratislava','sofia',
  'bucharest','belgrade','sarajevo','zagreb','ljubljana','ankara','tripoli','tunis','rabat',
  'lagos','nairobi','johannesburg','cairo','sao','rio','buenos','aires','lima','santiago',
  'caracas','bogota','havana','toronto','montreal','vancouver','ottawa','quebec',
  'nyc','manhattan','brooklyn','queens','bronx','boston','chicago','denver','seattle',
  'portland','austin','dallas','houston','miami','atlanta','orlando','philadelphia','baltimore',
  'detroit','milwaukee','cleveland','phoenix','tucson','vegas','reno','sacramento','francisco',
  'angeles','diego','jose','oakland','berkeley',
  // companies / brands
  'apple','google','microsoft','amazon','meta','facebook','instagram','twitter','tiktok',
  'youtube','netflix','spotify','uber','lyft','airbnb','tesla','spacex','starlink','openai',
  'anthropic','claude','chatgpt','gemini','deepseek','nvidia','intel','amd','samsung','sony',
  'huawei','xiaomi','alibaba','tencent','bytedance','walmart','target','costco','starbucks',
  'mcdonald','disney','netflix','vanguard','blackrock','goldman','sachs','morgan','citigroup',
  'visa','mastercard','paypal','stripe','shopify','zoom','slack','github','gitlab','reddit',
  'discord','telegram','whatsapp','signal','vercel','cloudflare','aws','azure','docker',
  'kubernetes','linux','android','windows','macos','ios','chrome','firefox','safari',
  // historical / cultural
  'roman','romans','greek','greeks','egyptian','egyptians','byzantine','ottoman','ottomans',
  'soviet','soviets','nazi','nazis','allied','axis','christian','christians','christianity',
  'muslim','muslims','islam','islamic','jewish','jews','judaism','hindu','hindus','hinduism',
  'buddhist','buddhism','catholic','catholics','catholicism','protestant','orthodox',
  'mormon','sikh','jesus','christ','muhammad','buddha','moses','abraham','god','allah',
  'bible','quran','torah','vatican','mecca','medina','jerusalem','bethlehem','rome','athens',
  'constantinople','byzantium','sparta','troy','carthage','babylon','nineveh','jericho',
  // common figures + leaders the loop sees often
  'putin','xi','jinping','zelensky','netanyahu','biden','obama','clinton','reagan','kennedy',
  'lincoln','washington','jefferson','hamilton','madison','franklin','roosevelt','truman',
  'eisenhower','nixon','carter','bush','musk','bezos','zuckerberg','altman','hassabis',
  'gates','jobs','buffett','dimon','powell','yellen','dimon',
  // months + days (always capitalized)
  'january','february','march','april','may','june','july','august','september','october',
  'november','december','monday','tuesday','wednesday','thursday','friday','saturday','sunday',
  // misc proper nouns
  'wikipedia','speechify','substack','reddit','twitter','x','medium','vox','politico',
  'bloomberg','reuters','axios','bbc','cnn','msnbc','fox','nbc','cbs','abc','npr','wsj','ft',
  'nytimes','wapo','guardian','telegraph','economist','atlantic','newyorker','wired','verge',
  'derby','olympics','olympic','superbowl','worldcup','wimbledon',
]);

interface ParseOpts {
  /** preserve a word as-is from the original if it has interior capitals (iPhone) */
  preserveIntraCap: boolean;
}

export function toSentenceCase(input: string, opts: ParseOpts = { preserveIntraCap: true }): string {
  if (!input) {return input;}
  // Tokenize on whitespace; we'll preserve punctuation in tokens.
  const tokens = input.split(/(\s+)/);

  let nextIsSentenceStart = true;

  const out = tokens.map((tok) => {
    if (/^\s+$/.test(tok)) { return tok; }

    // Pull off leading punctuation (e.g., ("hello)
    const lead = tok.match(/^[^A-Za-z0-9]*/)?.[0] ?? '';
    const trail = tok.match(/[^A-Za-z0-9]*$/)?.[0] ?? '';
    const core = tok.slice(lead.length, tok.length - trail.length);

    if (!core) {
      // pure punctuation token
      return tok;
    }

    let result: string;

    // Strip a trailing possessive `'s` or `'` for lookups (russia's, McDonald's).
    const possMatch = core.match(/^(.+?)('s|')$/);
    const lookupCore = possMatch ? possMatch[1] : core;
    const possSuffix = possMatch ? possMatch[2] : '';

    // 1. Acronym match (case-insensitive) on the lookup core
    if (KNOWN_ACRONYMS.has(lookupCore.toUpperCase())) {
      result = lookupCore.toUpperCase() + possSuffix;
    }
    // 2. Intra-cap brand (e.g. iPhone, GitHub, McDonald, eBay): preserve verbatim
    else if (opts.preserveIntraCap && /[A-Z]/.test(core.slice(1)) && core[0] !== core[0].toUpperCase()) {
      // word like "iPhone" — first lower, later upper. preserve.
      result = core;
    }
    else if (opts.preserveIntraCap && /^[A-Z][a-z]+[A-Z]/.test(core)) {
      // word like "McDonald" — Title + interior cap. preserve.
      result = core;
    }
    // 3. Proper noun match (case-insensitive) on lookup core (handles possessives)
    else if (PROPER_NOUNS_LC.has(lookupCore.toLowerCase())) {
      result = lookupCore[0].toUpperCase() + lookupCore.slice(1).toLowerCase() + possSuffix;
    }
    // 4. Sentence start
    else if (nextIsSentenceStart) {
      result = core[0].toUpperCase() + core.slice(1).toLowerCase();
    }
    // 5. Default: lowercase
    else {
      result = core.toLowerCase();
    }

    // Update sentence-start flag for next token based on trailing punctuation
    // of THIS token (e.g., "Word:" makes next word a sentence start).
    if (/[.!?:]$/.test(trail) || /[.!?:]$/.test(core)) {
      nextIsSentenceStart = true;
    } else {
      nextIsSentenceStart = false;
    }

    return lead + result + trail;
  });

  return out.join('');
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');
  const limit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1] ?? '0', 10)
    : 0;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres@localhost:5432/hex-index',
  });

  try {
    const limitClause = limit > 0 ? `LIMIT ${limit}` : '';
    const { rows } = await pool.query<{ id: string; title: string }>(`
      SELECT id, title
      FROM app.articles
      WHERE title IS NOT NULL AND title <> ''
      ORDER BY created_at DESC
      ${limitClause}
    `);

    let changed = 0;
    let unchanged = 0;
    const samples: { before: string; after: string }[] = [];

    for (const row of rows) {
      const newTitle = toSentenceCase(row.title);
      if (newTitle !== row.title) {
        changed++;
        if (samples.length < 25) {samples.push({ before: row.title, after: newTitle });}
        if (apply) {
          await pool.query('UPDATE app.articles SET title = $1 WHERE id = $2', [newTitle, row.id]);
        }
      } else {
        unchanged++;
      }
    }

    console.info(`\n=== Sentence-case backfill ${apply ? '(APPLIED)' : '(DRY-RUN)'} ===`);
    console.info(`Total scanned:  ${rows.length}`);
    console.info(`Changed:        ${changed}`);
    console.info(`Already OK:     ${unchanged}`);
    console.info(`\nFirst ${samples.length} changes:`);
    for (const s of samples) {
      console.info(`  - ${s.before}`);
      console.info(`  + ${s.after}`);
    }
  } finally {
    await pool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
