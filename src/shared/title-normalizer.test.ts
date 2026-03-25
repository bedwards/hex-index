import { describe, it, expect } from 'vitest';
import { normalizeTitle } from './title-normalizer.js';

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

  it('handles empty string', () => {
    expect(normalizeTitle('')).toBe('');
  });

  it('handles whitespace-only string', () => {
    expect(normalizeTitle('   ')).toBe('');
  });
});
