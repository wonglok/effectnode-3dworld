import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Mini } from '../lib/Mini'

export function useMiniEngine() {
  const { get } = useThree()
  const [mini] = useState(() => {
    return new Mini({})
  })

  useEffect(() => {
    return () => {
      mini.clean()
    }
  }, [])

  useFrame(() => {
    const st = get()
    for (const kn in st) {
      mini.set(kn, st[kn])
    }
    mini.work()
  })

  return { mini }
}
