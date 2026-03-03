/**
 * Shared Ollama client for Wikipedia enrichment
 * Replaces Claude CLI invocations with local model calls
 *
 * Retries on connection failures since Ollama serializes requests
 * and the moltbook autonomous loop may be using the model.
 */

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral-large:123b';
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

export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const {
    system,
    temperature = 0.7,
    numPredict = 8000,
    timeout = DEFAULT_TIMEOUT,
    retries = 2,
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
    },
    stream: false,
  });

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const delay = attempt * 30_000; // 30s, 60s
      console.info(`    Retry ${attempt}/${retries} after ${delay / 1000}s...`);
      await sleep(delay);
    }

    try {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(timeout),
      });

      if (!response.ok) {
        throw new Error(`Ollama HTTP ${response.status}: ${await response.text()}`);
      }

      const data = (await response.json()) as {
        message?: { content?: string };
      };
      return data.message?.content?.trim() ?? '';
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry HTTP errors (4xx, 5xx) — only connection/timeout failures
      if (lastError.message.startsWith('Ollama HTTP')) {
        throw lastError;
      }

      const isTimeout = lastError.name === 'TimeoutError' || lastError.message.includes('timed out');
      const isConnection = lastError.message.includes('fetch failed') || lastError.message.includes('ECONNREFUSED');
      if (!isTimeout && !isConnection) {
        throw lastError;
      }
    }
  }

  throw new Error(`Ollama failed after ${retries + 1} attempts: ${lastError?.message}`);
}
