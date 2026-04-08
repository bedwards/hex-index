import { describe, it, expect } from 'vitest';
import {
  toSentenceCase,
  KNOWN_ACRONYMS,
  PROPER_NOUNS_LC,
} from './sentence-case.js';

describe('toSentenceCase', () => {
  it('converts ALL CAPS to sentence case', () => {
    expect(toSentenceCase('WHY WE REMAIN ALIVE IN A DEAD INTERNET'))
      .toBe('Why we remain alive in a dead internet');
  });

  it('converts Title Case to sentence case', () => {
    expect(toSentenceCase('Why We Remain Alive In A Dead Internet'))
      .toBe('Why we remain alive in a dead internet');
  });

  it('preserves known acronyms (NCAA, NASA, AI)', () => {
    expect(toSentenceCase('the ncaa and nasa announce ai partnership'))
      .toBe('The NCAA and NASA announce AI partnership');
  });

  it('preserves proper nouns (Kentucky, Russia, China)', () => {
    expect(toSentenceCase('kentucky russia and china meet'))
      .toBe('Kentucky Russia and China meet');
  });

  it("preserves possessive proper nouns (russia's → Russia's)", () => {
    expect(toSentenceCase("russia's winter offensive"))
      .toBe("Russia's winter offensive");
  });

  it('preserves intra-cap brand iPhone', () => {
    expect(toSentenceCase('the new iPhone launches today'))
      .toBe('The new iPhone launches today');
  });

  it("preserves McDonald's as intra-cap proper noun", () => {
    expect(toSentenceCase("McDonald's new menu"))
      .toBe("McDonald's new menu");
  });

  it("preserves possessive intra-cap brands (McDonald's, eBay's)", () => {
    // Regression: intra-cap check must run on lookupCore (after stripping
    // possessive suffix), otherwise McDonald's and eBay's fall through to
    // the default lowercase branch.
    expect(toSentenceCase("the McDonald's menu"))
      .toBe("The McDonald's menu");
    expect(toSentenceCase("the eBay's earnings report"))
      .toBe("The eBay's earnings report");
  });

  it('capitalizes after sentence-ending colon', () => {
    expect(toSentenceCase('breaking: a new era begins'))
      .toBe('Breaking: A new era begins');
  });

  it('capitalizes after period', () => {
    expect(toSentenceCase('one thing. another thing.'))
      .toBe('One thing. Another thing.');
  });

  it('handles empty string', () => {
    expect(toSentenceCase('')).toBe('');
  });

  // ---- Multi-word proper nouns via leading particles (issue #501) ----

  it('capitalizes San Francisco when lowercased in input', () => {
    expect(toSentenceCase('san francisco weather'))
      .toBe('San Francisco weather');
  });

  it('capitalizes Los Angeles when lowercased in input', () => {
    expect(toSentenceCase('los angeles traffic'))
      .toBe('Los Angeles traffic');
  });

  it('capitalizes Sao Paulo when lowercased in input', () => {
    expect(toSentenceCase('sao paulo election'))
      .toBe('Sao Paulo election');
  });

  it('capitalizes New York when lowercased in input', () => {
    expect(toSentenceCase('new york news'))
      .toBe('New York news');
  });

  it('handles all-caps San Francisco Bay', () => {
    expect(toSentenceCase('THE SAN FRANCISCO BAY'))
      .toBe('The San Francisco bay');
  });

  it('does not false-positive on "new" before a common word', () => {
    expect(toSentenceCase('new things happen'))
      .toBe('New things happen');
  });

  it('preserves San Francisco mid-sentence', () => {
    expect(toSentenceCase('the san francisco bay area'))
      .toBe('The San Francisco bay area');
  });

  it('handles Saint Louis as multi-word proper noun', () => {
    expect(toSentenceCase('saint louis rally'))
      .toBe('Saint Louis rally');
  });

  it('handles St Petersburg as multi-word proper noun', () => {
    expect(toSentenceCase('st petersburg summit'))
      .toBe('St Petersburg summit');
  });

  it('preserves already-cased San Francisco', () => {
    expect(toSentenceCase('San Francisco earthquake'))
      .toBe('San Francisco earthquake');
  });

  it('handles New Jersey as multi-word proper noun', () => {
    expect(toSentenceCase('new jersey politics'))
      .toBe('New Jersey politics');
  });

  it('has non-empty acronym and proper-noun sets', () => {
    expect(KNOWN_ACRONYMS.size).toBeGreaterThan(20);
    expect(PROPER_NOUNS_LC.size).toBeGreaterThan(100);
    expect(KNOWN_ACRONYMS.has('NASA')).toBe(true);
    expect(KNOWN_ACRONYMS.has('NCAA')).toBe(true);
    expect(PROPER_NOUNS_LC.has('kentucky')).toBe(true);
    expect(PROPER_NOUNS_LC.has('russia')).toBe(true);
    expect(PROPER_NOUNS_LC.has('china')).toBe(true);
  });
});
