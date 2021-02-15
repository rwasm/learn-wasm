import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

export default function HomePage() {
  return (
    <div className="home">
      <nav>
        {routes.map((i) => i.path !== '/' && (
          <li key={i.path}>
            <Link to={i.path}>
              <span className="title">{i.title}</span>
              {i.env?.map(i => <span key={i} className="env-item">{i}</span>)}
            </Link>
          </li>
        ))}
      </nav>

      <div className="tip">
        <span className="item"><span>dev</span>development</span>
        <span className="item"><span>build</span>production</span>
      </div>

      <footer>
        <a href="https://github.com/lencx/learn-wasm">lencx/learn-wasm</a>
        {' 💖 '}
        <a href="https://github.com/lencx/vite-plugin-rsw">rsw</a>
      </footer>
    </div>
  )
}
