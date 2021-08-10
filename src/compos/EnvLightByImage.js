import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import { PMREMGenerator, sRGBEncoding, TextureLoader } from 'three'

export function EnvLightByImage({ imageURL }) {
  //
  let { scene, gl } = useThree()
  useEffect(() => {
    const pmremGenerator = new PMREMGenerator(gl)
    pmremGenerator.compileEquirectangularShader()

    let loader = new TextureLoader()
    // loader.setDataType(UnsignedByteType);
    loader.load(imageURL, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      envMap.encoding = sRGBEncoding
      // scene.background = envMap;
      scene.environment = envMap
    })

    return () => {
      scene.environment = null
      scene.background = null
    }
  }, [imageURL])

  return null
}
