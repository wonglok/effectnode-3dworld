import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Camera, MathUtils, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { applyAutoEvent, useAutoEvent } from '../utils/use-auto-event'
import { useMiniEngine } from '../utils/use-mini-engine'
import { CursorTrackerTail } from '../lib/CursorTrackerTail'
import { PerspectiveCamera } from '@react-three/drei'

export function UserContorls({ Now, avatarSpeed = 2, higherCamera = 1.5 }) {
  let { get, gl } = useThree()
  let works = useRef({
    //
  })

  useAutoEvent(
    `touchstart`,
    (ev) => {
      ev.preventDefault()
    },
    { passive: false }
  )

  useAutoEvent(
    `touchmove`,
    (ev) => {
      ev.preventDefault()
    },
    { passive: false }
  )

  useAutoEvent(
    `touchend`,
    (ev) => {
      ev.preventDefault()
    },
    { passive: false }
  )

  useEffect(() => {
    let orig = Now.camMode
    Now.camMode = 'first'
    Now.avatarSpeed = avatarSpeed
    return () => {
      Now.avatarSpeed = 1
      Now.camMode = orig
    }
  })
  //
  useAutoEvent('keydown', (ev) => {
    // console.log(ev.key);

    if (ev.key === 'w') {
      Now.keyW = true
    }
    if (ev.key === 'a') {
      Now.keyA = true
    }
    if (ev.key === 's') {
      Now.keyS = true
    }
    if (ev.key === 'd') {
      Now.keyD = true
    }
  })
  useAutoEvent('keyup', (ev) => {
    // console.log(ev.key);

    if (ev.key === 'w') {
      Now.keyW = false
    }
    if (ev.key === 'a') {
      Now.keyA = false
    }
    if (ev.key === 's') {
      Now.keyS = false
    }
    if (ev.key === 'd') {
      Now.keyD = false
    }
  })

  useEffect(() => {
    let camera = get().camera
    camera.near = 0.1
    camera.far = 10000
    camera.fov = 45
    camera.updateProjectionMatrix()

    let fakeCam = new Camera()
    fakeCam.position.z = 5
    let orbit = new OrbitControls(fakeCam, gl.domElement)
    orbit.enableRotate = true
    orbit.enablePan = false
    orbit.enableZoom = false

    orbit.enableDamping = true
    orbit.rotateSpeed = 0.5

    let joystick = document.createElement('div')

    document.body.appendChild(joystick)
    joystick.style.cssText = `
      position: absolute;
      bottom: 30px;
      left: 30px;
      width: 80px;
      height: 80px;
      color: white;
      user-select: none;
      z-index: 20;
    `

    let note = document.createElement('div')
    document.body.appendChild(note)
    note.style.cssText = `
      position: absolute;
      bottom: 50px;
      left: 50px;
      width: 80px;
      height: 80px;
      color: white;
      user-select: none;
      z-index: 10;
      text-align: center;
      opacity: 0.4;
    `
    note.innerHTML = `Walk Around JoyStick`

    let nipplejs = require('nipplejs')
    var manager = nipplejs.create({
      zone: joystick,
      color: 'white',
      mode: 'static',
      position: { left: '60px', bottom: '60px' }
    })

    let forward = new Vector3(0, 0, 0)
    let up = new Vector3(0, 1, 0)

    let ttt = 0
    let isUsing = false
    let nippleAngle = 0

    // window.addEventListener('touchstart', () => {
    //   isDown = true
    // })
    // window.addEventListener('touchend', () => {
    //   isDown = false
    // })

    manager.on('start move dir plain', function (evt, nipple) {
      if (nipple?.angle?.radian) {
        nippleAngle = nipple?.angle?.radian
        orbit.enableRotate = false

        isUsing = true
        // Now.isDown = true;

        clearTimeout(ttt)
        ttt = setTimeout(() => {
          isUsing = false
        }, 100)
      }
    })

    manager.on('end', () => {
      nippleAngle = 0
      works.current.endForward = () => {
        forward.multiplyScalar(0.8)
      }
      // Now.isDown = false;
      orbit.enableRotate = true
      isUsing = false
    })

    let cte = applyAutoEvent(
      gl.domElement.parentElement,
      `touchend`,
      (ev) => {
        if (!isUsing) {
          orbit.enableRotate = true
        }
      },
      { passive: false }
    )
    let cts = applyAutoEvent(
      gl.domElement.parentElement,
      `touchstart`,
      (ev) => {
        if (!isUsing) {
          orbit.enableRotate = true
        }
      },
      { passive: false }
    )

    let keyBoardForward = new Vector3(0, 0, 1)
    let scaler = 0.3

    works.current.ctrl2 = () => {
      if (isUsing) {
        forward.set(0, 0, -1)
        forward.applyAxisAngle(
          up,
          orbit.getAzimuthalAngle() + nippleAngle - Math.PI * 0.5 || 0.0
        )
      }
      //
      if (Now.keyW || Now.keyA || Now.keyS || Now.keyD) {
        scaler = MathUtils.lerp(scaler, 0.3, 0.1)
      } else {
        scaler = MathUtils.lerp(scaler, 0.0, 0.1)
      }

      // controls.getDirection(dir);
      if (Now.keyW) {
        keyBoardForward.set(0, 0, -1 * scaler)
        keyBoardForward.applyEuler(camera.rotation)
        keyBoardForward.y = 0.0
        Now.avatarAt.add(keyBoardForward).multiplyScalar(1)
      } else if (Now.keyA) {
        keyBoardForward.set(-1 * scaler, 0, 0)
        keyBoardForward.applyEuler(camera.rotation)
        keyBoardForward.y = 0.0

        Now.avatarAt.add(keyBoardForward).multiplyScalar(1)
      } else if (Now.keyS) {
        keyBoardForward.set(0, 0, 1 * scaler)
        keyBoardForward.applyEuler(camera.rotation)
        keyBoardForward.y = 0.0

        Now.avatarAt.add(keyBoardForward).multiplyScalar(1)
      } else if (Now.keyD) {
        keyBoardForward.set(1 * scaler, 0, 0)
        keyBoardForward.applyEuler(camera.rotation)
        keyBoardForward.y = 0.0

        Now.avatarAt.add(keyBoardForward).multiplyScalar(1)
      }

      Now.goingTo.copy(Now.avatarAt)
      // if (!(Now.keyW || Now.keyA || Now.keyS || Now.keyD)) {
      //   Now.avatarAt.copy(Now.avatarAt);
      // }
    }

    // grid of raycaster

    works.current.ctrl3 = () => {
      let newType = 'floor'

      // let upness = Now.cursorNormal.y || 0;
      if (Now.cursorType !== newType) {
        Now.cursorType = newType
      }
    }

    works.current.ctrl = () => {
      orbit.update()

      Now.goingTo.add(forward)

      camera.position.x = Now.avatarAt.x
      camera.position.y = Now.avatarAt.y + higherCamera
      camera.position.z = Now.avatarAt.z

      camera.rotation.copy(fakeCam.rotation)
    }

    Now.enableFloorCursor = false
    return () => {
      Now.enableFloorCursor = true
      manager.off('start move end dir plain')
      manager.destroy()
      document.body.removeChild(joystick)

      joystick.remove()
      note.remove()
      cte()
      cts()
    }
  }, [])

  useFrame(() => {
    Object.values(works.current).forEach((e) => e())
  })
  return (
    <group>
      {/*  */}
      {/*  */}
      <PerspectiveCamera
        fov={45}
        near={0.1}
        far={10000}
        position={[0, 20, 20]}
        rotation-x={Math.PI * -0.25}
        makeDefault
      />
    </group>
  )
}

