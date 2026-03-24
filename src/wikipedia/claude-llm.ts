/**
 * Claude API client for Wikipedia enrichment
 *
 * Drop-in alternative to ollama.ts for topic discovery.
 * Uses the Anthropic API so we can burn down the backlog
 * without contending for the local GPU.
 *
 * Accepts the same GenerateOptions shape as ollama.ts
 * (maps numPredict -> maxTokens).
 */

import Anthropic from '@anthropic-ai/sdk';

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';
const client = new Anthropic();

interface GenerateOptions {
  system?: string;
  temperature?: number;
  numPredict?: number;
  timeout?: number;
  retries?: number;
}

export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const {
    system,
    temperature = 0.3,
    numPredict = 2000,
    retries = 2,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const delay = 5_000 * Math.pow(2, attempt - 1);
      console.info(`    Claude retry ${attempt}/${retries} after ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    try {
      const response = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: numPredict,
        temperature,
        ...(system ? { system } : {}),
        messages: [{ role: 'user' as const, content: prompt }],
      });

      const textBlock = response.content.find(
        (b): b is Anthropic.TextBlock => b.type === 'text'
      );
      const text = textBlock?.text?.trim() ?? '';

      if (!text) {
        lastError = new Error('Claude returned empty response');
        continue;
      }

      return text;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Retry on rate limits and server errors
      const isRetryable =
        lastError.message.includes('rate_limit') ||
        lastError.message.includes('overloaded') ||
        lastError.message.includes('529') ||
        lastError.message.includes('500');

      if (!isRetryable) {
        throw lastError;
      }
    }
  }

  throw new Error(`Claude failed after ${retries + 1} attempts: ${lastError?.message}`);
}
