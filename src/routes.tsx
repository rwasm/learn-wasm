import React, { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import HomePage from './views/home';
import ChasmPage from './views/chasm';
import GameOfLifePage from './views/game_of_life';
import FfmpegPage from './views/ffmpeg';
import ExcelReadPage from './views/excel_read';

export const routes: Array<RouteObject & { title?: string }> = [
  {
    path: '/rsw/chasm',
    title: 'Chasm',
    element: <ChasmPage />
  },
  {
    path: '/rsw/game-of-life',
    title: 'Game Of Life',
    element: <GameOfLifePage />
  },
  {
    path: '/ffmpeg',
    title: 'Ffmpeg',
    element: <FfmpegPage />,
  },
  {
    path: '/rsw/excel-read',
    title: 'Excel Read',
    element: <ExcelReadPage />,
  },
  {
    path: '/',
    element: <HomePage />
  },
];

export default () => {
  return useRoutes(routes);
};
