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
import React, { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useTexture } from '@react-three/drei'
import {
  Map3D,
  UserContorls,
  TailCursor,
  SimpleBloomer,
  StarSky,
  TheHelper,
  useComputeEnvMap
} from 'effectnode-3dworld'

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

      {/* Optional */}
      <ShaderEnvLight imageURL={`${BASE_URL}image/sky.png`}></ShaderEnvLight>

      {/* Optional */}
      <StarSky></StarSky>
    </group>
  )
}

function ShaderEnvLight({ imageURL }) {
  let tex = useTexture(imageURL)
  let { get } = useThree()
  let envMap = useComputeEnvMap(
    /* glsl */ `
      const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

      float noise( in vec2 p ) {
        return sin(p.x)*sin(p.y);
      }

      float fbm4( vec2 p ) {
          float f = 0.0;
          f += 0.5000 * noise( p ); p = m * p * 2.02;
          f += 0.2500 * noise( p ); p = m * p * 2.03;
          f += 0.1250 * noise( p ); p = m * p * 2.01;
          f += 0.0625 * noise( p );
          return f / 0.9375;
      }

      float fbm6( vec2 p ) {
          float f = 0.0;
          f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
          f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
          f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
          f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
          f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
          f += 0.015625*(0.5 + 0.5 * noise( p ));
          return f/0.96875;
      }

      float pattern (vec2 p) {
        float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
        return abs(vout);
      }

      uniform sampler2D textureBG;

      vec4 mainImage (vec2 uv) {
        vec4 bg = texture2D(textureBG, uv);

        vec3 rainbow = vec3(
          0.35 + pattern(uv * 1.70123 + -0.17 * cos(time * 0.05)),
          0.35 + pattern(uv * 1.70123 +  0.0 * cos(time * 0.05)),
          0.35 + pattern(uv * 1.70123 +  0.17 * cos(time * 0.05))
        );

        return vec4(rainbow.xyz, 1.0);
      }
  `.trim(),
    {
      textureBG: { value: tex }
    },
    128
  )

  useEffect(() => {
    let { scene } = get()
    scene.environment = envMap
    return () => {
      scene.environment = null
    }
  }, [envMap, get])

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
```

## Blender Custom Properties

| Custom Properties      | Feature / Function                               |
| ---------------------- | ------------------------------------------------ |
| startAt = 1            | Make its world position as starting point of map |
| enableBloom = 1        | Make it Glow                                     |
| enableDarken = 1       | Make it Draken to prevent Glow overlaying        |
| isFloor = 1            | Make it as floor so that we can walk on staris   |
| isHoverable = 1        | Make it Hoverable by 3d Pointer                  |
| website = wonglok.com  | Open website iframe                              |
| tooltip = "My Name"    | Display Tooltip when hovered                     |
| hoverColor = "#ff0000" | Hover color for tail                             |

## Blender Demo File

[Blender Demo File](https://github.com/wonglok/effectnode-3dworld/tree/master/demo-files/demomap.blend)

## Blender GLTF Export Settings

![Export Blender GLTF](https://github.com/wonglok/effectnode-3dworld/blob/master/demo-screenshots/export-settings.png?raw=true)

## License

MIT © [wonglok](https://github.com/wonglok)
