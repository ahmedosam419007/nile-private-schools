import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import Kid, {
  type KidBottom,
  type KidHair,
  type KidPose,
  type KidSkin,
  type KidUniform,
} from '../kit/Kid'
import { useCanvasSizeGuard } from '../hero/useCanvasSizeGuard'

interface StageCharacter {
  pose: KidPose
  skin: KidSkin
  hair: KidHair
  hairColor?: string
  hijabColor?: string
  uniform: KidUniform
  bottom: KidBottom
  seed: number
}

interface StagesKidSceneProps {
  character: StageCharacter
  reducedMotion: boolean
}

const KEY_LIGHT = '#EAF7FF'
const WARM_LIGHT = '#FFD9A0'
const AMBIENT_LIGHT = '#7FB6D8'
const SKY_PALE = '#BFE9FF'
const GOLD = '#C9A24A'

function StagePortrait({ character, reducedMotion }: StagesKidSceneProps) {
  return (
    <group>
      <ambientLight color={AMBIENT_LIGHT} intensity={0.9} />
      <directionalLight color={KEY_LIGHT} intensity={2.1} position={[2.4, 3.4, 3]} />
      <directionalLight color={WARM_LIGHT} intensity={1.5} position={[-2.6, 2.1, 2.6]} />

      {/* Halo rings behind the child keep the transparent canvas feeling framed. */}
      <mesh position={[0, 0.62, -0.8]}>
        <ringGeometry args={[0.55, 0.556, 64]} />
        <meshBasicMaterial color={SKY_PALE} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.62, -0.82]}>
        <ringGeometry args={[0.74, 0.743, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.365, 56]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.45} depthWrite={false} />
      </mesh>

      <Kid
        bottom={character.bottom}
        hair={character.hair}
        hairColor={character.hairColor}
        hijabColor={character.hijabColor}
        pose={character.pose}
        position={[0, -0.04, 0]}
        reducedMotion={reducedMotion}
        scale={0.95}
        seed={character.seed}
        skin={character.skin}
        uniform={character.uniform}
      />
    </group>
  )
}

/**
 * A single small 3D portrait for the active stage card. Only the active slide
 * mounts this component, keeping the page at three WebGL contexts at most.
 */
export default function StagesKidScene({ character, reducedMotion }: StagesKidSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useCanvasSizeGuard(hostRef)

  useEffect(() => {
    const element = hostRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.9, 2.3], fov: 32, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => camera.lookAt(0, 0.56, 0)}
        style={{ width: '100%', height: '100%' }}
      >
        <StagePortrait character={character} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
