import { describe, expect, it } from 'vitest';
import { cleanTranscript } from './utils.js';

describe('cleanTranscript', () => {
  it('removes >> speaker change markers', () => {
    expect(cleanTranscript('>> So today we are talking about AI.')).toBe(
      'So today we are talking about AI.'
    );
  });

  it('removes multiple >> markers', () => {
    expect(cleanTranscript('>> Hello >> World')).toBe('Hello World');
  });

  it('strips filler words: um, uh, ah, er', () => {
    expect(cleanTranscript('Um, this is important')).toBe('this is important');
    expect(cleanTranscript('So uh the thing is')).toBe('So the thing is');
    expect(cleanTranscript('And ah we moved on')).toBe('And we moved on');
    expect(cleanTranscript('It was, er, complicated')).toBe('It was, complicated');
  });

  it('strips "uh huh"', () => {
    expect(cleanTranscript('Uh huh, that makes sense')).toBe('that makes sense');
  });

  it('collapses stuttered/repeated words', () => {
    expect(cleanTranscript('the the the thing')).toBe('the thing');
    expect(cleanTranscript('I I think so')).toBe('I think so');
    expect(cleanTranscript('we we we need to go')).toBe('we need to go');
  });

  it('removes bracketed annotations', () => {
    expect(cleanTranscript('Hello [Music] world')).toBe('Hello world');
    expect(cleanTranscript('[Laughter] That was funny')).toBe('That was funny');
    expect(cleanTranscript('And then [Applause] thank you')).toBe('And then thank you');
  });

  it('normalizes whitespace', () => {
    expect(cleanTranscript('too   many    spaces')).toBe('too many spaces');
    expect(cleanTranscript('  leading and trailing  ')).toBe('leading and trailing');
  });

  it('cleans double punctuation from removals', () => {
    expect(cleanTranscript('Hello,, world')).toBe('Hello, world');
    expect(cleanTranscript('End.. Start')).toBe('End. Start');
  });

  it('handles combined artifacts in a realistic transcript', () => {
    const input = '>> Um, so the the thing is, uh, we need to [Music] figure this out.';
    const result = cleanTranscript(input);
    expect(result).toBe('so the thing is, we need to figure this out.');
  });

  it('returns empty string for empty input', () => {
    expect(cleanTranscript('')).toBe('');
  });

  it('preserves clean text unchanged', () => {
    const clean = 'This is a perfectly clean sentence with no artifacts.';
    expect(cleanTranscript(clean)).toBe(clean);
  });

  it('preserves HTML tags', () => {
    const input = '<p>Um, this is <strong>important</strong></p>';
    const result = cleanTranscript(input);
    expect(result).toContain('<strong>important</strong>');
  });
});
