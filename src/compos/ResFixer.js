import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export function ResFixer({ children }) {
  let { get } = useThree()
  let [ok, setOK] = useState(false)
  useEffect(() => {
    let orig = get().gl.getPixelRatio()

    let { getGPUTier } = require('detect-gpu')

    let setDPR = ([min, max]) => {
      let dpr = window.devicePixelRatio || min
      if (dpr >= max) {
        dpr = max
      }
      get().gl.setPixelRatio(dpr)

      setOK(true)
    }

    getGPUTier({ glContext: get().gl.getContext() }).then((v) => {
      // ipad pro gen 2
      if (v.gpu === 'apple a9x gpu') {
        setDPR([1, 0.9])
        return
      }

      if (v.fps < 30) {
        setDPR([1, 1])
        return
      }

      if (v.tier >= 3) {
        setDPR([1, 3])
      } else if (v.tier >= 2) {
        setDPR([1, 2])
      } else if (v.tier >= 1) {
        setDPR([1, 1])
      } else if (v.tier <= 0) {
        setDPR([1, 0.75])
      }
    })

    return () => {
      get().gl.setPixelRatio(orig)
    }
  }, [])

  return (ok && children) || null
}
