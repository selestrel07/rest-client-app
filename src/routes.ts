import { index, route, type RouteConfig } from '@react-router/dev/routes';
import { routesList } from './data/routes-list.ts';

export default [
  index('./pages/RedirectToMain/RedirectToMain.tsx'),
  route(routesList.main, './pages/Home/Home.tsx'),
  route(routesList.login, './pages/SignIn/SignIn.tsx'),
  route(routesList.register, './pages/SignUp/SignUp.tsx'),
  route(
    `${routesList.client}/:method?/:url?/:body?`,
    './pages/RestClient/RestClient.tsx'
  ),
  route(routesList.any, './pages/NotFound/NotFound.tsx'),
] satisfies RouteConfig;
