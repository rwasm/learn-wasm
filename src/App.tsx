import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

import routes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Router routes={routes} />
    </BrowserRouter>
  )
}
