'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

function safeBase64Decode(base64: string): string | null {
  try {
    let b64 = base64.replace(/ /g, '+').replace(/-/g, '+').replace(/_/g, '/');

    const padding = b64.length % 4;
    if (padding !== 0) {
      b64 += '='.repeat(4 - padding);
    }

    return atob(b64);
  } catch (e) {
    console.error('Base64 decode failed:', e, { base64 });
    return null;
  }
}
export default function RequestPage() {
  const t = useTranslations('History');

  const params = useParams();
  const method = params.method as string;
  const encodedUrl = params.url as string;

  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!encodedUrl) {
      setContent('Error: No URL provided');
      setLoading(false);
      return;
    }

    const rawEncoded = decodeURIComponent(encodedUrl);
    const url = safeBase64Decode(rawEncoded);

    if (!url) {
      setContent('Error: Invalid or corrupted URL encoding');
      setLoading(false);
      return;
    }

    setDecodedUrl(url);

    fetch(url)
      .then(async (res) => {
        const text = await res.text();
        setContent(text);
      })
      .catch((err) => {
        setContent(`Error loading page: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [encodedUrl]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('details')}</h1>
      <div className="bg-violet-100 p-4 rounded mb-4">
        <p>
          <strong>{t('method')}</strong> <code>{method}</code>
        </p>
        <p>
          <strong>{t('url')}</strong>{' '}
          {decodedUrl ? (
            <a
              href={decodedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline hover:text-blue-700 break-all"
            >
              {decodedUrl}
            </a>
          ) : (
            <span className="text-red-500">{t('errorUrl')}</span>
          )}
        </p>
      </div>

      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <div className="border border-violet-750 rounded p-4">
          <pre className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap scroll-thin max-h-[50vh]">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
