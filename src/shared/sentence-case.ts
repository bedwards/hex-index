/**
 * Deterministic sentence-case helper for article titles.
 *
 * Extracted from tools/editorial/sentence-case-backfill.ts so it can be reused
 * by the ingest-time normalizer (src/shared/title-normalizer.ts), the Qwen
 * title-cleanup job (tools/jobs/title-cleanup.ts), and the one-shot backfill.
 *
 * Rules:
 *  - First word of the title: capitalized.
 *  - Words after sentence-ending punctuation (. ! ? :) + space: capitalized.
 *  - All other words: lowercased.
 *  - Words in KNOWN_ACRONYMS preserved uppercase (NASA, AI, NCAA, …).
 *  - Words with interior uppercase letters (iPhone, GitHub, McDonald's) are
 *    preserved verbatim — a heuristic for brands and intra-cap proper nouns.
 *  - Words in PROPER_NOUNS_LC (countries, cities, brands, months, leaders, …)
 *    are capitalized. Possessive suffix ('s / ’s) is preserved.
 */

export const KNOWN_ACRONYMS = new Set([
  'AI','AIDS','API','BBC','CCP','CEO','CFO','CIA','CTO','DEA','DOD','DOGE','DOJ',
  'EPA','EU','FAA','FBI','FCC','FDA','FEMA','FTC','GDP','GOP','GPT','HHS','HUD',
  'ICE','IDF','IMF','IRS','ISIS','LLC','LLM','MAGA','MIT','NASA','NATO','NBA','NCAA',
  'NFL','NHL','NHS','NIH','NSA','NYC','OECD','OPEC','PBS','PR','RNC','SCOTUS','SEC',
  'TSA','UK','UN','US','USA','USD','VA','WHO','WTO','XR','II','III','IV','VI','VII',
  'VIII','IX','XI','XII','EV','EVs','UFO','UFOs','OK',
]);

// Proper nouns we want to preserve as Capital. Best-effort, expand over time.
// Matched case-insensitively.
// NOTE: each group is sorted alphabetically within itself to make future
// deduping/auditing easier. Duplicates across groups are removed.
export const PROPER_NOUNS_LC = new Set([
  // countries / regions
  'afghan','afghanistan','africa','african','america','american','americans','arab','arabia',
  'arabian','arabs','argentina','argentine','asia','asian','australia','australian','austria',
  'austrian','bangladesh','bangladeshi','belgian','belgium','brazil','brazilian','britain',
  'british','bulgaria','bulgarian','canada','canadian','chile','chilean','china','chinese',
  'colombia','colombian','czech','danish','denmark','dutch','east','eastern','egypt','egyptian',
  'ethiopia','ethiopian','europe','european','filipino','finland','finnish','france','french',
  'german','germany','greece','greek','hungarian','hungary','india','indian','indonesia',
  'indonesian','iran','iranian','iraq','iraqi','israel','israeli','italian','italy','japan',
  'japanese','kenya','kenyan','korea','korean','malaysia','malaysian','mexican','mexico',
  'netherlands','nigeria','nigerian','north','northern','norway','norwegian','pakistan',
  'pakistani','peru','peruvian','philippines','poland','polish','portugal','portuguese',
  'romania','romanian','russia','russian','saudi','singapore','south','southern','spain',
  'spanish','sweden','swedish','swiss','switzerland','syria','syrian','taiwan','taiwanese',
  'thai','thailand','turkey','turkish','ukraine','ukrainian','venezuela','venezuelan',
  'vietnam','vietnamese','west','western',
  // states + cities
  'aires','alabama','alaska','amsterdam','angeles','ankara','arizona','arkansas','athens',
  'atlanta','austin','bakhmut','baltimore','bangkok','barcelona','beijing','belgrade','berkeley',
  'berlin','bogota','boston','bratislava','brooklyn','bronx','brussels','bucharest','budapest',
  'buenos','cairo','california','caracas','chicago','cleveland','colorado','connecticut',
  'copenhagen','crimea','dallas','delaware','delhi','denver','detroit','diego','dnipro',
  'donetsk','dubai','dublin','florida','francisco','geneva','georgia','hanoi','havana','hawaii',
  'helsinki','hong','houston','idaho','illinois','indiana','iowa','istanbul','jakarta',
  'jerusalem','johannesburg','jose','kabul','kansas','kentucky','kharkiv','kiev','kong','kyiv',
  'lagos','lima','lisbon','ljubljana','london','louisiana','luhansk','lviv','madrid','maine',
  'manhattan','manila','mariupol','maryland','massachusetts','mecca','medina','melbourne',
  'miami','michigan','milan','milwaukee','minnesota','minsk','mississippi','missouri','montana',
  'montreal','moscow','mumbai','nairobi','nebraska','nevada','nyc','oakland','odesa','ohio',
  'oklahoma','oregon','orlando','oslo','ottawa','paris','pennsylvania','philadelphia','phoenix',
  'portland','porto','prague','quebec','queens','rabat','reno','riga','rio','rome','sacramento',
  'santiago','sao','sarajevo','seattle','seoul','sevastopol','seville','shanghai','sofia',
  'stockholm','sydney','tallinn','tehran','tennessee','texas','tokyo','toronto','tripoli',
  'tucson','tunis','utah','vancouver','vegas','vermont','vienna','virginia','warsaw',
  'washington','wisconsin','wyoming','zagreb','zaporizhzhia','zurich',
  // Baghdad, Damascus appear under historical/cultural below? keep cities here too
  'baghdad','damascus',
  // companies / brands
  'airbnb','alibaba','amazon','amd','android','anthropic','apple','aws','azure','blackrock',
  'bytedance','chatgpt','chrome','citigroup','claude','cloudflare','costco','deepseek','discord',
  'disney','docker','facebook','firefox','gemini','github','gitlab','goldman','google','huawei',
  'instagram','intel','ios','kubernetes','linux','lyft','macos','mastercard','mcdonald','meta',
  'microsoft','morgan','netflix','nvidia','openai','paypal','reddit','sachs','safari','samsung',
  'shopify','signal','slack','sony','spacex','spotify','starbucks','starlink','target','telegram',
  'tencent','tesla','tiktok','twitter','uber','vanguard','vercel','visa','walmart','whatsapp',
  'windows','xiaomi','youtube','zoom',
  // historical / cultural
  'abraham','allah','allied','athens','axis','babylon','bethlehem','bible','buddha','buddhism',
  'buddhist','byzantine','byzantium','carthage','catholic','catholicism','catholics','christ',
  'christian','christianity','christians','constantinople','egyptians','god','greeks','hindu',
  'hinduism','hindus','islam','islamic','jericho','jesus','jewish','jews','judaism','mormon',
  'moses','muhammad','muslim','muslims','nazi','nazis','nineveh','orthodox','ottoman','ottomans',
  'protestant','quran','roman','romans','sikh','soviet','soviets','sparta','torah','troy',
  'vatican',
  // common figures + leaders the loop sees often
  'altman','bezos','biden','buffett','bush','carter','clinton','dimon','eisenhower','franklin',
  'gates','hamilton','hassabis','jefferson','jinping','jobs','kennedy','lincoln','madison',
  'musk','netanyahu','nixon','obama','powell','putin','reagan','roosevelt','truman','xi',
  'yellen','zelensky','zuckerberg',
  // months + days (always capitalized)
  'april','august','december','february','january','july','june','march','may','monday',
  'november','october','saturday','september','sunday','thursday','tuesday','wednesday','friday',
  // misc proper nouns
  'abc','atlantic','axios','bbc','bloomberg','cbs','cnn','derby','economist','fox','ft',
  'guardian','medium','msnbc','nbc','newyorker','npr','nytimes','olympic','olympics','politico',
  'reuters','speechify','substack','superbowl','telegraph','verge','vox','wapo','wikipedia',
  'wimbledon','wired','worldcup','wsj','x',
]);

