import { lazy } from 'react';
import { RouteOption } from './router/types';

const routes: RouteOption[] = [
  {
    title: 'chasm',
    path: '/rsw/chasm',
    component: lazy(() => import('./views/chasm')),
    exact: true,
    // env: ['dev', 'build'],
  },
  {
    title: 'game of life',
    path: '/rsw/game-of-life',
    component: lazy(() => import('./views/game_of_life')),
    exact: true,
    // env: ['dev', 'build'],
  },
  {
    title: 'ffmpeg',
    path: '/ffmpeg',
    component: lazy(() => import('./views/ffmpeg')),
    exact: true,
    // env: ['dev', 'build'],
  },
  {
    title: 'excel read',
    path: '/rsw/excel-read',
    component: lazy(() => import('./views/excel_read')),
    exact: true,
    // env: ['dev', 'build'],
  },
  {
    // https://github.com/rustwasm/wasm-pack/issues/1017
    title: '#1017/wasm-pack issues teste',
    path: '/rsw/issues/teste',
    component: lazy(() => import('./views/teste')),
    exact: true,
    // env: ['dev', 'build'],
  },
  {
    path: '/',
    component: lazy(() => import('./views/home')),
  },
];

export default routes;