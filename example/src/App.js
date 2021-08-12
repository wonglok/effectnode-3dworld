import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import {
  Map3D,
  UserContorls,
  TailCursor,
  SimpleBloomer,
  StarSky,
  EnvLightByImage,
  TheHelper
} from 'effectnode-3dworld'

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

  return (
    <group>
      {gltf.scene && (
        <Map3D object={gltf.scene}>
          {({ Now }) => {
            return (
              <group>
                <UserContorls
                  higherCamera={1.5}
                  avatarSpeed={2}
                  Now={Now}
                ></UserContorls>
                <TailCursor Now={Now} color={'#bababa'}></TailCursor>
                <TheHelper Now={Now}></TheHelper>
              </group>
            )
          }}
        </Map3D>
      )}

      <SimpleBloomer></SimpleBloomer>
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
