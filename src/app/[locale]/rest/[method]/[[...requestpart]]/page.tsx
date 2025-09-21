'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setMethod,
  setEndpoint,
  setBody,
  setHeaders,
} from '@states/restClientSlice';
import { RestClient, CodeGenerator } from '@components';
import { useParams, useSearchParams } from 'next/navigation';
import { decodeBase64, parseQuery } from '@utils/urlEncoding';

export default function RestPageClient() {
  const dispatch = useDispatch();
  const params = useParams<{ method?: string; requestpart?: string[] }>();
  const searchParams = useSearchParams();
  const method = params?.method?.toUpperCase() || 'GET';
  const [urlBase64, bodyBase64] = params?.requestpart ?? [];
  const url = urlBase64 ? decodeBase64(urlBase64) : '';
  const body = bodyBase64 ? decodeBase64(bodyBase64) : '';
  const headers = parseQuery(searchParams.toString());

  useEffect(() => {
    dispatch(setMethod(method));
    dispatch(setEndpoint(url));
    dispatch(setBody(body));

    dispatch(
      setHeaders(
        Object.entries(headers ?? {}).map(([key, value]) => ({
          key,
          value,
        }))
      )
    );
  }, [method, url, body, headers, dispatch]);

  return (
    <div className="flex justify-end w-full">
      <RestClient />
      <CodeGenerator
        request={{
          method,
          url,
          headers,
          body,
        }}
      />
    </div>
  );
}
