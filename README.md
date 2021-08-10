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
  EnvLightByImage
} from 'effectnode-3dworld'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

// needs trailing slash
export const BASE_URL = `https://wonglok.github.io/effectnode-3dworld/`

const App = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <Suspense
        fallback={
          // Loading screen
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
  let gltf = useGLTF(`${BASE_URL}map/demo-map-000.glb`)

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
      <directionalLight position={[10, 10, 10]}></directionalLight>
      <EnvLightByImage imageURL={`${BASE_URL}image/sky.png`}></EnvLightByImage>

      {/* extras */}
      <StarSky></StarSky>
      <SimpleBloomer></SimpleBloomer>
    </group>
  )
}

export default App
```

# Blender Custom Properties

| Custom Properties | Feature / Function                                      |
| ----------------- | ------------------------------------------------------- |
| enableBloom = 1   | Make it Glow                                            |
| enableDarken = 1  | Make it Draken to prevent Glow overlaying               |
| isFloor = 1       | Make it as floor so that we can walk on staris          |
| isHoverable = 1   | Make it Hoverable by 3d Pointer                         |
| slot = image      | Make it customisable for user image (work in progress)  |
| slot = mesh       | Make it customisable for user object (work in progress) |

# Blender Demo File

[Blender Demo File](https://github.com/wonglok/effectnode-3dworld/tree/master/demo-files/demomap.blend)

# Blender GLTF Export Settings

![Export Blender GLTF](https://github.com/wonglok/effectnode-3dworld/blob/master/demo-screenshots/export-settings.png?raw=true)

## License

MIT © [wonglok](https://github.com/wonglok)
