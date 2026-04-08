import { describe, it, expect } from 'vitest';
import { stripPublicationFromTitle } from './strip-publication.js';

describe('stripPublicationFromTitle', () => {
  it('strips "The X: " prefix matching pub "The X"', () => {
    expect(stripPublicationFromTitle('The Cyber Why: What we read this week', 'The Cyber Why'))
      .toBe('What we read this week');
  });

  it('strips prefix without the leading "The " on the title', () => {
    expect(stripPublicationFromTitle('Cyber Why: What we read this week', 'The Cyber Why'))
      .toBe('What we read this week');
  });

  it('strips prefix when pub lacks "The" but title has it', () => {
    expect(stripPublicationFromTitle('The Pluralistic: Switzerland Goldilocks fiber', 'Pluralistic'))
      .toBe('Switzerland Goldilocks fiber');
  });

  it('strips suffix with em dash separator', () => {
    expect(stripPublicationFromTitle('Some title \u2014 ChinaTalk', 'ChinaTalk'))
      .toBe('Some title');
  });

  it('strips suffix with en dash separator', () => {
    expect(stripPublicationFromTitle('Some title \u2013 ChinaTalk', 'ChinaTalk'))
      .toBe('Some title');
  });

  it('strips suffix with pipe separator', () => {
    expect(stripPublicationFromTitle('How Caligula Took Power | Kings and Generals', 'Kings and Generals'))
      .toBe('How Caligula Took Power');
  });

  it('strips suffix with hyphen separator', () => {
    expect(stripPublicationFromTitle('Some title - ChinaTalk', 'ChinaTalk'))
      .toBe('Some title');
  });

  it('strips colon-separated prefix', () => {
    expect(stripPublicationFromTitle('ChinaTalk: Iran', 'ChinaTalk'))
      .toBe('Iran');
  });

  it('is case-insensitive in matching', () => {
    expect(stripPublicationFromTitle('CHINATALK: Iran policy', 'ChinaTalk'))
      .toBe('Iran policy');
  });

  it('leaves unrelated titles unchanged', () => {
    expect(stripPublicationFromTitle('Random title about cyberattacks', 'The Cyber Why'))
      .toBe('Random title about cyberattacks');
  });

  it('leaves title equal to publication name unchanged', () => {
    expect(stripPublicationFromTitle('ChinaTalk', 'ChinaTalk'))
      .toBe('ChinaTalk');
  });

  it('leaves title equal to publication name (case-insensitive) unchanged', () => {
    expect(stripPublicationFromTitle('chinatalk', 'ChinaTalk'))
      .toBe('chinatalk');
  });

  it('collapses double whitespace created by stripping', () => {
    expect(stripPublicationFromTitle('ChinaTalk:  Iran  policy', 'ChinaTalk'))
      .toBe('Iran policy');
  });

  it('handles empty title', () => {
    expect(stripPublicationFromTitle('', 'ChinaTalk')).toBe('');
  });

  it('handles empty publication name', () => {
    expect(stripPublicationFromTitle('Some title', '')).toBe('Some title');
  });

  it('does not strip mid-title mentions of publication name', () => {
    expect(stripPublicationFromTitle('What ChinaTalk got wrong about Iran', 'ChinaTalk'))
      .toBe('What ChinaTalk got wrong about Iran');
  });

  it('strips "Sinification: " prefix', () => {
    expect(stripPublicationFromTitle('Sinification: How export controls bite', 'Sinification'))
      .toBe('How export controls bite');
  });
});
