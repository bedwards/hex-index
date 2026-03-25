/**
 * Shared Ollama client for Wikipedia enrichment
 *
 * Handles the realities of running a 122B model locally:
 *   - Ollama serializes requests, so another process may hold the model
 *   - Large generations can take minutes — generous timeouts
 *   - Exponential backoff with jitter on connection/timeout failures
 *   - Waits for a busy model to become available instead of giving up
 */

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3.5:122b-a10b';
const DEFAULT_TIMEOUT = parseInt(process.env.HEX_TASK_TIMEOUT_MS || '900000', 10);

interface GenerateOptions {
  system?: string;
  temperature?: number;
  numPredict?: number;
  timeout?: number;
  retries?: number;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function jitter(baseMs: number): number {
  return baseMs + Math.random() * baseMs * 0.3;
}

async function waitForOllama(maxWaitMs: number = 120_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(`${OLLAMA_URL}/api/tags`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {return;}
    } catch {
      // not ready yet
    }
    await sleep(2000);
  }
  throw new Error(`Ollama not reachable at ${OLLAMA_URL} after ${maxWaitMs / 1000}s`);
}

export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const {
    system,
    temperature = 0.7,
    numPredict = 8000,
    timeout = DEFAULT_TIMEOUT,
    retries = 4,
  } = options;

  const messages: Array<{ role: string; content: string }> = [];
  if (system) {
    messages.push({ role: 'system', content: system });
  }
  messages.push({ role: 'user', content: prompt });

  const body = JSON.stringify({
    model: OLLAMA_MODEL,
    messages,
    options: {
      temperature,
      num_predict: numPredict,
      top_p: 0.95,
    },
    keep_alive: -1,
    stream: false,
  });

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      // Exponential backoff: 30s, 60s, 120s, 240s (with jitter)
      const delay = jitter(30_000 * Math.pow(2, attempt - 1));
      console.info(`    Retry ${attempt}/${retries} after ${Math.round(delay / 1000)}s...`);
      await sleep(delay);

      // Before retrying, make sure Ollama is still reachable
      try {
        await waitForOllama(30_000);
      } catch {
        console.info('    Ollama unreachable, will try the request anyway...');
      }
    }

    try {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(timeout),
      });

      if (!response.ok) {
        const text = await response.text();
        // 503 = model busy/loading, retry
        if (response.status === 503) {
          lastError = new Error(`Ollama busy (503): ${text}`);
          continue;
        }
        throw new Error(`Ollama HTTP ${response.status}: ${text}`);
      }

      const data = (await response.json()) as {
        message?: { content?: string };
      };
      let content = data.message?.content?.trim() ?? '';
      if (!content) {
        lastError = new Error('Ollama returned empty response');
        continue;
      }
      // Strip <think>...</think> blocks from reasoning models
      content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      return content;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry client errors (4xx except 503)
      if (lastError.message.startsWith('Ollama HTTP 4')) {
        throw lastError;
      }

      const isTimeout = lastError.name === 'TimeoutError' || lastError.message.includes('timed out');
      const isConnection = lastError.message.includes('fetch failed') || lastError.message.includes('ECONNREFUSED');
      const isBusy = lastError.message.includes('503');
      if (!isTimeout && !isConnection && !isBusy) {
        throw lastError;
      }
    }
  }

  throw new Error(`Ollama failed after ${retries + 1} attempts: ${lastError?.message}`);
}
