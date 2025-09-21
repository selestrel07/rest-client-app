'use client';

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  setMethod,
  setEndpoint,
  addHeader,
  setBody,
  setIsJson,
  sendRequest,
  clearResponse,
} from '../../states/restClientSlice';
import {
  MethodSelector,
  EndpointInput,
  HeadersEditor,
  BodyEditor,
  ResponseViewer,
} from '@components';
import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import { buildRestUrl } from '@utils/buildRestUrl';

export const RestClient: FC = () => {
  const t = useTranslations('RestClient');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { method, endpoint, headers, body, isJson, response, isLoading } =
    useSelector((state: RootState) => state.restClient);

  const handleMethodChange = (newMethod: string) => {
    dispatch(setMethod(newMethod));
    dispatch(clearResponse());
    const url = buildRestUrl({ method: newMethod, url: '' });
    router.replace(url);
  };

  const handleSubmit = () => {
    dispatch(sendRequest({ method, endpoint, headers, body }));
    const newUrl = buildRestUrl({
      method,
      url: endpoint,
      headers: headers.reduce(
        (acc, h) => {
          if (h.key) acc[h.key] = h.value;
          return acc;
        },
        {} as Record<string, string>
      ),
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
      <MethodSelector value={method} onChange={handleMethodChange} />
      <EndpointInput
        value={endpoint}
        onChange={(val) => dispatch(setEndpoint(val))}
      />
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
            : 'bg-violet-500 hover:bg-violet-600 text-white'
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
  );
};
