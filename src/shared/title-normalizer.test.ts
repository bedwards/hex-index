import { describe, it, expect } from 'vitest';
import { normalizeTitle, stripTrump } from './title-normalizer.js';

describe('normalizeTitle', () => {
  it('fixes ALL CAPS titles to sentence case', () => {
    expect(normalizeTitle('WHY WE REMAIN ALIVE IN A DEAD INTERNET'))
      .toBe('Why we remain alive in a dead internet');
  });

  it('preserves common acronyms in sentence case conversion', () => {
    expect(normalizeTitle('THE AI REVOLUTION IN THE USA'))
      .toBe('The AI revolution in the USA');
  });

  it('strips YouTube channel suffixes', () => {
    expect(normalizeTitle('How Caligula Took Power | Kings and Generals'))
      .toBe('How caligula took power');
  });

  it('truncates at first // for newsletter titles', () => {
    expect(normalizeTitle('BREAKING NEWS: THE LATEST STORY TODAY // STORY B // STORY C'))
      .toBe('Breaking news: The latest story today');
  });

  it('collapses excessive punctuation', () => {
    expect(normalizeTitle('DELETE WHATSAPP ALREADY!!!'))
      .toBe('Delete Whatsapp already!');
  });

  it('strips emoji prefixes', () => {
    expect(normalizeTitle('\u{1F9E0} Community Wisdom: Topic Here'))
      .toBe('Community wisdom: Topic here');
  });

  it('caps at 100 chars with word boundary', () => {
    const long = 'A '.repeat(60);
    const result = normalizeTitle(long);
    expect(result.length).toBeLessThanOrEqual(101); // 100 + ellipsis char
  });

  it('leaves good sentence-case titles unchanged', () => {
    expect(normalizeTitle("Why net zero isn't working"))
      .toBe("Why net zero isn't working");
  });

  it('handles pipe with long suffix (keeps it)', () => {
    expect(normalizeTitle('Topic | This Is A Very Long Channel Name That Has Many Words'))
      .toBe('Topic | this is a very long channel name that has many words');
  });

  it('does not strip pipe when suffix has more than 5 words', () => {
    expect(normalizeTitle('Title Here | One Two Three Four Five Six'))
      .toBe('Title here | one two three four five six');
  });

  it('handles mixed case Title Case titles', () => {
    expect(normalizeTitle('The Great Gatsby And American Dreams'))
      .toBe('The great gatsby and American dreams');
  });

  it('strips trailing periods', () => {
    expect(normalizeTitle('The End of History.')).toBe('The end of history');
  });

  it('strips trailing period with whitespace', () => {
    expect(normalizeTitle('The End of History.  ')).toBe('The end of history');
  });

  it('strips multiple trailing periods', () => {
    expect(normalizeTitle('The End of History..')).toBe('The end of history');
  });

  it('strips parenthetical asides at end', () => {
    expect(normalizeTitle('The Administration Fires FBI Director (Full Interview)'))
      .toBe('The administration fires FBI director');
  });

  it('keeps parenthetical in middle of title', () => {
    expect(normalizeTitle('The (Real) Story Behind AI'))
      .toBe('The (real) story behind AI');
  });

  it('lowercases individual ALL CAPS words in mixed-case titles', () => {
    expect(normalizeTitle('How MASSIVELY Powerful AI Will Change Everything'))
      .toBe('How massively powerful AI will change everything');
  });

  it('preserves known acronyms in mixed-case titles', () => {
    expect(normalizeTitle('The DOGE Movement and NASA Plans'))
      .toBe('The DOGE movement and NASA plans');
  });

  it('preserves short uppercase acronyms (FBI, CIA)', () => {
    expect(normalizeTitle('The FBI and CIA Work Together'))
      .toBe('The FBI and CIA work together');
  });

  it('preserves proper nouns (countries) in ALL CAPS titles', () => {
    expect(normalizeTitle('THE BATTLE FOR KENTUCKY AND THE RUSSIAN WINTER'))
      .toBe('The battle for Kentucky and the Russian winter');
  });

  it('preserves NCAA acronym', () => {
    expect(normalizeTitle('NCAA TOURNAMENT BRACKETS REVEALED'))
      .toBe('NCAA tournament brackets revealed');
  });

  it("handles possessive proper nouns (russia's → Russia's)", () => {
    expect(normalizeTitle("RUSSIA'S WINTER OFFENSIVE STALLS"))
      .toBe("Russia's winter offensive stalls");
  });

  it('preserves intra-cap brand iPhone', () => {
    expect(normalizeTitle('The new iPhone launch event'))
      .toBe('The new iPhone launch event');
  });

  it("preserves McDonald's as intra-cap proper noun", () => {
    expect(normalizeTitle("McDonald's new menu items"))
      .toBe("McDonald's new menu items");
  });

  it('capitalizes after a colon (new sentence start)', () => {
    expect(normalizeTitle('breaking: a new era begins'))
      .toBe('Breaking: A new era begins');
  });

  it('handles empty string', () => {
    expect(normalizeTitle('')).toBe('');
  });

  it('handles whitespace-only string', () => {
    expect(normalizeTitle('   ')).toBe('');
  });

  it('strips redundant publication-name prefix when publicationName is given', () => {
    expect(normalizeTitle('ChinaTalk: Iran policy shift', { publicationName: 'ChinaTalk' }))
      .toBe('Iran policy shift');
  });

  it('strips publication-name prefix with optional leading "The"', () => {
    expect(normalizeTitle('The Cyber Why: What we read this week', { publicationName: 'The Cyber Why' }))
      .toBe('What we read this week');
  });

  it('strips publication containing "Trump" BEFORE stripTrump rewrites it', () => {
    // Regression: if stripTrump ran first, "The Trump Report" would become
    // "The administration Report" and the publication-name match would fail,
    // leaving a mangled title. The pub-name strip must run first.
    expect(normalizeTitle('The Trump Report: Q3 earnings', { publicationName: 'The Trump Report' }))
      .toBe('Q3 earnings');
  });

  it('leaves title unchanged when publicationName does not match', () => {
    expect(normalizeTitle('Random title about cyberattacks', { publicationName: 'The Cyber Why' }))
      .toBe('Random title about cyberattacks');
  });
});

