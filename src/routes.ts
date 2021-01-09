/**
 * @author: lencx
 * @create_at: Jan 09, 2021
 */

import { lazy } from 'react';
import { RouteOption } from '/router/types';

const routes: RouteOption[] = [
  {
    path: '/',
    component: lazy(() => import('./views/Home')),
  }
  // {
  //   path: '/',
  //   component: lazy(() => import('./layouts')),
  //   routes: [
  //     {
  //       path: '/',
  //       component: lazy(() => import('./views/home')),
  //     },
  //   ],
  // },
];

export default routes;