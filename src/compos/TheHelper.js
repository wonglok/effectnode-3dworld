import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useAutoEvent } from '../utils/use-auto-event'

export function TheHelper({ Now }) {
  return (
    <group>
      <TheCrossHair Now={Now}>
        {/*  */}
        {/*  */}
      </TheCrossHair>
      <ClickToOpen Now={Now}>
        {/*  */}
        {/*  */}
      </ClickToOpen>

      <HideCursor>
        {/*  */}
        {/*  */}
      </HideCursor>
    </group>
  )
}

//
function TheCrossHair({ Now }) {
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
            +
          </Text>
        </group>
      </group>
    </group>
  )
}

function ClickToOpen({ Now }) {
  let { gl } = useThree()

  let move = 0
  let isDown = false
  useAutoEvent(
    'pointerdown',
    () => {
      isDown = true
      move = 0
    },
    { passive: false },
    gl.domElement
  )
  useAutoEvent(
    'pointerup',
    () => {
      isDown = false
    },
    { passive: false },
    gl.domElement
  )

  useAutoEvent(
    'pointermove',
    () => {
      if (isDown) {
        move++
      }
    },
    { passive: false },
    gl.domElement
  )

  useAutoEvent(
    'pointerup',
    () => {
      //
      if (Now && move <= 10) {
        if (Now?.hoverData?.website) {
          let href = document.createElement('a')
          href.href = Now.hoverData.website
          href.target = '_blank'
          href.click()
        }
      }
    },
    { passive: false },
    gl.domElement
  )

  return null
}

function HideCursor() {
  //

  useAutoEvent(
    'pointerdown',
    () => {
      document.body.style.cursor = 'grabbing'
    },
    { passive: false },
    document.body
  )
  useAutoEvent(
    'pointerup',
    () => {
      document.body.style.cursor = 'grab'
    },
    { passive: false },
    document.body
  )

  useEffect(() => {
    //
    document.body.style.cursor = 'grab'

    return () => {
      document.body.style.cursor = ''
      //
    }
  }, [])
  return null
}
