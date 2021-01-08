/**
 * @author: lencx
 * @create_at: Jan 05, 2021
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import useWasm from '/hooks/useWasm';
import Router from '/router/Router';
import routes from './routes';
import './index.css';

const WasmApp = () => {
  const [loading] = useWasm();

  return !loading
    ? (
      <React.StrictMode>
        <BrowserRouter>
          <Router routes={routes} />
        </BrowserRouter>
      </React.StrictMode>
    ) : (
      <div className="wasm_loading">loading...</div>
    );
}

ReactDOM.render(
  <WasmApp />,
  document.getElementById('root')
)
