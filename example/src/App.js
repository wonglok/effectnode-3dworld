import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import {
  Map3D,
  UserContorls,
  TailCursor,
  SimpleBloomer,
  StarSky,
  EnvLightByImage,
  Tooltip,
  TheHelper
} from 'effectnode-3dworld'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'
import { Vector3 } from 'three'

//
// needs trailing slash
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://wonglok.github.io/effectnode-3dworld/`
    : `/`

const App = () => {
  return (
    <Canvas dpr={[0, 1.5]} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<LoadingScreen></LoadingScreen>}>
        <Content3D></Content3D>
      </Suspense>
    </Canvas>
  )
}

function Content3D() {
  let gltf = useGLTF(`${BASE_URL}map/demo-map-000.glb`)

  let { floor, startAt } = useMemo(() => {
    let floor = SkeletonUtils.clone(gltf.scene)
    let startAt = new Vector3(0, 0, 0)

    floor.traverse((it) => {
      if (it) {
        if (it.material) {
          it.material = it.material.clone()
        }
        if (it.geometry) {
          it.userData.isFloor = true
        }
        if (it?.userData?.startAt) {
          it.getWorldPosition(startAt)
        }
      }
    })

    return { floor, startAt }
  }, [gltf])

  return (
    <group>
      <SimpleBloomer></SimpleBloomer>

      {floor && (
        <Map3D floor={floor} startAt={startAt}>
          {({ Now }) => {
            return (
              <group>
                <TailCursor Now={Now}></TailCursor>
                <UserContorls
                  higherCamera={1.5}
                  avatarSpeed={2}
                  Now={Now}
                ></UserContorls>
                <Tooltip Now={Now}></Tooltip>
                <TheHelper Now={Now}></TheHelper>
                <primitive object={floor}></primitive>
              </group>
            )
          }}
        </Map3D>
      )}

      <directionalLight position={[10, 10, 10]}></directionalLight>
      <EnvLightByImage imageURL={`${BASE_URL}image/sky.png`}></EnvLightByImage>
      <StarSky></StarSky>
    </group>
  )
}

function LoadingScreen() {
  return (
    <group>
      <group rotation-x={Math.PI * 0}>
        <gridHelper args={[150, 50, 0x232323, 0xbababa]}></gridHelper>
      </group>

      <PerspectiveCamera
        position={[0, 30, 30]}
        rotation-x={Math.PI * -0.25}
        makeDefault={true}
      ></PerspectiveCamera>
    </group>
  )
}

export default App

//
