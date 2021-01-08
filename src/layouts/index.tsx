/**
 * @author: lencx
 * @create_at: Jan 09, 2021
 */

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Router from '/router/Router';
import { RouteOption } from '/router/types';
import './index.scss';

interface LayoutProps {
  routes: RouteOption[];
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className="app">
      <nav>
        <li><Link to='/demo1'>Demo 1</Link></li>
      </nav>
      <div className='main'>
        <Router routes={props.routes} />
      </div>
    </div>
  )
}

export default Layout;
