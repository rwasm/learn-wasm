/**
 * @author: lencx
 * @create_at: Jan 09, 2021
 */

import React, { useRef, useEffect } from 'react';
import { chasmStart } from 'rust_crate';
// import './index.scss';

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    chasmStart();
  }, [])
  return (
    <div className="home">
      <canvas ref={canvasRef} id="chasm" />
    </div>
  )
}

export default Home;
