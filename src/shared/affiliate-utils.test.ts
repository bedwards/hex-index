import { describe, expect, it } from 'vitest';
import { buildAmazonUrl, buildBWBUrl } from './affiliate-utils.js';

describe('buildAmazonUrl', () => {
  it('uses /s?k= search endpoint (not /dp/) because Qwen-suggested ISBN-10s often fail /dp/ lookup', () => {
    const url = buildAmazonUrl('0375433627', 'hexindex0d-20');
    expect(url).toContain('/s?k=');
    expect(url).not.toContain('/dp/');
    expect(url).toContain('0375433627');
    expect(url).toContain('tag=hexindex0d-20');
    expect(url).toContain('i=stripbooks');
  });

  it('URL-encodes the tag parameter', () => {
    const url = buildAmazonUrl('1234567890', 'weird tag');
    expect(url).toContain('tag=weird%20tag');
  });
});

describe('buildBWBUrl', () => {
  it('builds Better World Books product URL from ISBN-13', () => {
    const url = buildBWBUrl('9780307275059');
    expect(url).toBe('https://www.betterworldbooks.com/product/detail/9780307275059');
  });
});
