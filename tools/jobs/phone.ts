/**
 * Normalize a phone number to E.164 format (+1XXXXXXXXXX for US numbers).
 * Accepts strings, numbers, null, or undefined. Returns null if invalid.
 */
export function normalizePhone(raw: unknown): string | null {
  if (raw == null) {
    return null;
  }
  const digits = String(raw as string | number).replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return null;
}
