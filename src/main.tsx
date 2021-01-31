import React from 'react'
import ReactDOM from 'react-dom'

import useWasm from './hooks/useWasm';
import App from './App';
import './index.css';

const Container = () => {
  const [loading] = useWasm();

  return (
    <React.StrictMode>
      {loading ? <div>loading...</div> : <App />}
    </React.StrictMode>
  )
};

ReactDOM.render(
  <Container />,
  document.getElementById('root')
)
