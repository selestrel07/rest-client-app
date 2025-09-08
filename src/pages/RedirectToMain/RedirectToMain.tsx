import { redirect } from 'react-router';
import { routesList } from '../../data/routes-list.ts';

export function loader() {
  return redirect(`/${routesList.main}`);
}

export default function RedirectToMain() {
  return null;
}
