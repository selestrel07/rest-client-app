import { Params } from 'next/dist/server/request/params';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { RequestType } from '@types';
import { base64ToString, stringToBase64 } from '@utils/stringBase64Converter';

export function convertUrlToRequest(
  params: Params,
  searchParams?: ReadonlyURLSearchParams
): RequestType {
  const paramsObj: Record<string, string> = {};
  if (searchParams) {
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
  }
  return {
    method: params.method?.toString() ?? '',
    url: base64ToString(params.requestpart ? params.requestpart[0] : undefined),
    body: base64ToString(
      params.requestpart ? params.requestpart[1] : undefined
    ),
    headers: paramsObj,
  };
}

export function convertRequestToUrl(request: RequestType): string {
  const searchParams = new URLSearchParams();
  if (request.headers) {
    Object.entries(request.headers).forEach(([key, value]) =>
      searchParams.append(key, value)
    );
  }
  const urlPart = request.url ? `/${stringToBase64(request.url)}` : '';
  const bodyPart = request.body ? `/${stringToBase64(request.body)}` : '';
  return `${urlPart}${bodyPart}${request.headers ? `?${searchParams}` : ''}`;
}
