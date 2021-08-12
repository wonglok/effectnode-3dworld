import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Collider } from '../lib/Collider'
import { useMiniEngine } from '../utils/use-mini-engine'
import { makeNow } from '../utils/make-now'
import { MapPlayer } from '../lib/MapPlayer'

export const Map3D = ({ children, floor, startAt }) => {
  const { get } = useThree()
  //
  //
  const { mini } = useMiniEngine()
  const colliderRef = useRef()
  const nowRef = useRef()
  const mapPlayerRef = useRef()
  useEffect(() => {
    floor.traverse((it) => {
      if (it.geometry) {
        it.userData.isFloor = true
      }
    })

    //
    const colliderManager = (colliderRef.current = new Collider({
      floor,
      scene: get().scene
    }))

    const Now = (nowRef.current = makeNow())

    const mapPlayer = (mapPlayerRef.current = new MapPlayer({
      collider: colliderManager.collider,
      startAt,
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
        if (hit.object.userData.website || hit.object.userData.tooltip) {
          if (lastScan) {
            lastScan.userData.enableBloom = false
          }
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
      mini.clean()
    }
  }, [])

  //

  //
  //
  return (
    <group>
      <primitive object={floor}>
        {/*  */}
        {/*  */}
      </primitive>
      {nowRef.current &&
        typeof children === 'function' &&
        children({ Now: nowRef.current })}

      {/*  */}
      {/*  */}
    </group>
  )
}
