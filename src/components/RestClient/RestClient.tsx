'use client';

import { FC, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  EndpointInput,
  HeadersEditor,
  BodyEditor,
  ResponseViewer,
  CodeGenerator,
  MethodSelector,
} from '@components';
import { useTranslations } from 'next-intl';
import { processRequest } from '@actions/request-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { setToastValue } from '@states/toastSlice';
import { decodeBase64, parseQuery } from '@utils/urlEncoding';
import { useRouter } from '@i18n/navigation';
import {
  addHeader,
  clearResponse,
  setBody,
  setEndpoint,
  setHeaders,
  setIsJson,
  setMethod,
  setResponse,
} from '@states/restClientSlice';
import { buildRestUrl } from '@utils/buildRestUrl';

export const RestClient: FC = () => {
  const t = useTranslations('RestClient');
  const tMessages = useTranslations('Messages');
  const params = useParams<{ method?: string; requestpart?: string[] }>();
  const searchParams = useSearchParams();
  const initialMethod = params?.method?.toUpperCase() || 'GET';
  const [urlBase64, bodyBase64] = params?.requestpart ?? [];
  const url = urlBase64 ? decodeBase64(urlBase64) : '';
  const initialBody = bodyBase64 ? decodeBase64(bodyBase64) : '';
  const initialHeaders = useMemo(
    () => parseQuery(searchParams.toString()),
    [searchParams]
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { method, endpoint, headers, body, isJson, response, isLoading } =
    useAppSelector((state) => state.restClient);

  useEffect(() => {
    dispatch(setMethod(initialMethod));
    dispatch(setEndpoint(url));
    dispatch(setBody(initialBody));

    dispatch(setHeaders(initialHeaders));
  }, [initialMethod, url, initialBody, initialHeaders, dispatch]);

  const handleMethodChange = (newMethod: string) => {
    dispatch(setMethod(newMethod));
    dispatch(clearResponse());
    const url = buildRestUrl({ method: newMethod, url: '' });
    router.replace(url);
  };

  const handleSubmit = async () => {
    const res = await processRequest({
      method,
      body,
      headers,
      url: endpoint,
    });

    if (res.result === 'success') {
      dispatch(
        setResponse({
          status: res.status ?? 200,
          data: res.body ?? '',
        })
      );
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

    const newUrl = buildRestUrl({
      method,
      url: endpoint,
      headers,
      body,
    });
    router.replace(newUrl);
  };

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

  return (
    <div className="p-6 max-w-4xl space-y-6 self-start">
      <h1 className="text-2xl font-bold text-violet-950">{t('title')}</h1>
      <div className="flex justify-between gap-6 w-full">
        <div className="w-[500px]">
          <MethodSelector value={method} onChange={handleMethodChange} />

          <div>
            <EndpointInput
              value={endpoint}
              onChange={(val) => dispatch(setEndpoint(val))}
            />
          </div>

          <HeadersEditor
            headers={headers}
            onAdd={(k, v) => dispatch(addHeader({ key: k, value: v }))}
          />

          <BodyEditor
            value={body}
            onChange={(val) => dispatch(setBody(val))}
            isJson={isJson}
            onModeChange={(val) => dispatch(setIsJson(val))}
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
