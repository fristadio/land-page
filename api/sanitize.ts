function removeControlChars(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, '');
}

export function sanitizeString(value: unknown, maxLength: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  const str = String(value);
  const trimmed = removeControlChars(str).trim();
  return trimmed.slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}


