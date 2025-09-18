import { CodeGenerator, RestClient } from '@components';
import { decodeBase64, parseQuery } from '@utils/urlEncoding';

export default async function RestPage({
  params,
  searchParams,
}: {
  params: Promise<{ method: string; requestpart?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { method, requestpart = [] } = await params;

  const [urlBase64, bodyBase64] = requestpart;

  const url = urlBase64 ? decodeBase64(urlBase64) : '';
  const body = bodyBase64 ? decodeBase64(bodyBase64) : '';

  const sp = await searchParams;

  const headers = parseQuery(
    new URLSearchParams(Object.entries(sp)).toString()
  );

  return (
    <div className="flex justify-end w-full">
      <RestClient />
      <CodeGenerator
        request={{
          method: method.toUpperCase(),
          url,
          headers,
          body,
        }}
      />
    </div>
  );
}
