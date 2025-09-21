'use client';

import { FC, useState, useEffect } from 'react';
import {
  MethodSelector,
  EndpointInput,
  HeadersEditor,
  BodyEditor,
  ResponseViewer,
  CodeGenerator,
} from '@components';
import { useTranslations } from 'next-intl';
import { processRequest } from '@actions/request-actions';
import { useAppDispatch } from '../../hooks/useAppStore';
import { setToastValue } from '@states/toastSlice';
import { APIResponse, RequestType } from '@types';

export const RestClient: FC<{ defaultRequest?: RequestType }> = ({
  defaultRequest,
}) => {
  const t = useTranslations('RestClient');
  const tMessages = useTranslations('Messages');
  const dispatch = useAppDispatch();

  const [method, setMethod] = useState<string>(defaultRequest?.method || 'GET');
  const [endpoint, setEndpoint] = useState<string>(defaultRequest?.url || '');
  const [headers, setHeaders] = useState<Record<string, string>>(
    defaultRequest?.headers ?? {}
  );
  const [body, setBody] = useState<string>(defaultRequest?.body || '');
  const [isJson, setIsJson] = useState<boolean>(true);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (defaultRequest) {
      setMethod(defaultRequest.method || 'GET');
      setEndpoint(defaultRequest.url || '');
      setHeaders(defaultRequest.headers ?? {});
      setBody(defaultRequest.body || '');
    }
  }, [defaultRequest]);

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
    const res = await processRequest({
      method,
      body,
      headers,
      url: endpoint,
    });

    if (res.result === 'success') {
      setResponse({
        status: res.status ?? 200,
        data: res.body ?? '',
      });
      dispatch(
        setToastValue({
          type: 'success',
          message: tMessages('requestSuccess'),
        })
      );
    } else {
      dispatch(
        setToastValue({
          type: 'error',
          message: tMessages('requestError', { error: String(res.error) }),
        })
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl space-y-6 self-start">
      <h1 className="text-2xl font-bold text-violet-950">{t('title')}</h1>
      <div className="flex justify-between gap-6 w-full">
        <div className="w-[500px]">
          <MethodSelector value={method} onChange={setMethod} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <EndpointInput value={endpoint} onChange={setEndpoint} />
          </div>
          <HeadersEditor
            headers={headers}
            onAdd={(key, value) =>
              setHeaders({
                ...headers,
                [key]: value,
              })
            }
          />
          <BodyEditor
            value={body}
            onChange={setBody}
            isJson={isJson}
            onModeChange={setIsJson}
          />
          {!isBodyValid && isJson && body && (
            <p className="text-red-500 text-sm">{t('invalidJson')}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSend || isLoading}
            className={`px-4 py-2 rounded transition-colors ${
              !canSend || isLoading
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-violet-500 hover:bg-violet-600 text-white cursor-pointer'
            }`}
          >
            {isLoading ? '...' : t('sendRequest')}
          </button>

          {response && (
            <div className="mt-6 p-4 border border-violet-700 rounded bg-violet-50">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {t('response')}
              </h2>
              <ResponseViewer data={response} />
            </div>
          )}
        </div>
        <CodeGenerator
          request={{
            method,
            url: endpoint,
            headers,
            body,
          }}
        />
      </div>
    </div>
  );
};
