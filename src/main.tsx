import React from 'react'
import ReactDOM from 'react-dom'

import useWasm from '/hooks/useWasm'
import './index.css'
import App from './App'

const WasmApp = () => {
  const [loading] = useWasm()

  return !loading
    ? <React.StrictMode><App /></React.StrictMode>
    : <div className="wasm_loading">loading...</div>
}

ReactDOM.render(
  <WasmApp />,
  document.getElementById('root')
)
