import { Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'
import Kid from '../kit/Kid'
import { useCanvasSizeGuard } from '../hero/useCanvasSizeGuard'

const NAVY_DEEP = '#0B2E4F'
const NILE_BLUE = '#0B4F7A'
const SKY = '#3AA8DC'
const SKY_PALE = '#BFE9FF'
const KEY_LIGHT = '#EAF7FF'
const WARM_LIGHT = '#FFD9A0'
const AMBIENT_LIGHT = '#7FB6D8'
const LAND_GREEN = '#6E9E7A'
const GLOBE_Y = 1.38

interface AboutSceneProps {
  reducedMotion: boolean
}

interface LandPatch {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number, number]
}

const LAND_PATCHES: readonly LandPatch[] = [
  { position: [0.06, 0.09, 0.18], rotation: [0.15, 0.25, 0.35], size: [0.09, 0.03, 0.07] },
  { position: [-0.11, 0.05, 0.17], rotation: [-0.2, 0.6, 0.1], size: [0.075, 0.028, 0.09] },
  { position: [0.02, -0.09, 0.19], rotation: [0.45, 0.1, 0.2], size: [0.08, 0.026, 0.06] },
  { position: [-0.04, 0.16, 0.12], rotation: [-0.5, 0.3, 0.1], size: [0.06, 0.025, 0.05] },
  { position: [0.15, -0.02, 0.13], rotation: [0.1, -0.5, 0.3], size: [0.055, 0.025, 0.07] },
]

function LearningPlatform() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.95, 0.82, 0.12, 40]} />
        <meshStandardMaterial color={NAVY_DEEP} roughness={0.55} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.122, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.86, 0.94, 48]} />
        <meshStandardMaterial
          color={SKY}
          emissive={SKY}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Low seat under the reader. */}
      <mesh position={[-0.35, 0.23, 0.1]}>
        <cylinderGeometry args={[0.3, 0.34, 0.22, 28]} />
        <meshStandardMaterial color={NAVY_DEEP} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[-0.35, 0.345, 0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.012, 28]} />
        <meshStandardMaterial
          color={SKY_PALE}
          emissive={SKY}
          emissiveIntensity={0.16}
          roughness={0.45}
        />
      </mesh>
    </group>
  )
}

function FloatingGlobe({ reducedMotion }: AboutSceneProps) {
  const globeRef = useRef<Group>(null)
  const timeRef = useRef(0)

  useFrame((_state, delta) => {
    const globe = globeRef.current
    if (!globe) return

    timeRef.current += Math.min(delta, 0.05) * (reducedMotion ? 0.06 : 1)
    const time = timeRef.current

    globe.rotation.y = time * 0.22
    globe.rotation.x = Math.sin(time * 0.4) * 0.06
    globe.position.y = GLOBE_Y + Math.sin(time * 0.55) * 0.025
  })

  return (
    <group ref={globeRef} position={[0.82, GLOBE_Y, -0.28]}>
      <mesh>
        <icosahedronGeometry args={[0.21, 2]} />
        <meshStandardMaterial
          color={NILE_BLUE}
          roughness={0.45}
          metalness={0.18}
          flatShading
        />
      </mesh>

      {LAND_PATCHES.map((patch) => (
        <mesh key={patch.position.join(':')} position={patch.position} rotation={patch.rotation}>
          <boxGeometry args={patch.size} />
          <meshStandardMaterial color={LAND_GREEN} roughness={0.7} flatShading />
        </mesh>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.235, 0.0035, 6, 48]} />
        <meshBasicMaterial color={SKY_PALE} transparent opacity={0.45} depthWrite={false} />
      </mesh>
      <mesh rotation={[1.1, 0.4, 0.2]}>
        <torusGeometry args={[0.24, 0.0028, 6, 48]} />
        <meshBasicMaterial color={SKY_PALE} transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </group>
  )
}

function LearningScene({ reducedMotion }: AboutSceneProps) {
  return (
    <group>
      <ambientLight color={AMBIENT_LIGHT} intensity={0.75} />
      <directionalLight color={KEY_LIGHT} intensity={2.1} position={[3.2, 4.2, 3.4]} />
      <directionalLight color={WARM_LIGHT} intensity={1.7} position={[-3.4, 2.4, 3.8]} />

      <LearningPlatform />

      <Kid
        bottom="skirt"
        hair="hijab"
        hijabColor="#D8C6EA"
        pose="hold-book"
        position={[-0.35, 0.03, 0.12]}
        reducedMotion={reducedMotion}
        rotation={[0, 0.25, 0]}
        scale={0.98}
        seed={5}
        sitting
        skin="honey"
        uniform="sky"
      />
      <Kid
        bottom="skirt"
        hair="bob"
        hairColor="#3A2418"
        pose="wave"
        position={[0.52, 0.12, 0.04]}
        reducedMotion={reducedMotion}
        rotation={[0, -0.3, 0]}
        scale={0.94}
        seed={6}
        skin="amber"
        uniform="white"
      />

      <FloatingGlobe reducedMotion={reducedMotion} />

      <Sparkles
        color={SKY_PALE}
        count={16}
        noise={0.5}
        opacity={0.55}
        position={[0.1, 0.9, 0.1]}
        scale={[2.1, 1.6, 1.1]}
        size={0.5}
        speed={reducedMotion ? 0.05 : 0.2}
      />
    </group>
  )
}

export default function AboutScene({ reducedMotion }: AboutSceneProps) {
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
      { rootMargin: '160px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1.12, 3.85], fov: 35, near: 0.1, far: 40 }}
        dpr={[1, 1.75]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => camera.lookAt(0, 0.78, 0)}
        style={{ width: '100%', height: '100%' }}
      >
        <LearningScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}

