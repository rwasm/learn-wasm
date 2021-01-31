import { lazy } from 'react';
import { RouteOption } from './router/types';

const routes: RouteOption[] = [
  {
    title: 'chasm',
    path: '/rsw/chasm',
    component: lazy(() => import('./views/chasm')),
    exact: true,
  },
  {
    path: '/',
    component: lazy(() => import('./views/home')),
  },
];

export default routes;