import { useEffect, useRef } from 'react'

import { useFrame } from '@react-three/fiber'
import {
  Color,
  Layers,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  ShaderMaterial,
  sRGBEncoding,
  Vector2,
  WebGLRenderTarget
} from 'three'
import { useMiniEngine } from '../utils/use-mini-engine'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'

export const ENTIRE_SCENE = 0
export const BLOOM_SCENE = 1
export const DARK_SCENE = 2

export const enableBloom = (item) => {
  item.layers.enable(BLOOM_SCENE)
}

export const enableDarken = (item) => {
  item.layers.enable(DARK_SCENE)
}

export class BloomLayer {
  constructor({ mini }) {
    let { get } = mini.now

    let reducedRes = 0.75
    let resBloom = new Vector2()
    resBloom.copy({
      x: get().gl.domElement.width,
      y: get().gl.domElement.height
    })
    resBloom.multiplyScalar(reducedRes)

    let EffectComposer =
      require('three/examples/jsm/postprocessing/EffectComposer').EffectComposer
    let RenderPass =
      require('three/examples/jsm/postprocessing/RenderPass').RenderPass
    let UnrealBloomPass =
      require('three/examples/jsm/postprocessing/UnrealBloomPass').UnrealBloomPass

    let efComposer = new EffectComposer(get().gl)
    mini.onResize(() => {
      efComposer.setPixelRatio(get().gl.getPixelRatio() * reducedRes)
    })

    let renderPass = new RenderPass(get().scene, get().camera)
    mini.onResize(() => {
      resBloom.copy({
        x: get().gl.domElement.width,
        y: get().gl.domElement.height
      })
      resBloom.multiplyScalar(reducedRes)
      renderPass.setSize(resBloom.x, resBloom.y)
    })
    efComposer.addPass(renderPass)

    let unrealPass = new UnrealBloomPass(resBloom, 2, 1, 0.1)
    mini.onResize(() => {
      resBloom.copy({
        x: get().gl.domElement.width,
        y: get().gl.domElement.height
      })
      resBloom.multiplyScalar(reducedRes)
      unrealPass.setSize(resBloom.x, resBloom.y)
    })

    efComposer.addPass(unrealPass)
    efComposer.renderToScreen = false

    let dark = new Color('#000000')
    // let darkMat = new MeshBasicMaterial({ color: 0x000000, skinning: true })
    let baseLayer = new Layers()
    baseLayer.disableAll()
    baseLayer.enable(ENTIRE_SCENE)

    let bloomLayer = new Layers()
    bloomLayer.disableAll()
    bloomLayer.enable(BLOOM_SCENE)
    let darkLayer = new Layers()
    darkLayer.disableAll()
    darkLayer.enable(DARK_SCENE)

    let onBeforeCompileForStdMat = (globalDarkening) => (shader) => {
      shader.uniforms.globalDarkening = globalDarkening
      let atBegin = `
        uniform bool globalDarkening;

      `
      let atEnd = `
        if (globalDarkening) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `

      shader.fragmentShader = `${atBegin.trim()}\n${shader.fragmentShader}`
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `#include <dithering_fragment>\n${atEnd.trim()}`
      )
    }

    let setup = () => {
      let { scene } = get()
      scene.traverse((it) => {})
    }

    let enableDarkenMap = new Map()

    let darken = (it) => {
      //

      // if (!it.text) {
      //   it.material = darkMat
      //   darkMat.needsUpdate = true
      // }
      // darkMat.needsUpdate = true;

      if (!enableDarkenMap.has(it.uuid)) {
        if (
          it.material &&
          (it.material instanceof MeshStandardMaterial ||
            it.material instanceof MeshPhongMaterial ||
            it.material instanceof MeshBasicMaterial ||
            it.material instanceof MeshLambertMaterial ||
            it.material instanceof MeshMatcapMaterial ||
            it.material instanceof MeshPhysicalMaterial ||
            it.material instanceof MeshToonMaterial)
        ) {
          let str = it.material.onBeforeCompile.toString()
          if (str !== onBeforeCompileForStdMat.toString()) {
            let globalDarkening = { value: false }
            it.userData.globalDarkening = globalDarkening

            enableDarkenMap.set(it.uuid, globalDarkening)

            it.material.onBeforeCompile =
              onBeforeCompileForStdMat(globalDarkening)
            it.material.needsUpdate = true
          }
        }
      }

      if (enableDarkenMap.has(it.uuid)) {
        enableDarkenMap.get(it.uuid).value = true
      }
    }

