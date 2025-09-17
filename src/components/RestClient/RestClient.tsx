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
  const [isJson, setIsJson] = useState<boolean>(true);
  const [response, setResponse] = useState<APIResponse>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newRequest = convertUrlToRequest(params, searchParams);
    if (newRequest.url && newRequest.url !== endpoint)
      setEndpoint(newRequest.url);
    if (newRequest.method && newRequest.method !== method)
      setMethod(newRequest.method);
    if (newRequest.body !== undefined && newRequest.body !== body)
      setBody(newRequest.body);
  }, [params, searchParams]);

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isBodyValid =
    !isJson ||
    body === '' ||
    (() => {
      try {
        if (!body.trim()) return true;
        JSON.parse(body);
        return true;
      } catch {
        return false;
      }
    })();

  const isEndpointValid = !endpoint || isValidUrl(endpoint);
  const canSend = !!endpoint && isEndpointValid && isBodyValid;

  const handleSubmit = async () => {
    if (!canSend || isLoading) return;

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

      <div className="space-y-6">
        <MethodSelector value={method} onChange={setMethod} />

        <EndpointInput value={endpoint} onChange={setEndpoint} />

        <HeadersEditor
          headers={headers}
          onAdd={(key, value) => setHeaders([...headers, { key, value }])}
        />

        <BodyEditor
          value={body}
          onChange={setBody}
          isJson={isJson}
          onModeChange={setIsJson}
        />

        <button
          onClick={handleSubmit}
          disabled={!canSend || isLoading}
          className={`px-4 py-2 rounded transition-colors ${
            !canSend || isLoading
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-violet-500 hover:bg-violet-600 text-white'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>

        {!isBodyValid && isJson && body && (
          <p className="text-red-500 text-sm">
            Invalid JSON in body. Fix syntax to send.
          </p>
        )}

        {response && (
          <div className="mt-6 p-4 border border-violet-700 rounded bg-violet-50">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Response
            </h2>
            <ResponseViewer data={response} />
          </div>
        )}
      </div>
    </div>
  );
};
