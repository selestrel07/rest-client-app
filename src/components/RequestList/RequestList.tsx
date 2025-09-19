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
      <div className="min-h-screen text-violet-950">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-violet-950">
            {t('noRequests')}
          </h1>
          <p className="mb-6 text-violet-950">{t('tryRestClient')}</p>
          <Link
            href="/rest"
            className="inline-block px-6 py-2 bg-violet-500 hover:bg-violet-600 rounded transition-colors text-violet-950"
          >
            {t('restClient')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-violet-950">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('history')}</h1>
        <ul className="space-y-2">
          {requests.map((req, i) => {
            const encodedUrl = btoa(req.url);
            return (
              <li key={i}>
                <Link
                  href={`/client/${req.method}/${encodedUrl}`}
                  className="block p-3 bg-violet-100 rounded hover:bg-violet-400 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-sm">
                    {req.method} {req.url}
                  </span>
                  <br />
                  <span className="text-xs text-violet-150">
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
