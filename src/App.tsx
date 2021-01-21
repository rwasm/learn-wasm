import React, { useRef, useEffect } from 'react';
import { chasm } from '@rsw/chasm';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chasm();
  }, [])

  return (
    <div className="App">
      <canvas ref={canvasRef} id="chasm" />
    </div>
  )
}

export default App;
