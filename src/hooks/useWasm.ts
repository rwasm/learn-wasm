import { useState, useEffect } from 'react';
import chasmInit from '@rsw/chasm';

export default function useWasm() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chasmInit()
      .then(i => setLoading(!i))
  }, [])

  return [loading];
}