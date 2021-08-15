import { Mesh, MeshBasicMaterial, Raycaster, Vector2 } from 'three'
import { MeshBVH } from 'three-mesh-bvh'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

export class Collider {
  constructor({ floor, scene }) {
    this.floor = floor
    this.center = new Vector2(0, 0)
    this.raycaster = new Raycaster()
    this.scene = scene

    const collider = this.makeCollider()
    this.collider = collider
    this.preview = collider
  }

  makeCollider() {
    const { scene, floor } = this
    const environment = SkeletonUtils.clone(floor)

    const geometries = []

    environment.updateMatrixWorld()
    environment.traverse((c) => {
      if (c.geometry && !c.userData.isNotFloor) {
        const cloned = c.geometry.clone()
        cloned.applyMatrix4(c.matrixWorld)

        for (const key in cloned.attributes) {
          if (key === 'position' || key === 'index') {
          } else {
            cloned.deleteAttribute(key)
          }
        }

        geometries.push(cloned)
      }
    })

    scene.traverse((it) => {
      if (it && it.userData && it.userData.isFloor && it.geometry) {
        const cloned = it.geometry.clone()
        it.updateMatrixWorld()

        cloned.applyMatrix4(it.matrixWorld)
        for (const key in cloned.attributes) {
          if (key !== 'position') {
            cloned.deleteAttribute(key)
          }
        }
        geometries.push(cloned)
      }
    })

    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
      geometries,
      false
    )

    mergedGeometry.boundsTree = new MeshBVH(mergedGeometry)

    const collider = new Mesh(
      mergedGeometry,
      new MeshBasicMaterial({ color: 0xffffff })
    )
    collider.material.wireframe = true
    collider.material.opacity = 0.5
    collider.material.transparent = true
    collider.updateMatrixWorld()

    return collider
  }

  //
  scanCenter({ camera, scene }) {
    const { raycaster, center, collider } = this

    raycaster.setFromCamera(center, camera)
    const result = []
    const source = []
    scene.traverse((it) => {
      if (
        it.geometry &&
        (it?.userData?.isHoverable ||
          it?.userData?.isFloor ||
          it?.userData?.tooltip ||
          it?.userData?.website)
      ) {
        source.push(it)
      }
    })
    raycaster.intersectObjects(source, false, result)

    collider.geometry.boundsTree.raycastFirst(
      collider,
      raycaster,
      raycaster.ray
    )

    const first = result[0]

    if (first) {
      return first
    } else {
      return false
    }
  }
}
