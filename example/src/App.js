import React, { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
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
                <TailCursor Now={Now} color={'#bababa'}></TailCursor>
                <UserContorls
                  higherCamera={1.5}
                  avatarSpeed={2}
                  Now={Now}
                ></UserContorls>
                <Tooltip Now={Now}></Tooltip>
                <TheHelper Now={Now}></TheHelper>
              </group>
            )
          }}
        </Map3D>
      )}
      <EnablePhysicalLight></EnablePhysicalLight>
      <directionalLight
        position={[10, 10, 10]}
        intensit={0.3}
      ></directionalLight>
      <SimpleBloomer></SimpleBloomer>
      <EnvLightByImage imageURL={`${BASE_URL}image/sky.png`}></EnvLightByImage>
      <StarSky></StarSky>
    </group>
  )
}

function EnablePhysicalLight() {
  let { gl } = useThree()

  useEffect(() => {
    gl.physicallyCorrectLights = true

    return () => {
      gl.physicallyCorrectLights = false
    }
  })
  return null
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
