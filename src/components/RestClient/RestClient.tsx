'use client';
import { FC, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { convertUrlToRequest } from '@utils/requestUrlConverter';
import { MethodSelector } from '@components';
import { EndpointInput } from '@components';
import { HeadersEditor } from '@components';
import { BodyEditor } from '@components';
import { ResponseViewer } from '@components';

type APIResponse = { error: string } | { status: number; data: unknown } | null;

export const RestClient: FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const initialRequest = convertUrlToRequest(params, searchParams);

  const [method, setMethod] = useState<string>(initialRequest.method || 'GET');
  const [endpoint, setEndpoint] = useState<string>(initialRequest.url || '');

  const [headers, setHeaders] = useState<{ key: string; value: string }[]>(
    Object.entries(initialRequest.headers || {}).map(([key, value]) => ({
      key,
      value,
    }))
  );
  const [body, setBody] = useState<string>(initialRequest.body || '');
  const [response, setResponse] = useState<APIResponse>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newRequest = convertUrlToRequest(params, searchParams);
    if (newRequest.url && newRequest.url !== endpoint) {
      setEndpoint(newRequest.url);
    }
    if (newRequest.method && newRequest.method !== method) {
      setMethod(newRequest.method);
    }
    if (newRequest.body !== undefined && newRequest.body !== body) {
      setBody(newRequest.body);
    }
  }, [params, searchParams]);

  const handleSubmit = async () => {
    if (!endpoint.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(endpoint, {
        method,
        headers: headers.reduce(
          (acc, h) => {
            acc[h.key] = h.value;
            return acc;
          },
          {} as Record<string, string>
        ),
        body: method === 'GET' || !body ? undefined : body,
      });

      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (err) {
      setResponse({
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">REST Client</h1>

      <div className="space-y-4">
        <MethodSelector value={method} onChange={setMethod} />
        <EndpointInput value={endpoint} onChange={setEndpoint} />
        <HeadersEditor
          headers={headers}
          onAdd={(key, value) => setHeaders([...headers, { key, value }])}
        />
        <BodyEditor value={body} onChange={setBody} />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !endpoint}
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {response && (
        <div className="mt-8 p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Response</h2>
          <ResponseViewer data={response} />
        </div>
      )}
    </div>
  );
};
