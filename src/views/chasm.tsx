import React, { useEffect } from 'react';
import init, { chasm } from '@rsw/chasm';

export default function ChasmPage() {
  useEffect(() => {
    (async () => {
      await init();
      chasm('chasm');
    })()
  }, [])

  return <canvas id="chasm" />;
}