    let setBloomSceneMat = () => {
      let { scene } = get()
      scene.traverse((it) => {
        if (it?.userData?.discard) {
          it.visible = false
        }

        if (it.material) {
          if (it?.userData?.enableDarken) {
            darken(it)
          } else if (it?.userData?.enableBloom) {
          } else if (darkLayer.test(it.layers) || !bloomLayer.test(it.layers)) {
            darken(it)
          } else {
          }
        }
      })
    }

    let renderToTexture = () => {
      let { scene, clock } = get()
      let dt = clock.getDelta()
      let origBG = scene.background
      scene.background = dark
      efComposer.render(dt)
      scene.background = origBG
    }

    let restore = () => {
      let { scene } = get()

      scene.traverse((it) => {
        if (enableDarkenMap.has(it.uuid)) {
          enableDarkenMap.get(it.uuid).value = false
        }

        if (it?.userData?.discard) {
          it.visible = true
        }
      })
    }

    this.renderTexture = () => {
      let { gl } = get()
      gl.shadowMap.enabled = false

      // bloom with occulsion image
      setup()
      setBloomSceneMat()
      renderToTexture()
      restore()

      gl.shadowMap.enabled = true
    }
    this.getTex = () => {
      return efComposer.readBuffer.texture
    }
  }
}

export class BaseLayer {
  constructor({ mini }) {
    let { size, gl, get } = mini.now

    let resBase = new Vector2()

    resBase.copy({ x: size.width, y: size.height })
    resBase.multiplyScalar(gl.getPixelRatio())

    this.rtt = new WebGLRenderTarget(resBase.width, resBase.height, {
      encoding: sRGBEncoding,
      generateMipmaps: false
    })
    mini.onClean(() => {
      this.rtt.dispose()
    })
    mini.onResize(() => {
      resBase.copy({
        x: get().gl.domElement.width,
        y: get().gl.domElement.height
      })
      resBase.multiplyScalar(gl.getPixelRatio())

      this.rtt = new WebGLRenderTarget(resBase.width, resBase.height, {
        encoding: sRGBEncoding,
        generateMipmaps: false
      })
    })

    this.renderTexture = () => {
      let { gl, camera, scene } = get()

      // base image
      let orig = gl.getRenderTarget()
      gl.setRenderTarget(this.rtt)
      gl.render(scene, camera)
      gl.setRenderTarget(orig)
    }

    this.getTex = () => {
      return this.rtt.texture
    }
  }
}
export class Compositor {
  constructor({ mini }) {
    //
    let quadMat = new ShaderMaterial({
      //
      uniforms: {
        bloomDiffuse: { value: null },
        baseDiffuse: { value: null }
      },

      //
      vertexShader: `
        varying vec2 vUv;
        void main (void) {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,

      fragmentShader: `
        uniform sampler2D baseDiffuse;
        uniform sampler2D bloomDiffuse;

        varying vec2 vUv;
          void main (void) {
            vec4 baseDiffuseColor = texture2D(baseDiffuse, vUv);
            vec4 bloomDiffuseColor = texture2D(bloomDiffuse, vUv);

            gl_FragColor = vec4(baseDiffuseColor.rgb * 1.0,  baseDiffuseColor.a);

            gl_FragColor.r += 0.45 * pow(bloomDiffuseColor.r, 0.75);
            gl_FragColor.g += 0.45 * pow(bloomDiffuseColor.g, 0.75);
            gl_FragColor.b += 0.45 * pow(bloomDiffuseColor.b, 0.75);
          }
        `
    })

    let fsQuad = new FullScreenQuad(quadMat)

    this.render = ({ baseTex, bloomTex }) => {
      let { gl } = mini.now
      if (gl) {
        quadMat.uniforms.bloomDiffuse.value = bloomTex
        quadMat.uniforms.baseDiffuse.value = baseTex
        fsQuad.render(gl)
      }
    }
  }
}

export function SimpleBloomer() {
  let { mini } = useMiniEngine()

  let looer = useRef(() => {})

  useEffect(() => {
    mini.ready.get.then(() => {
      //
      let base = new BaseLayer({ mini })
      let bloom = new BloomLayer({ mini })
      let compositor = new Compositor({ mini })

      //
      looer.current = () => {
        base.renderTexture()
        bloom.renderTexture()

        compositor.render({
          baseTex: base.getTex(),
          bloomTex: bloom.getTex()
        })
      }
    })
  }, [])

  // invalidate orignal loop
  useFrame(() => {
    looer.current()
  }, 1000)

  return null
}
