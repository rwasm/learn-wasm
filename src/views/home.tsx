import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import awesomeRswIcon from '../assets/awesome-rsw.svg';

export default function HomePage() {
  return (
    <div className="home">
      <nav>
        {routes.map((i: any) => i.path !== '/' && (
          <li key={i.path}>
            <Link to={i.path}>
              <span className="title">{i.title}</span>
              {i.env?.map((i: any) => <span key={i} className="env-item">{i}</span>)}
            </Link>
          </li>
        ))}
      </nav>

      <footer>
        <div className="icons">
          <img className="stars" src="https://img.shields.io/github/stars/lencx/learn-wasm?label=stars%28learn-wasm%29" alt="Stars" />
          <a href="https://github.com/lencx/awesome-rsw"><img alt="awesome" src={awesomeRswIcon} /></a>
        </div>
        <div className="f1">
          <a href="https://github.com/lencx/learn-wasm">lencx/learn-wasm</a>
          {' 💖 '}
          <a href="https://github.com/lencx/vite-plugin-rsw">rsw</a>
        </div>
      </footer>
    </div>
  )
}
