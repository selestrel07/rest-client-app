import { redirect, useParams } from 'react-router';
import { getAuthToken } from '../../utils/getAuthToken.ts';
import { routesList } from '../../data/routes-list.ts';
import { methods } from '../../data/supported-methods.ts';

export async function loader({
  params,
  request,
}: {
  params: Record<string, string>;
  request: Request;
}) {
  //redirect to the /main route in case of user isn't authenticated
  const token = await getAuthToken(request);

  if (!token) {
    return redirect(`/${routesList.main}`);
  }

  //redirect to the /rest-client/GET route if the method wasn't provided
  const method = params.method;
  if (!method || !Object.keys(methods).includes(method)) {
    return redirect(`/${routesList.client}/${methods.GET}`);
  }
}

export default function RestClient() {
  const { url, body } = useParams();
  return <>{`This is a rest client page with url: ${url} and body: ${body}`}</>;
}
