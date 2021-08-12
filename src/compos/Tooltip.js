import React from 'react'
import { createPortal, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export function Tooltip({ Now }) {
  Now.makeKeyReactive('tooltip')
  let { camera } = useThree()
  return createPortal(
    <group position={[0.03, -0.03, -3]}>
      <Text
        anchorX='left'
        anchorY='top'
        userData={{ disableBloom: true }}
        outlineWidth={0.003}
        fontSize={0.06}
      >
        {Now.hoverData?.website ? 'Click to Open:\n' : ''}
        {Now.tooltip || ''}
      </Text>
    </group>,
    camera
  )
}
