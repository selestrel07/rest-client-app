import { convertUrlToRequest } from '@utils/requestUrlConverter';
import { RestClient } from '@components';

export default async function RestDynamicPage({
  params,
}: {
  params: Promise<{
    locale: string;
    method: string;
    requestpart?: string[];
  }>;
}) {
  const resolvedParams = await params;
  const { method, requestpart = [] } = resolvedParams;

  const request = convertUrlToRequest({
    method,
    requestpart,
  });

  return <RestClient defaultRequest={request} />;
}
