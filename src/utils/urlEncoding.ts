export function encodeBase64(value: string): string {
  if (!value) return '';
  return Buffer.from(value, 'utf-8').toString('base64');
}

export function decodeBase64(value: string | undefined): string {
  if (!value) return '';
  try {
    return Buffer.from(value, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}

export function buildQuery(headers: Record<string, string>): string {
  const params = new URLSearchParams();
  Object.entries(headers).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params.toString();
}

export function parseQuery(query: string): Record<string, string> {
  const params = new URLSearchParams(query);
  const headers: Record<string, string> = {};
  params.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}
