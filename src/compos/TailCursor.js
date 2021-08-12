import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useMiniEngine } from '../utils/use-mini-engine'
import { CursorTrackerTail } from '../lib/CursorTrackerTail'
import { Color } from 'three'

export function TailCursor({ Now, color }) {
  let { mini } = useMiniEngine()
  let cursor = useRef()

  let colorObj = useRef(new Color(color))

  useEffect(() => {
    colorObj.current.set(color)
  }, [color])

  useEffect(() => {
    let mouse = cursor.current
    console.log(123)
    if (mouse) {
      mini.ready.scene.then((scene) => {
        return new CursorTrackerTail({
          mini,
          cursor: mouse,
          mounter: scene,
          color: colorObj.current
        })
      })
    }
  }, [])

  // let time = 0
  useFrame((st, dt) => {
    // time += dt
    if (cursor.current) {
      let mouse = cursor.current

      mouse.position.lerp(Now.cursorPos, 0.4)

      // mouse.scale.setScalar(0.15);

      // mouse.lookAt(
      //   Now.cursorPos.x + Now.cursorNormal.x,
      //   Now.cursorPos.y + Now.cursorNormal.y,
      //   Now.cursorPos.z + Now.cursorNormal.z
      // );

      mouse.lookAt(st.camera.position)
    }
  })

  return <group ref={cursor}>{/*  */}</group>
}
