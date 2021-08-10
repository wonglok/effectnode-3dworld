import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import {
  Map3D,
  UserContorls,
  TailCursor,
  SimpleBloomer,
  StarSky
} from 'effectnode-3dworld'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

const App = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <Content3D></Content3D>
      </Suspense>
    </Canvas>
  )
}

function Content3D() {
  let gltf = useGLTF(`/map/demo-map-000.glb`)

  let floor = useMemo(() => {
    let floor = SkeletonUtils.clone(gltf.scene)

    floor.traverse((it) => {
      if (it) {
        if (it.material) {
          it.material = it.material.clone()
        }
        if (it.geometry) {
          it.userData.isFloor = true
        }
      }
    })

    return floor
  }, [gltf])

  return (
    <group>
      {floor && (
        <Map3D floor={floor} startAt={{ x: 0, y: 0, z: 0 }}>
          {({ Now }) => {
            return (
              <group>
                <UserContorls Now={Now}></UserContorls>
                <TailCursor Now={Now}></TailCursor>
              </group>
            )
          }}
        </Map3D>
      )}

      <primitive object={floor}></primitive>
      <SimpleBloomer></SimpleBloomer>
      <directionalLight position={[10, 10, 10]}></directionalLight>

      <StarSky></StarSky>
    </group>
  )
}

export default App
