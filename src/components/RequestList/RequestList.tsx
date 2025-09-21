'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export type RawRequest = {
  method?: unknown;
  url?: unknown;
  timestamp?: string | number;
  latency?: unknown;
  status?: unknown;
  requestSize?: unknown;
  responseSize?: unknown;
  errorType?: unknown;
  headers?: unknown;
  body?: unknown;
};

type Props = {
  rawRequests: unknown;
};

export function RequestList({ rawRequests }: Props) {
  const t = useTranslations('History');

  const requests = useMemo(() => {
    if (!Array.isArray(rawRequests)) return [];

    return rawRequests
      .map((req): RequestHistory | null => {
        if (!isRecord(req)) return null;

        const timestamp =
          typeof req.timestamp === 'string'
            ? new Date(req.timestamp).getTime()
            : Number(req.timestamp);

        const isValidNumber = (n: unknown): n is number =>
          typeof n === 'number' && !isNaN(n);

        return {
          method: typeof req.method === 'string' ? req.method : 'GET',
          url: typeof req.url === 'string' ? req.url : '',
          timestamp: isValidNumber(timestamp) ? timestamp : Date.now(),
          latency: isValidNumber(req.latency) ? req.latency : 0,
          status: isValidNumber(req.status) ? req.status : 0,
          requestSize: isValidNumber(req.requestSize) ? req.requestSize : 0,
          responseSize: isValidNumber(req.responseSize) ? req.responseSize : 0,
          errorType:
            req.errorType === null || typeof req.errorType === 'string'
              ? req.errorType
              : null,
          headers:
            typeof req.headers === 'object' && req.headers !== null
              ? (req.headers as Record<string, string>)
              : undefined,
          body: typeof req.body === 'string' ? req.body : undefined,
        };
      })
      .filter((req): req is RequestHistory => req !== null)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [rawRequests]);

  function isRecord(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }

  if (requests.length === 0) {
    return (
      <div className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap max-h-[50vh] text-violet-950">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">{t('noRequests')}</h1>
          <p className="mb-6">{t('tryRestClient')}</p>
          <Link
            href="/rest"
            className="inline-block px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded transition-colors"
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
        <ul className="space-y-2 p-4 rounded overflow-auto text-sm whitespace-pre-wrap max-h-[70vh] border border-violet-700">
          {requests.map((req, i) => {
            const isFailed = req.status >= 400 || req.errorType;

            const query = new URLSearchParams();
            query.set('method', req.method);
            query.set('url', btoa(encodeURIComponent(req.url)));
            if (req.headers && Object.keys(req.headers).length > 0) {
              query.set('headers', btoa(JSON.stringify(req.headers)));
            }
            if (req.body) {
              query.set('body', btoa(encodeURIComponent(req.body)));
            }

            const href = `/rest?${query.toString()}`;

            const date = new Date(req.timestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <li key={i}>
                <Link
                  href={href}
                  className="block p-3 bg-violet-100 rounded hover:bg-violet-200 transition-colors cursor-pointer"
                >
                  <div className="font-mono text-sm mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs mr-2 font-semibold ${
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
                    <span className="text-gray-800 truncate max-w-xs inline-block align-middle">
                      {req.url}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-700">
                    <span>
                      <strong>{t('status')}:</strong>{' '}
                      <span
                        className={
                          isFailed
                            ? 'text-red-600'
                            : req.status < 300
                              ? 'text-green-600'
                              : 'text-yellow-600'
                        }
                      >
                        {req.status}
                      </span>
                    </span>
                    <span>
                      <strong>{t('latency')}:</strong> {req.latency} ms
                    </span>

                    <span>
                      <strong>{t('requestSize')}:</strong>{' '}
                      {(req.requestSize / 1024).toFixed(1)} KB
                    </span>
                    <span>
                      <strong>{t('responseSize')}:</strong>{' '}
                      {(req.responseSize / 1024).toFixed(1)} KB
                    </span>

                    <span>
                      <strong>{t('date')}:</strong> {formattedDate}
                    </span>
                    <span>
                      <strong>{t('time')}:</strong> {formattedTime}
                    </span>
                  </div>

                  {req.errorType && (
                    <div className="text-xs text-red-600 mt-1 font-mono italic">
                      {t('error')}: {req.errorType}
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

export type RequestHistory = {
  method: string;
  url: string;
  timestamp: number;
  latency: number;
  status: number;
  requestSize: number;
  responseSize: number;
  errorType: string | null;
  headers?: Record<string, string>;
  body?: string;
};