export function TailCursor({ Now }) {
  // let { get } = useThree();
  let { mini } = useMiniEngine()
  let cursor = useRef()

  useEffect(() => {
    let mouse = cursor.current
    console.log(123)
    if (mouse) {
      mini.ready.scene.then((scene) => {
        return new CursorTrackerTail({ mini, cursor: mouse, mounter: scene })
      })
    }
  }, [])

  // let time = 0
  useFrame((st, dt) => {
    // time += dt
    if (cursor.current) {
      let mouse = cursor.current

      mouse.position.lerp(Now.cursorPos, 0.4)

      // mouse.scale.setScalar(0.15);

      // mouse.lookAt(
      //   Now.cursorPos.x + Now.cursorNormal.x,
      //   Now.cursorPos.y + Now.cursorNormal.y,
      //   Now.cursorPos.z + Now.cursorNormal.z
      // );

      mouse.lookAt(st.camera.position)
    }
  })
  //

  return <group ref={cursor}>{/*  */}</group>
}
/* <HoverDisplay></HoverDisplay> */

// function HoverDisplay({}) {
//   let { get } = useThree()
//   Now.makeKeyReactive('hoverData')

//   let ref = useRef()

//   useFrame(({ camera }) => {
//     if (ref.current) {
//       ref.current.lookAt(camera.position)
//     }
//   })

//   useEffect(() => {
//     let { scene, camera } = get()
//     scene.add(camera)
//     return () => {
//       scene.remove(camera)
//     }
//   })

//   return (
//     <>
//       <group position={[0, 0, 10]} ref={ref}></group>

//       {Now.hoverData?.hoverText &&
//         createPortal(
//           <group position={[0.1, -0.1, -get().viewport.distance]}>
//             <Text
//               outlineWidth={0.00333}
//               anchorX={'left'}
//               font={`/font/Cronos-Pro-Light_12448.ttf`}
//               anchorY={'top'}
//             >
//               {`  > ${Now.hoverData?.hoverText || '  '} < `}
//             </Text>
//           </group>,
//           get().camera
//         )}
//     </>
//   )
// }

// function Floating({ offset = 0, children }) {
//   let ref = useRef()

//   let time = 0
//   useFrame((st, dt) => {
//     time += dt * 2.0
//     if (ref.current) {
//       ref.current.position.x = -0.5 + 1.5 * Math.sin(time + offset)
//     }
//   })

//   return <group ref={ref}>{children}</group>
// }
