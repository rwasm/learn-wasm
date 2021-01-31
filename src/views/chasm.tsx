import React, { useEffect } from 'react';
import { chasm } from '@rsw/chasm';

export default function Chasm() {
  useEffect(() => {
    chasm('chasm');
  }, [])

  return <canvas id="chasm" />;
}
