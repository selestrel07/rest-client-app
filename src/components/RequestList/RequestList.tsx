'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  requests: {
    method: string;
    url: string;
    timestamp: number;
  }[];
};

export default function RequestList({ requests }: Props) {
  const t = useTranslations('History');

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">{t('noRequests')}</h1>
          <p className="mb-6">{t('tryRestClient')}</p>
          <Link
            href="/rest"
            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
          >
            {t('restClient')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('history')}</h1>
        <ul className="space-y-2">
          {requests.map((req, i) => {
            const encodedUrl = btoa(req.url);
            return (
              <li key={i}>
                <Link
                  href={`/client/${req.method}/${encodedUrl}`}
                  className="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-sm">
                    {req.method} {req.url}
                  </span>
                  <br />
                  <span className="text-xs text-gray-400">
                    {new Date(req.timestamp).toLocaleString()}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
