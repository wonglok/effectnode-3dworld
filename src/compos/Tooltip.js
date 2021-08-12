import React from 'react'
import { createPortal, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export function Tooltip({ Now, ...props }) {
  Now.makeKeyReactive('tooltip')
  let { camera } = useThree()
  return createPortal(
    <group position={[0.03, -0.03, -3]}>
      <Text
        anchorX='left'
        anchorY='top'
        userData={{ disableBloom: true }}
        outlineWidth={0.005}
        fontSize={0.04}
        {...props}
      >
        {Now.hoverData?.website ? 'Click to open:\n' : ''} {Now.tooltip || ''}
      </Text>
    </group>,
    camera
  )
}
