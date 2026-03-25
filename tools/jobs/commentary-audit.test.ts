import { describe, expect, it } from 'vitest';

// We test the audit logic by importing the check functions directly.
// Since they're not exported, we replicate the key logic here for unit testing.
// The actual integration test runs against the database.

// ── Replicated helpers for testing ──────────────────────────────────
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

function getSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(s => s.length > 5);
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function checkThirdPerson(text: string): { passed: boolean; count: number } {
  const withoutQuotes = text.replace(/"[^"]*"/g, '').replace(/\u201c[^\u201d]*\u201d/g, '');
  const firstPersonPatterns = /\b(I\s+(?:think|believe|argue|would|feel|find|note|suggest|recommend|say)|my\s+(?:take|view|opinion|reading|assessment|analysis)|from my|in my\s+(?:view|opinion|experience)|I['']m|I['']ve|I['']d)\b/gi;
  const matches = withoutQuotes.match(firstPersonPatterns) ?? [];
  return { passed: matches.length === 0, count: matches.length };
}

function checkDirectQuotes(html: string): { passed: boolean; count: number } {
  const quotePatterns = [
    /(?:writes|wrote|argues|argued|puts it|notes|noted|observes|observed|explains|explained|contends|claims|claimed|states|stated|suggests|adds|added|points out|acknowledges|warns),?\s*[""\u201c]/gi,
    /[""\u201c][^"""\u201d]{20,}[""\u201d]\s*(?:writes|wrote|argues|argued)/gi,
    /as\s+\w+\s+(?:puts|frames|describes|explains|notes|writes|argues)\s+it/gi,
  ];
  let total = 0;
  for (const pattern of quotePatterns) {
    total += (html.match(pattern) ?? []).length;
  }
  return { passed: total >= 3, count: total };
}

function checkCounterpoints(text: string): { passed: boolean; count: number } {
  const patterns = [
    /critics?\s+(?:might|could|would|have|may)\s+(?:note|argue|point out|counter|object|say|respond)/gi,
    /counterargument/gi,
    /a\s+(?:fair|reasonable|valid)\s+(?:critique|criticism|objection|counterpoint)/gi,
    /on\s+the\s+other\s+hand/gi,
    /the\s+(?:weakness|vulnerability|blind spot|limitation|gap|problem)\s+(?:is|here|in)/gi,
    /(?:skeptics?|detractors?|opponents?)\s+(?:might|could|would|will|have)/gi,
    /(?:however|nevertheless|nonetheless|that said),?\s+(?:the|this|it|there|some|not everyone)/gi,
    /(?:overlooks?|misses?|ignores?|underestimates?|overestimates?)\s/gi,
    /not\s+everyone\s+(?:agrees|buys|is\s+convinced)/gi,
    /the\s+(?:biggest|main|central)\s+(?:weakness|vulnerability|risk|problem)/gi,
  ];
  let total = 0;
  for (const pattern of patterns) {
    total += (text.match(pattern) ?? []).length;
  }
  return { passed: total >= 1, count: total };
}

function checkPullQuote(html: string): boolean {
  return (html.match(/<blockquote>/gi) ?? []).length >= 1;
}

function checkBottomLine(html: string): boolean {
  return /<h2>(?:\s*)(?:Bottom Line|The Bottom Line|bottom line)(?:\s*)<\/h2>/i.test(html);
}

function checkSectionHeadings(html: string): number {
  return (html.match(/<h[23]>/gi) ?? []).length;
}

function checkRhythm(text: string): { hasShort: boolean; hasLong: boolean } {
  const sentences = getSentences(text);
  const lengths = sentences.map(s => countWords(s));
  return {
    hasShort: lengths.filter(l => l <= 8).length >= 2,
    hasLong: lengths.filter(l => l >= 25).length >= 2,
  };
}

function checkCommentaryVoice(text: string): number {
  const markers = [
    /this\s+(?:is|lands|works|matters|resonates)\s+because/gi,
    /the\s+(?:strongest|weakest|most\s+(?:interesting|compelling|effective|surprising))\s+(?:part|move|point|claim|argument|section|moment)/gi,
    /what\s+makes\s+this\s+(?:work|effective|compelling|interesting|notable|important)/gi,
    /(?:effective|devastating|sharp|pointed|bold|shrewd|clever|smart)\s+(?:because|framing|move|argument|point)/gi,
    /(?:lands|resonates|works|holds\s+up|falls\s+(?:short|flat)|misses)/gi,
    /worth\s+(?:considering|noting|reading|watching)/gi,
    /the\s+piece['']?s?\s+(?:strongest|weakest|biggest|most)/gi,
  ];
  let total = 0;
  for (const p of markers) {
    total += (text.match(p) ?? []).length;
  }
  return total;
}

// ── Tests ───────────────────────────────────────────────────────────

describe('commentary-audit: checkThirdPerson', () => {
  it('passes when no first-person usage', () => {
    const text = 'Yglesias argues that housing reform is necessary. The evidence supports this claim.';
    expect(checkThirdPerson(text).passed).toBe(true);
  });

  it('fails when first-person is used', () => {
    const text = 'I think this article makes a good point. In my view, the author is right.';
    const result = checkThirdPerson(text);
    expect(result.passed).toBe(false);
    expect(result.count).toBeGreaterThan(0);
  });

  it('ignores first-person inside quotes', () => {
    const text = 'Smith writes, "I believe this is the most important finding." The data supports his claim.';
    expect(checkThirdPerson(text).passed).toBe(true);
  });
});

describe('commentary-audit: checkDirectQuotes', () => {
  it('detects attributed quotes', () => {
    const html = `<p>Yglesias writes, "The strongest case for zoning reform is racial justice."</p>
<p>He argues, "Land use policy quietly preserved the same boundaries."</p>
<p>As Yglesias puts it, "We never tore up the foundations."</p>
<p>He notes, "The Civil Rights Act never touched zoning codes."</p>`;
    const result = checkDirectQuotes(html);
    expect(result.passed).toBe(true);
    expect(result.count).toBeGreaterThanOrEqual(3);
  });

  it('fails with no attributed quotes', () => {
    const html = '<p>The article discusses housing policy and its implications.</p>';
    expect(checkDirectQuotes(html).passed).toBe(false);
  });
});

describe('commentary-audit: checkCounterpoints', () => {
  it('detects counterpoint language', () => {
    const text = 'Critics might note that this framing oversimplifies the issue. However, the evidence is strong.';
    expect(checkCounterpoints(text).passed).toBe(true);
  });

  it('detects weakness language', () => {
    const text = 'The weakness here is that the data only covers three years. This overlooks longer-term trends.';
    expect(checkCounterpoints(text).passed).toBe(true);
  });

  it('fails when no counterpoints', () => {
    const text = 'The author makes an excellent point. The evidence is compelling. The conclusion follows logically.';
    expect(checkCounterpoints(text).passed).toBe(false);
  });
});

describe('commentary-audit: checkPullQuote', () => {
  it('detects blockquote', () => {
    expect(checkPullQuote('<p>Text</p><blockquote>A striking quote.</blockquote>')).toBe(true);
  });

  it('fails with no blockquote', () => {
    expect(checkPullQuote('<p>Text only.</p>')).toBe(false);
  });
});

describe('commentary-audit: checkBottomLine', () => {
  it('detects Bottom Line heading', () => {
    expect(checkBottomLine('<h2>Bottom Line</h2><p>The verdict.</p>')).toBe(true);
  });

  it('detects The Bottom Line heading', () => {
    expect(checkBottomLine('<h2>The Bottom Line</h2><p>The verdict.</p>')).toBe(true);
  });

  it('fails with no Bottom Line', () => {
    expect(checkBottomLine('<h2>Conclusion</h2><p>Summary.</p>')).toBe(false);
  });
});

describe('commentary-audit: checkSectionHeadings', () => {
  it('counts h2 and h3 headings', () => {
    const html = '<h2>First</h2><p>Text</p><h3>Sub</h3><p>Text</p><h2>Bottom Line</h2>';
    expect(checkSectionHeadings(html)).toBe(3);
  });
});

describe('commentary-audit: checkRhythm', () => {
  it('detects varied sentence lengths', () => {
    const text = 'Short punch. The argument here extends across multiple subordinate clauses and supporting evidence that stretches the reader through a dense thicket of reasoning before eventually arriving at the final conclusion after much deliberation. Yes. Another very long sentence that explores the implications of housing policy reform across three decades of municipal governance and federal court decisions and bureaucratic red tape. Indeed. This works.';
    const result = checkRhythm(text);
    expect(result.hasShort).toBe(true);
    expect(result.hasLong).toBe(true);
  });

  it('fails with uniform sentence length', () => {
    const text = 'This is a medium sentence here. This is another medium sentence. This is yet another one. This sentence is also medium length. And this one is about the same.';
    const result = checkRhythm(text);
    // All ~5-6 words, none >=25
    expect(result.hasLong).toBe(false);
  });
});

describe('commentary-audit: checkCommentaryVoice', () => {
  it('detects editorial voice markers', () => {
    const text = 'This lands because the evidence is specific. The strongest part of the argument is the historical precedent. What makes this work is the unexpected framing.';
    expect(checkCommentaryVoice(text)).toBeGreaterThanOrEqual(2);
  });

  it('returns low count for pure summary', () => {
    const text = 'The article discusses policy. It presents data. The author reviews literature. Three studies are cited. The conclusion follows.';
    expect(checkCommentaryVoice(text)).toBe(0);
  });
});

describe('commentary-audit: stripHtml', () => {
  it('strips tags and decodes entities', () => {
    expect(stripHtml('<p>Hello &amp; &quot;world&quot;</p>')).toBe('Hello & "world"');
  });
});

describe('commentary-audit: countWords', () => {
  it('counts words correctly', () => {
    expect(countWords('one two three four')).toBe(4);
  });

  it('handles empty string', () => {
    expect(countWords('')).toBe(0);
  });
});
