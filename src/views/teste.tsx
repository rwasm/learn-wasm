// https://github.com/rustwasm/wasm-pack/issues/1017

import React, { useEffect } from 'react';
import init, { greet } from '@rsw/teste';

export default function ExcelReadPage() {
  useEffect(() => {
    (async () => {
      await init();
      const el = document.querySelector('#teste') as HTMLCanvasElement;
      greet(el);
    })()
  }, [])

  return (
    <div className="test-page">
      <canvas id="teste" />
      <br />
      <a href="https://github.com/rustwasm/wasm-pack/issues/1017">https://github.com/rustwasm/wasm-pack/issues/1017</a>
    </div>
  );
}