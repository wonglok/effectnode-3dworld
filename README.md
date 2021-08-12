# effectnode-3dworld

> create 3d world with markers in userData

[![NPM](https://img.shields.io/npm/v/effectnode-3dworld.svg)](https://www.npmjs.com/package/effectnode-3dworld) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Screenshot

![Demo](https://github.com/wonglok/effectnode-3dworld/blob/master/demo-screenshots/3dworld.png?raw=true)

## Install

```bash
npm install --save effectnode-3dworld
```

## Usage

```jsx
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

  let { floor, startAt, startLookAt } = useMemo(() => {
    let floor = SkeletonUtils.clone(gltf.scene)
    let startAt = new Vector3(0, 0, 0)
    let startLookAt = new Vector3(0, 0, 0)

    floor.traverse((it) => {
      if (it) {
        if (it?.userData?.startAt) {
          it.getWorldPosition(startAt)
        }
        if (it?.userData?.startLookAt) {
          it.getWorldPosition(startLookAt)
        }
      }
    })

    return { floor, startAt, startLookAt }
  }, [gltf])

  return (
    <group>
      <SimpleBloomer></SimpleBloomer>

      {floor && (
        <Map3D floor={floor} startLookAt={startLookAt} startAt={startAt}>
          {({ Now }) => {
            return (
              <group>
                <TailCursor Now={Now} color={'#ffff00'}></TailCursor>
                <UserContorls
                  higherCamera={1.5}
                  avatarSpeed={2}
                  Now={Now}
                  startAt={startAt}
                  startLookAt={startLookAt}
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
```

## Blender Custom Properties

| Custom Properties     | Feature / Function                               |
| --------------------- | ------------------------------------------------ |
| startAt = 1           | Make its world position as starting point of map |
| enableBloom = 1       | Make it Glow                                     |
| enableDarken = 1      | Make it Draken to prevent Glow overlaying        |
| isFloor = 1           | Make it as floor so that we can walk on staris   |
| isHoverable = 1       | Make it Hoverable by 3d Pointer                  |
| website = wonglok.com | Open website iframe                              |
| tooltip = "My Name"   | Display Tooltip when hovered                     |

## Blender Demo File

[Blender Demo File](https://github.com/wonglok/effectnode-3dworld/tree/master/demo-files/demomap.blend)

## Blender GLTF Export Settings

![Export Blender GLTF](https://github.com/wonglok/effectnode-3dworld/blob/master/demo-screenshots/export-settings.png?raw=true)

## License

MIT © [wonglok](https://github.com/wonglok)
