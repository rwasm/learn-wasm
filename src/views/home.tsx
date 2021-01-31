import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

export default function Home() {
  return (
    <div className="home">
      <nav>
        {routes.map((i) => (
          <li key={i.path}>
            <Link to={i.path}>
              {i.title}
            </Link>
          </li>
        ))}
      </nav>

      <footer>
        <a href="https://github.com/lencx/learn-wasm">lencx/learn-wasm</a>
        {' 💖 '}
        <a href="https://github.com/lencx/vite-plugin-rsw">rsw</a>
      </footer>
    </div>
  )
}
