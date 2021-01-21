import React from 'react'
import ReactDOM from 'react-dom'
import useWasm from './hooks/useWasm';
import './index.css';
import App from './App';

const Container = () => {
  const [loading] = useWasm();

  console.log('«10» /learn-wasm/src/main.tsx ~> ', loading);


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
