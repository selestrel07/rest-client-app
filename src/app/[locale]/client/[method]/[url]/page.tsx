'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function RequestPage() {
  const params = useParams();

  const method = params.method as string;
  const encodedUrl = params.url as string;

  const [content, setContent] = useState<string>('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url: string;
    try {
      const decoded = atob(encodedUrl);
      url = decodeURIComponent(decoded);
    } catch (e) {
      url = `[Invalid URL] ${e}`;
    }

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
      <h1 className="text-2xl font-bold mb-6">Request Details</h1>
      <div className="bg-violet-100 p-4 rounded mb-4">
        <p>
          <strong>Method:</strong> <code>{method}</code>
        </p>
        <p>
          <strong>URL:</strong>{' '}
          <a
            href={decodeURIComponent(atob(encodedUrl))}
            target="_blank"
            className="text-blue-500 underline"
            rel="noreferrer"
          >
            {decodeURIComponent(atob(encodedUrl))}
          </a>
        </p>
      </div>

      {loading ? (
        <p>Loading content...</p>
      ) : (
        <div className="border border-violet-750 rounded p-4 ">
          <pre className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap scroll-thin max-h-[50vh]">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
