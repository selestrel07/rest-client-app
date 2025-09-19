'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  requests: {
    method: string;
    url: string;
    timestamp: number;
    latency: number;
    status: number;
    requestSize: number;
    responseSize: number;
    errorType?: string | null;
  }[];
};

export default function RequestList({ requests }: Props) {
  const t = useTranslations('History');

  if (requests.length === 0) {
    return (
      <div className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap scroll-thin max-h-[50vh] text-violet-950">
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
    <div className="text-violet-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('history')}</h1>
        <ul className="space-y-2 p-4 rounded overflow-auto text-sm whitespace-pre-wrap scroll-thin max-h-[70vh] border border-violet-700">
          {requests.map((req, i) => {
            const encodedUrl = btoa(req.url);
            const isFailed = req.status >= 400 || req.errorType;

            return (
              <li key={i}>
                <Link
                  href={`/client/${req.method}/${encodedUrl}`}
                  className="block p-3 bg-violet-100 rounded hover:bg-violet-200 transition-colors cursor-pointer"
                >
                  <div className="font-mono text-sm mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs mr-2 ${
                        req.method === 'GET'
                          ? 'bg-green-200 text-green-800'
                          : req.method === 'POST'
                            ? 'bg-blue-200 text-blue-800'
                            : req.method === 'PUT'
                              ? 'bg-yellow-200 text-yellow-800'
                              : req.method === 'DELETE'
                                ? 'bg-red-200 text-red-800'
                                : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {req.method}
                    </span>
                    {req.url}
                  </div>

                  <div className="flex flex-wrap gap-x-4 text-xs mt-1">
                    <span>
                      <strong>Status:</strong>{' '}
                      <span
                        className={
                          isFailed
                            ? 'text-red-600'
                            : req.status < 300
                              ? 'text-green-600'
                              : 'text-yellow-600'
                        }
                      >
                        {req.status || '?'}
                      </span>
                    </span>
                    <span>
                      <strong>Time:</strong> {req.latency?.toFixed(0) || '?'} ms
                    </span>
                    <span>
                      <strong>Req Size:</strong> {formatBytes(req.requestSize)}
                    </span>
                    <span>
                      <strong>Res Size:</strong> {formatBytes(req.responseSize)}
                    </span>
                    <span>
                      <strong>Date:</strong>{' '}
                      {new Date(req.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {req.errorType && (
                    <div className="text-xs text-red-600 mt-1 font-mono">
                      Error: {req.errorType}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
