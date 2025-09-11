import { getAuthToken } from '../utils/getAuthToken.ts';
import { redirect } from 'react-router';
import { routesList } from '../data/routes-list.ts';

export async function authLoader({ request }: { request: Request }) {
  const token = await getAuthToken(request);
  if (token) {
    return redirect(`/${routesList.main}`);
  }
  return null;
}