interface ParseOpts {
  /** Preserve a word as-is from the original if it has interior capitals (iPhone, McDonald). */
  preserveIntraCap: boolean;
}

export function toSentenceCase(
  input: string,
  opts: ParseOpts = { preserveIntraCap: true },
): string {
  if (!input) { return input; }
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
      // pure punctuation token — does not change sentence-start state
      return tok;
    }

    let result: string;

    // Strip a trailing possessive `'s` or `'` for lookups (russia's, McDonald's).
    const possMatch = core.match(/^(.+?)(['\u2019][sS]|['\u2019])$/);
    const lookupCore = possMatch ? possMatch[1] : core;
    // Normalize possessive suffix to lowercase s (russia'S → russia's).
    const possSuffix = possMatch ? possMatch[2].toLowerCase() : '';

    // 1. Acronym match (case-insensitive) on the lookup core
    if (KNOWN_ACRONYMS.has(lookupCore.toUpperCase())) {
      result = lookupCore.toUpperCase() + possSuffix;
    }
    // 2. Intra-cap brand/proper noun (iPhone, eBay, GitHub, McDonald's):
    // preserve verbatim if the lookup core has an interior uppercase letter
    // and is not all-caps (all-caps words fall through to the acronym branch
    // above or get lowercased below). Re-append any possessive suffix.
    // TODO(multi-word proper nouns): This word-by-word approach cannot
    // handle multi-word place names where some components are common
    // words (e.g. "San Francisco", "Los Angeles", "Sao Paulo", "New
    // York"). A follow-up should introduce a LEADING_PARTICLES set
    // ('san','los','saint','new','santa','sao','el','la','le','las',
    // 'de','du') that, when matched, also preserves the NEXT token's
    // capitalization. Tracked in issue #501.
    else if (
      opts.preserveIntraCap &&
      /[A-Z]/.test(lookupCore.slice(1)) &&
      !/^[A-Z]+$/.test(lookupCore)
    ) {
      result = lookupCore + possSuffix;
    }
    // 3. Proper noun match (case-insensitive) on lookup core (handles possessives)
    else if (PROPER_NOUNS_LC.has(lookupCore.toLowerCase())) {
      result =
        lookupCore[0].toUpperCase() + lookupCore.slice(1).toLowerCase() + possSuffix;
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