describe('stripTrump (editorial policy: replace with "the administration")', () => {
  it("replaces leading possessive \"Trump's\"", () => {
    expect(stripTrump("Trump's Tiger-Riding Predicament | Digest: March 2026"))
      .toBe("The administration's Tiger-Riding Predicament | Digest: March 2026");
  });

  it('replaces bare "Trump" mid-sentence', () => {
    expect(stripTrump('What did Trump know about Epstein?'))
      .toBe('What did the administration know about Epstein?');
  });

  it('replaces "Trump\'s" after a colon (mid-sentence stays lowercase)', () => {
    expect(stripTrump("NEW POLL: Trump's approval stuck at record low"))
      .toBe("NEW POLL: the administration's approval stuck at record low");
  });

  it('replaces "Donald Trump" full name and capitalizes at start', () => {
    expect(stripTrump('Donald Trump meets with European leaders'))
      .toBe('The administration meets with European leaders');
  });

  it("replaces \"Donald Trump's\" full possessive at start", () => {
    expect(stripTrump("Donald Trump's cabinet picks under fire"))
      .toBe("The administration's cabinet picks under fire");
  });

  it('is case-insensitive', () => {
    expect(stripTrump('TRUMP ANNOUNCES NEW TARIFFS'))
      .toBe('The administration ANNOUNCES NEW TARIFFS');
  });

  it('handles em-dash attached: "Trump\u2014" ', () => {
    expect(stripTrump('Trump\u2014and his allies\u2014push new policy'))
      .toBe('The administration\u2014and his allies\u2014push new policy');
  });

  it('replaces a bare "Trump" title', () => {
    expect(stripTrump('Trump')).toBe('The administration');
  });

  it("handles curly-apostrophe possessive \"Trump\u2019s\"", () => {
    expect(stripTrump('Trump\u2019s approval rating falls'))
      .toBe("The administration's approval rating falls");
  });

  it('does not touch unrelated words like "trumpet"', () => {
    expect(stripTrump('The trumpet player arrives'))
      .toBe('The trumpet player arrives');
  });

  it('produces grammatical results for "Why Trump needs X"', () => {
    expect(stripTrump('Why Trump needs Ukraine to stop Iranian drones'))
      .toBe('Why the administration needs Ukraine to stop Iranian drones');
  });

  it('produces grammatical results for "Does Trump Really Always Chicken Out?"', () => {
    expect(stripTrump('Does Trump Really Always Chicken Out?'))
      .toBe('Does the administration Really Always Chicken Out?');
  });
});
