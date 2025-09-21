'use client';

import { useSearchParams } from 'next/navigation';
import { RestClient } from '@components';

function decode(str: string | null): string {
  if (!str) return '';
  try {
    return typeof window === 'undefined'
      ? Buffer.from(str, 'base64').toString('utf-8')
      : decodeURIComponent(atob(str));
  } catch (e) {
    console.error('Failed to decode:', str, e);
    return '';
  }
}

function parseJSON(str: string | null): Record<string, string> | undefined {
  const decoded = decode(str);
  if (!decoded) return undefined;
  try {
    const parsed = JSON.parse(decoded);
    return typeof parsed === 'object' && parsed !== null ? parsed : undefined;
  } catch (e) {
    console.error('Failed to parse JSON:', decoded, e);
    return undefined;
  }
}

export default function RestPage() {
  const searchParams = useSearchParams();

  const method = searchParams.get('method');
  const rawUrl = searchParams.get('url');
  const rawHeaders = searchParams.get('headers');
  const rawBody = searchParams.get('body');

  const initialRequest = {
    method: method ?? undefined,
    url: decode(rawUrl),
    headers: parseJSON(rawHeaders),
    body: decode(rawBody),
  };

  return <RestClient initialRequest={initialRequest} />;
}
