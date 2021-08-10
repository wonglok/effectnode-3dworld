import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useMiniEngine } from '../utils/use-mini-engine'
import { CursorTrackerTail } from '../lib/CursorTrackerTail'

export function TailCursor({ Now }) {
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
