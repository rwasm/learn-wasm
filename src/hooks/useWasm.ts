import { useEffect, useState } from 'react'
import init from 'rust_crate'

export default function useWasm() {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    init().then((m: any) => {
      setLoading(!m)
      if (!m) {
        console.error('WebAssembly instance loading error');
      }
    })
  }, [])

  return [loading]
}
