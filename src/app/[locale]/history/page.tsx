'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface RequestHistory {
  method: string;
  url: string;
  timestamp: number;
}

export default function HistoryPage() {
  const t = useTranslations('History');
  const router = useRouter();

  const [requests] = useState<RequestHistory[]>(() => {
    const saved = localStorage.getItem('requestHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('requestHistory', JSON.stringify(requests));
  }, [requests]);

  const handleRequestClick = (method: string, url: string) => {
    const encodedUrl = btoa(url);
    router.push(`/client/${method}/${encodedUrl}`);
  };

  if (requests.length === 0) {
    return (
      <div className="min-h-screen text-violet-950 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl text-violet-950 font-bold mb-4">
            {t('noRequests')}
          </h1>
          <p className="mb-6">Its empty here. Try:</p>
          <button
            onClick={() => router.push('/rest')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
          >
            {t('restClient')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded  border-violet-700 text-violet-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl text-violet-950 font-bold mb-6">
          {t('history')}
        </h1>
        <ul className="space-y-2">
          {requests.map((req, i) => (
            <li
              key={i}
              onClick={() => handleRequestClick(req.method, req.url)}
              className="p-3 bg-violet-100 rounded cursor-pointer hover:bg-violet-500 transition-colors"
            >
              <span className="font-mono">
                {req.method} {req.url}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
