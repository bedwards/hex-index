import { describe, it, expect } from 'vitest';
import { normalizeTitle, stripTrump } from './title-normalizer.js';

describe('normalizeTitle', () => {
  it('fixes ALL CAPS titles', () => {
    expect(normalizeTitle('WHY WE REMAIN ALIVE IN A DEAD INTERNET'))
      .toBe('Why We Remain Alive In A Dead Internet');
  });

  it('preserves common acronyms in title case conversion', () => {
    expect(normalizeTitle('THE AI REVOLUTION IN THE USA'))
      .toBe('The AI Revolution In The USA');
  });

  it('strips YouTube channel suffixes', () => {
    expect(normalizeTitle('How Caligula Took Power | Kings and Generals'))
      .toBe('How Caligula Took Power');
  });

  it('truncates at first // for newsletter titles', () => {
    expect(normalizeTitle('BREAKING NEWS: THE LATEST STORY TODAY // STORY B // STORY C'))
      .toBe('Breaking News: The Latest Story Today');
  });

  it('collapses excessive punctuation', () => {
    expect(normalizeTitle('DELETE WHATSAPP ALREADY!!!'))
      .toBe('Delete Whatsapp Already!');
  });

  it('strips emoji prefixes', () => {
    expect(normalizeTitle('\u{1F9E0} Community Wisdom: Topic Here'))
      .toBe('Community Wisdom: Topic Here');
  });

  it('caps at 100 chars with word boundary', () => {
    const long = 'A '.repeat(60);
    const result = normalizeTitle(long);
    expect(result.length).toBeLessThanOrEqual(101); // 100 + ellipsis char
  });

  it('leaves good titles unchanged', () => {
    expect(normalizeTitle("Why Net Zero Isn't Working"))
      .toBe("Why Net Zero Isn't Working");
  });

  it('handles pipe with long suffix (keeps it)', () => {
    expect(normalizeTitle('Topic | This Is A Very Long Channel Name That Has Many Words'))
      .toBe('Topic | This Is A Very Long Channel Name That Has Many Words');
  });

  it('does not strip pipe when suffix has more than 5 words', () => {
    expect(normalizeTitle('Title Here | One Two Three Four Five Six'))
      .toBe('Title Here | One Two Three Four Five Six');
  });

  it('handles mixed case titles (not all caps)', () => {
    expect(normalizeTitle('The Great Gatsby and American Dreams'))
      .toBe('The Great Gatsby and American Dreams');
  });

  it('strips trailing periods', () => {
    expect(normalizeTitle('The End of History.')).toBe('The End of History');
  });

  it('strips trailing period with whitespace', () => {
    expect(normalizeTitle('The End of History.  ')).toBe('The End of History');
  });

  it('strips multiple trailing periods', () => {
    expect(normalizeTitle('The End of History..')).toBe('The End of History');
  });

  it('strips parenthetical asides at end', () => {
    expect(normalizeTitle('The Administration Fires FBI Director (Full Interview)'))
      .toBe('The Administration Fires FBI Director');
  });

  it('keeps parenthetical in middle of title', () => {
    expect(normalizeTitle('The (Real) Story Behind AI'))
      .toBe('The (Real) Story Behind AI');
  });

  it('fixes individual ALL CAPS words in mixed-case titles', () => {
    expect(normalizeTitle('How MASSIVELY Powerful AI Will Change Everything'))
      .toBe('How Massively Powerful AI Will Change Everything');
  });

  it('preserves known acronyms in mixed-case titles', () => {
    expect(normalizeTitle('The DOGE Movement and NASA Plans'))
      .toBe('The DOGE Movement and NASA Plans');
  });

  it('does not touch short uppercase words (3 or fewer letters)', () => {
    expect(normalizeTitle('The FBI and CIA Work Together'))
      .toBe('The FBI and CIA Work Together');
  });

  it('handles empty string', () => {
    expect(normalizeTitle('')).toBe('');
  });

  it('handles whitespace-only string', () => {
    expect(normalizeTitle('   ')).toBe('');
  });
});

describe('stripTrump (editorial policy)', () => {
  it("removes leading possessive \"Trump's\"", () => {
    expect(stripTrump("Trump's Tiger-Riding Predicament | Digest: March 2026"))
      .toBe('Tiger-Riding Predicament | Digest: March 2026');
  });

  it('removes bare "Trump" mid-sentence', () => {
    expect(stripTrump('What did Trump know about Epstein?'))
      .toBe('What did know about Epstein?');
  });

  it('removes "Trump\'s" after a colon', () => {
    expect(stripTrump("NEW POLL: Trump's approval stuck at record low"))
      .toBe('NEW POLL: approval stuck at record low');
  });

  it('removes "Donald Trump" full name', () => {
    expect(stripTrump('Donald Trump meets with European leaders'))
      .toBe('meets with European leaders');
  });

  it("removes \"Donald Trump's\" full possessive", () => {
    expect(stripTrump("Donald Trump's cabinet picks under fire"))
      .toBe('cabinet picks under fire');
  });

  it('is case-insensitive but preserves surrounding casing', () => {
    expect(stripTrump('TRUMP ANNOUNCES NEW TARIFFS'))
      .toBe('ANNOUNCES NEW TARIFFS');
  });

  it('handles em-dash attached: "Trump\u2014" ', () => {
    expect(stripTrump('Trump\u2014and his allies\u2014push new policy'))
      .toBe('and his allies\u2014push new policy');
  });

  it('keeps original if stripping would empty the title', () => {
    expect(stripTrump('Trump')).toBe('Trump');
  });

  it("handles curly-apostrophe possessive \"Trump\u2019s\"", () => {
    expect(stripTrump('Trump\u2019s approval rating falls'))
      .toBe('approval rating falls');
  });

  it('does not touch unrelated words like "trumpet"', () => {
    expect(stripTrump('The trumpet player arrives'))
      .toBe('The trumpet player arrives');
  });
});
