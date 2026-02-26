/**
 * Shared Ollama client for Wikipedia enrichment
 * Replaces Claude CLI invocations with local model calls
 */

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral-large:123b';

interface GenerateOptions {
  system?: string;
  temperature?: number;
  numPredict?: number;
  timeout?: number;
}

export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const {
    system,
    temperature = 0.7,
    numPredict = 8000,
    timeout = 600_000,
  } = options;

  const messages: Array<{ role: string; content: string }> = [];
  if (system) {
    messages.push({ role: 'system', content: system });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      options: {
        temperature,
        num_predict: numPredict,
      },
      stream: false,
    }),
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) {
    throw new Error(`Ollama HTTP ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as {
    message?: { content?: string };
  };
  return data.message?.content?.trim() ?? '';
}
