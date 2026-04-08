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

/**
 * Words that, when they immediately precede a proper noun (or an
 * originally-capitalized word, or a known particle-follower head), should
 * themselves be capitalized to form a multi-word proper noun.
 *
 * Matched case-insensitively. See issue #501.
 */
export const LEADING_PARTICLES = new Set([
  'san','santa','sao','saint','st','los','las','el','la','le','de','du',
  'des','der','von','van','del','della','di','da','dos','das',
  'new','north','south','east','west','old','great','little','mount','mt',
  'fort','ft','port','cape','lake','river','isle','island','islands',
]);

/**
 * Words that are only treated as proper nouns when they follow a
 * LEADING_PARTICLES token. Kept separate from PROPER_NOUNS_LC because
 * these words are too common to unconditionally capitalize in isolation
 * (e.g. "york" alone is rare but "New York" is a place name).
 */
const PARTICLE_FOLLOWERS_LC = new Set([
  'york','orleans','jersey','hampshire','zealand','guinea','paulo',
  'petersburg','louis','antonio','juan','salvador','everest','rushmore',
  'kilimanjaro','fuji','etna','vesuvius','rainier','whitney',
]);

interface ParseOpts {
  /** Preserve a word as-is from the original if it has interior capitals (iPhone, McDonald). */
  preserveIntraCap: boolean;
}

interface ParsedToken {
  raw: string;
  lead: string;
  trail: string;
  core: string;
  isWhitespace: boolean;
}

function parseToken(tok: string): ParsedToken {
  if (/^\s+$/.test(tok)) {
    return { raw: tok, lead: '', trail: '', core: '', isWhitespace: true };
  }
  const lead = tok.match(/^[^A-Za-z0-9]*/)?.[0] ?? '';
  const trail = tok.match(/[^A-Za-z0-9]*$/)?.[0] ?? '';
  const core = tok.slice(lead.length, tok.length - trail.length);
  return { raw: tok, lead, trail, core, isWhitespace: false };
}

function nextWordIndex(tokens: ParsedToken[], i: number): number {
  for (let j = i + 1; j < tokens.length; j++) {
    if (!tokens[j].isWhitespace && tokens[j].core) { return j; }
  }
  return -1;
}

/** Strip a trailing possessive suffix for lookup. */
function stripPossessive(core: string): { bare: string; suffix: string } {
  const m = core.match(/^(.+?)(['\u2019][sS]|['\u2019])$/);
  if (!m) { return { bare: core, suffix: '' }; }
  return { bare: m[1], suffix: m[2].toLowerCase() };
}

/**
 * True if this token's core looks like a proper noun for the particle
 * lookahead heuristic: either it's a known proper noun / particle-follower,
 * or it was originally capitalized in the input, or it's an intra-cap brand.
 */
function looksLikeProperNoun(core: string): boolean {
  if (!core) { return false; }
  const { bare } = stripPossessive(core);
  const lc = bare.toLowerCase();
  if (PROPER_NOUNS_LC.has(lc)) { return true; }
  if (PARTICLE_FOLLOWERS_LC.has(lc)) { return true; }
  // We intentionally do NOT trigger on "originally capitalized" alone:
  // Title Case input like "The Great Gatsby" should still down-case to
  // "the great gatsby" (Gatsby isn't in our proper-noun set). The particle
  // lookahead only fires on explicit set membership.
  return false;
}

function titleCase(core: string): string {
  if (!core) { return core; }
  return core[0].toUpperCase() + core.slice(1).toLowerCase();
}

export function toSentenceCase(
  input: string,
  opts: ParseOpts = { preserveIntraCap: true },
): string {
  if (!input) { return input; }
  // Tokenize on whitespace; we'll preserve punctuation in tokens.
  const rawTokens = input.split(/(\s+)/);
  const tokens = rawTokens.map(parseToken);

  let nextIsSentenceStart = true;
  const results: string[] = new Array<string>(tokens.length).fill('');
  const handled: boolean[] = new Array<boolean>(tokens.length).fill(false);

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.isWhitespace) {
      results[i] = t.raw;
      continue;
    }
    if (handled[i]) { continue; }
    if (!t.core) {
      // pure punctuation token — does not change sentence-start state
      results[i] = t.raw;
      continue;
    }

    // ---- Multi-word proper noun (particle) lookahead ----
    // If this token is a LEADING_PARTICLE and the next word-token looks
    // like a proper noun, capitalize both. Chain through further
    // particles (e.g. "de la cruz").
    if (LEADING_PARTICLES.has(t.core.toLowerCase())) {
      const run: number[] = [i];
      let j = nextWordIndex(tokens, i);
      while (j !== -1 && LEADING_PARTICLES.has(tokens[j].core.toLowerCase())) {
        // Only chain if the eventual non-particle target exists and is proper.
        const after = nextWordIndex(tokens, j);
        if (after === -1) { break; }
        run.push(j);
        j = after;
      }
      if (j !== -1 && looksLikeProperNoun(tokens[j].core)) {
        run.push(j);
        for (const idx of run) {
          const tk = tokens[idx];
          const { bare, suffix } = stripPossessive(tk.core);
          let emitted: string;
          if (KNOWN_ACRONYMS.has(bare.toUpperCase())) {
            emitted = bare.toUpperCase() + suffix;
          } else if (
            opts.preserveIntraCap &&
            /[A-Z]/.test(bare.slice(1)) &&
            !/^[A-Z]+$/.test(bare)
          ) {
            emitted = bare + suffix;
          } else {
            emitted = titleCase(bare) + suffix;
          }
          results[idx] = tk.lead + emitted + tk.trail;
          handled[idx] = true;
        }
        const last = tokens[run[run.length - 1]];
        nextIsSentenceStart =
          /[.!?:]$/.test(last.trail) || /[.!?:]$/.test(last.core);
        continue;
      }
      // no match — fall through to normal handling
    }

    // ---- Per-token sentence-case (original logic) ----
    const { bare: lookupCore, suffix: possSuffix } = stripPossessive(t.core);

    let result: string;
    if (KNOWN_ACRONYMS.has(lookupCore.toUpperCase())) {
      result = lookupCore.toUpperCase() + possSuffix;
    } else if (
      opts.preserveIntraCap &&
      /[A-Z]/.test(lookupCore.slice(1)) &&
      !/^[A-Z]+$/.test(lookupCore)
    ) {
      result = lookupCore + possSuffix;
    } else if (PROPER_NOUNS_LC.has(lookupCore.toLowerCase())) {
      result =
        lookupCore[0].toUpperCase() + lookupCore.slice(1).toLowerCase() + possSuffix;
    } else if (nextIsSentenceStart) {
      result = t.core[0].toUpperCase() + t.core.slice(1).toLowerCase();
    } else {
      result = t.core.toLowerCase();
    }

    if (/[.!?:]$/.test(t.trail) || /[.!?:]$/.test(t.core)) {
      nextIsSentenceStart = true;
    } else {
      nextIsSentenceStart = false;
    }

    results[i] = t.lead + result + t.trail;
    handled[i] = true;
  }

  return results.join('');
}
