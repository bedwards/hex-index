import { describe, expect, it } from 'vitest';
import { normalizePhone } from './phone.js';

describe('normalizePhone', () => {
  it('coerces a numeric phone (as returned by Apps Script when sheet cell is numeric) to E.164', () => {
    // Bug #346: Apps Script returns phone as JS number when sheet cell is numeric-only.
    expect(normalizePhone(17372990186)).toBe('+17372990186');
    expect(normalizePhone(7372990186)).toBe('+17372990186');
  });

  it('handles string phones with formatting', () => {
    expect(normalizePhone('(737) 299-0186')).toBe('+17372990186');
    expect(normalizePhone('+1 737 299 0186')).toBe('+17372990186');
    expect(normalizePhone('737-299-0186')).toBe('+17372990186');
  });

  it('returns null for null/undefined/invalid', () => {
    expect(normalizePhone(null)).toBeNull();
    expect(normalizePhone(undefined)).toBeNull();
    expect(normalizePhone('')).toBeNull();
    expect(normalizePhone('abc')).toBeNull();
    expect(normalizePhone(12345)).toBeNull();
  });
});
