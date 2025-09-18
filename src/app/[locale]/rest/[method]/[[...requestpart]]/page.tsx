import { CodeGenerator } from '@components';
import { decodeBase64, parseQuery } from '@utils/urlEncoding';

export default async function RestPage({
  params,
  searchParams,
}: {
  params: Promise<{ method: string; requestpart?: string[] }>;
  searchParams: Record<string, string>;
}) {
  const { method, requestpart = [] } = await params;

  const [urlBase64, bodyBase64] = requestpart;

  const url = decodeBase64(urlBase64);
  const body = decodeBase64(bodyBase64);

  const headers = parseQuery(new URLSearchParams(searchParams).toString());

  return (
    <div className="flex justify-end w-full">
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
