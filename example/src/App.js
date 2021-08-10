import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'

import {
  Map3D,
  UserContorls,
  TailCursor,
  SimpleBloomer,
  StarSky,
  EnvLightByImage
} from 'effectnode-3dworld'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

const App = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <Suspense
        fallback={
          <group>
            <group rotation-x={Math.PI * 0}>
              <gridHelper args={[150, 50, 0x232323, 0xaaaaaa]}></gridHelper>
            </group>
            <PerspectiveCamera
              position={[0, 20, 20]}
              rotation-x={Math.PI * -0.25}
              makeDefault={true}
            ></PerspectiveCamera>
          </group>
        }
      >
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
                <UserContorls
                  higherCamera={1.5}
                  avatarSpeed={2}
                  Now={Now}
                ></UserContorls>
                <TailCursor Now={Now}></TailCursor>
              </group>
            )
          }}
        </Map3D>
      )}

      <primitive object={floor}></primitive>
      <SimpleBloomer></SimpleBloomer>
      <directionalLight position={[10, 10, 10]}></directionalLight>
      <EnvLightByImage imageURL={'/image/sky.png'}></EnvLightByImage>

      <StarSky></StarSky>
    </group>
  )
}

export default App
