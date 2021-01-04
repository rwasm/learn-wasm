import React from 'react'
import { greet } from 'rust_crate'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + Wasm + React!</p>
        <p>
          <button onClick={() => greet('WebAssembly')}>wasm greet</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <a
          className="App-link"
          href="https://github.com/lencx/create-xc-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          create-xc-app/template-wasm-react
        </a>
        <a
          className="App-link"
          href="https://github.com/lencx/learn-wasm"
          target="_blank"
          rel="noopener noreferrer"
        >
          learn-wasm
        </a>
      </header>
    </div>
  )
}

export default App