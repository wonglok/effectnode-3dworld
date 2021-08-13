import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo, useEffect, useRef, useState } from 'react'
import { Collider } from '../lib/Collider'
import { useMiniEngine } from '../utils/use-mini-engine'
import { makeNow } from '../utils/make-now'
import { MapPlayer } from '../lib/MapPlayer'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'
import { PCFSoftShadowMap, PointLight } from 'three'

export const Map3D = ({ children, object }) => {
  const { get } = useThree()
  const nowRef = useRef()

  const { mini } = useMiniEngine()
  const colliderRef = useRef()
  const mapPlayerRef = useRef()

  const [floor, setFloor] = useState(false)

  useEffect(() => {
    let { gl } = get()

    gl.shadowMap.enabled = true
    gl.shadowMap.type = PCFSoftShadowMap
    //
    return () => {}
  }, [])

  let handleLights = (floor) => {
    let { gl } = get()

    gl.physicallyCorrectLights = true

    floor.traverse((it) => {
      //
      if (it?.userData?.castShadow) {
        it.castShadow = true
        it.traverse((sub) => {
          sub.castShadow = true
        })
      }
      //
      if (it?.userData?.receiveShadow) {
        it.receiveShadow = true
        it.traverse((sub) => {
          sub.receiveShadow = true
        })
      }
    })

    floor.traverse((it) => {
      if (it instanceof PointLight && it.castShadow) {
        it.shadow.mapSize.width = 512
        it.shadow.mapSize.height = 512
        it.shadow.camera.near = 0.5
        it.shadow.camera.far = 500
      }
    })

    return () => {
      gl.physicallyCorrectLights = false
    }
  }

  useEffect(() => {
    //
    const Now = (nowRef.current = makeNow())

    let floor = SkeletonUtils.clone(object)
    floor.traverse((it) => {
      if (it) {
        if (it.userData.startAt) {
          it.getWorldPosition(Now.startAt)
        }

        if (it.userData.startLookAt) {
          it.getWorldPosition(Now.startLookAt)
        }

        if (it.geometry) {
          it.userData.isFloor = true
          it.material.writeDepth = true
        }
      }
    })

    let cleanPhysical = handleLights(floor)
    setFloor(floor)

    const colliderManager = (colliderRef.current = new Collider({
      floor,
      scene: get().scene
    }))

    const mapPlayer = (mapPlayerRef.current = new MapPlayer({
      collider: colliderManager.collider,
      startAt: Now.startAt,
      Now
    }))

    let lastScan = false
    mini.onLoop(() => {
      //
      const { camera, scene } = get()
      const hit = colliderManager.scanCenter({ camera, scene })

      if (hit) {
        Now.cursorPos.copy(hit.point)
        Now.cursorNormal.copy(hit.face.normal)
      }

      // lighup
      if (hit) {
        if (lastScan) {
          lastScan.userData.enableBloom = false
        }
        if (hit.object.userData.website || hit.object.userData.tooltip) {
          hit.object.userData.enableBloom = true
          lastScan = hit.object
        }
      } else {
        if (lastScan) {
          lastScan.userData.enableBloom = false
        }
      }

      if (hit) {
        if (Now.hoverData !== hit.object.userData) {
          Now.hoverData = hit.object.userData || null
        }
        if (Now.tooltip !== hit.object.userData?.tooltip) {
          Now.tooltip = hit.object.userData.tooltip
        }
      } else {
        if (Now.hoverData !== null) {
          Now.hoverData = null
        }
        if (Now.tooltip !== '') {
          Now.tooltip = ''
        }
      }

      mapPlayer.onSimulate()
    })

    return () => {
      cleanPhysical()
      mini.clean()
    }
  }, [])

  return (
    <group>
      {floor && <primitive object={floor}></primitive>}

      {nowRef.current &&
        typeof children === 'function' &&
        children({ Now: nowRef.current })}
    </group>
  )
}

//

//
