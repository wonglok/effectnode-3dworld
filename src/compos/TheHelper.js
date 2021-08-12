import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'

export function TheHelper() {
  return (
    <group>
      <TheCrossHair>
        {/*  */}
        {/*  */}
      </TheCrossHair>
    </group>
  )
}

//
function TheCrossHair() {
  //
  let core = useRef()
  let orbit = useRef()

  useEffect(() => {
    //
  }, [])

  useFrame(({ camera }) => {
    if (core.current) {
      core.current.position.copy(camera.position)
      core.current.rotation.copy(camera.rotation)
    }
    if (orbit.current) {
    }
  })

  return (
    <group>
      <group ref={core}>
        <group ref={orbit} scale={[1, 1, 1]} position={[0, 0, -1]}>
          <Text
            fontSize={0.01}
            outlineColor='black'
            outlineWidth={0.001}
            color='white'
          >
            *
          </Text>
        </group>
      </group>
    </group>
  )
}
