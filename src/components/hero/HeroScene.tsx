import { Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useInsertionEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Kid, {
  type KidBottom,
  type KidHair,
  type KidPose,
  type KidSkin,
  type KidUniform,
} from '../kit/Kid'
import { heroScrollProgress } from './heroScrollProgress'
import { useCanvasSizeGuard } from './useCanvasSizeGuard'

const NAVY = '#06182E'
const NILE_BLUE = '#0B4F7A'
const HULL_NAVY = '#0B2E4F'
const SAIL_SKY = '#3AA8DC'
const SAIL_DARK = '#0B1B2B'
const BRAND_RED = '#D7262E'
const KEY_LIGHT = '#EAF7FF'
const WARM_LIGHT = '#FFD9A0'
const AMBIENT_LIGHT = '#7FB6D8'

const WATER_SIZE = 160
const WATER_SEGMENTS_DESKTOP = 128
const WATER_SEGMENTS_COMPACT = 64
const WATER_LEVEL = -0.55

const CLOCK_DEPRECATION_PREFIX = 'THREE.Clock: This module has been deprecated'

let restoreClockWarningFilter: (() => void) | null = null

/**
 * three r186 warns from Clock's constructor, and @react-three/fiber 9.8 still
 * builds a THREE.Clock when it creates a canvas root (inside Canvas's layout
 * effect). three emits the notice through a dynamic console.warn lookup, so a
 * filter installed before that effect can drop it.
 *
 * Only strings that start with the exact Clock deprecation prefix are
 * discarded; every other warning is forwarded untouched. The filter is
 * installed by this component and restored by its cleanup, so it can never
 * outlive the Canvas it exists for.
 */
function installClockWarningFilter() {
  if (restoreClockWarningFilter) return

  const originalWarn = console.warn
  const filter = (...args: unknown[]) => {
    const [first] = args
    if (typeof first === 'string' && first.startsWith(CLOCK_DEPRECATION_PREFIX)) return
    originalWarn(...args)
  }

  console.warn = filter

  restoreClockWarningFilter = () => {
    // Undo only our own wrapper; another library may have wrapped it after us.
    if (console.warn === filter) console.warn = originalWarn
    restoreClockWarningFilter = null
  }
}

interface HeroSceneProps {
  reducedMotion: boolean
}

function createHullShape() {
  const shape = new THREE.Shape()
  // Counter-clockwise silhouette so the extruded hull faces outward.
  shape.moveTo(-0.92, -0.26)
  shape.lineTo(0.58, -0.26)
  shape.quadraticCurveTo(1.2, -0.2, 1.14, -0.04)
  shape.lineTo(1.28, 0.12)
  shape.quadraticCurveTo(1.24, 0.2, 0.95, 0.22)
  shape.lineTo(-1.1, 0.22)
  shape.quadraticCurveTo(-1.22, 0.06, -1.18, -0.04)
  shape.quadraticCurveTo(-1.12, -0.16, -0.92, -0.26)
  shape.closePath()
  return shape
}

function createMainSailShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0, 1.9)
  shape.quadraticCurveTo(-1.02, 1.08, -1.16, 0.1)
  shape.quadraticCurveTo(-0.6, -0.04, 0, 0)
  shape.closePath()
  return shape
}

function createJibShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0, 1.74)
  shape.quadraticCurveTo(0.98, 0.96, 1.12, 0.04)
  shape.quadraticCurveTo(0.54, -0.05, 0, 0)
  shape.closePath()
  return shape
}

const HULL_SHAPE = createHullShape()
const MAIN_SAIL_SHAPE = createMainSailShape()
const JIB_SHAPE = createJibShape()

const HULL_EXTRUDE_OPTIONS = {
  depth: 0.6,
  bevelEnabled: true,
  bevelSegments: 2,
  bevelSize: 0.05,
  bevelThickness: 0.05,
  steps: 1,
  curveSegments: 10,
}

function useCompactLayout() {
  const [compact, setCompact] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = window.matchMedia('(max-width: 767px)')
    const handleChange = () => setCompact(query.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return compact
}

function NileWater({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const segments = compact ? WATER_SEGMENTS_COMPACT : WATER_SEGMENTS_DESKTOP

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, segments, segments)
    const position = plane.getAttribute('position') as THREE.BufferAttribute
    position.setUsage(THREE.DynamicDrawUsage)
    return plane
  }, [segments])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state) => {
    const position = geometry.getAttribute('position') as THREE.BufferAttribute
    const time = state.clock.elapsedTime * (reducedMotion ? 0.35 : 1)
    const amplitude = reducedMotion ? 0.35 : 1

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index)
      const y = position.getY(index)
      const wave =
        Math.sin(x * 0.42 + time * 1.15) * 0.075 +
        Math.sin(x * 0.19 - y * 0.55 + time * 0.75) * 0.06 +
        Math.sin(y * 0.68 - x * 0.11 - time * 1.4) * 0.028

      position.setZ(index, wave * amplitude)
    }

    position.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <mesh geometry={geometry} position={[0, WATER_LEVEL, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={NILE_BLUE}
        emissive={NILE_BLUE}
        emissiveIntensity={0.18}
        metalness={0.2}
        roughness={0.34}
      />
    </mesh>
  )
}

interface CrewMember {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  skin: KidSkin
  hair: KidHair
  hairColor?: string
  hijabColor?: string
  uniform: KidUniform
  bottom: KidBottom
  pose: KidPose
  seed: number
}

/**
 * The crew stands on the near half of the deck (z 0.2-0.24) and clear of the
 * centreline mast/boom and the two thin sails at z -0.035 and +0.035, so no
 * head or shoulder can cut through them. x values avoid the mast at x 0.05.
 */
const CREW: readonly CrewMember[] = [
  {
    position: [-0.82, 0.26, 0.2],
    rotation: [0, 0.12, 0],
    scale: 0.6,
    skin: 'honey',
    hair: 'ponytail',
    uniform: 'sky',
    bottom: 'skirt',
    pose: 'wave',
    seed: 1,
  },
  {
    position: [-0.38, 0.26, 0.24],
    rotation: [0, -0.06, 0],
    scale: 0.56,
    skin: 'caramel',
    hair: 'short',
    uniform: 'white',
    bottom: 'trousers',
    pose: 'cheer',
    seed: 2,
  },
  {
    position: [0.42, 0.26, 0.2],
    rotation: [0, 0.08, 0],
    scale: 0.58,
    skin: 'amber',
    hair: 'curls',
    hairColor: '#3A2418',
    uniform: 'navy',
    bottom: 'trousers',
    pose: 'hold-book',
    seed: 3,
  },
  {
    position: [0.8, 0.26, 0.23],
    rotation: [0, -0.1, 0],
    scale: 0.54,
    skin: 'cocoa',
    hair: 'hijab',
    hijabColor: '#F3D3CE',
    uniform: 'sky',
    bottom: 'skirt',
    pose: 'idle',
    seed: 4,
  },
]

function Sailboat({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const boatRef = useRef<THREE.Group>(null)
  const baseY = -0.46

  useFrame((state, delta) => {
    const boat = boatRef.current
    if (!boat) return

    const time = state.clock.elapsedTime
    const idleAmount = reducedMotion ? 0.2 : 1
    const progress = reducedMotion ? 0.5 : heroScrollProgress.current
    const span = THREE.MathUtils.clamp(state.viewport.width * 0.24, 0.45, 2.05)
    const targetX = -span + progress * span * 2
    const step = Math.min(delta, 0.05)

    boat.position.x = THREE.MathUtils.damp(boat.position.x, targetX, 3.2, step)
    boat.position.y =
      baseY +
      Math.sin(time * 0.85) * 0.04 * idleAmount +
      Math.sin(time * 1.9 + 0.6) * 0.012 * idleAmount
    boat.position.z = THREE.MathUtils.damp(boat.position.z, 0.85 - progress * 0.5, 2.4, step)

    boat.rotation.z = Math.sin(time * 0.72 + 0.3) * 0.03 * idleAmount
    boat.rotation.x = Math.sin(time * 0.53 + 1.1) * 0.016 * idleAmount
    boat.rotation.y = -0.16 + Math.sin(time * 0.32) * 0.025 * idleAmount
  })

  return (
    <group
      ref={boatRef}
      position={[compact ? -0.5 : -1.4, baseY, 0.85]}
      scale={compact ? 0.42 : 0.58}
    >
      {/* Hull: extruded side silhouette with a flat, clean deck. */}
      <mesh position={[0, 0, -0.3]}>
        <extrudeGeometry args={[HULL_SHAPE, HULL_EXTRUDE_OPTIONS]} />
        <meshStandardMaterial color={HULL_NAVY} roughness={0.42} metalness={0.2} flatShading />
      </mesh>

      {/* Brand-red boot stripe just above the waterline. */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[2.16, 0.075, 0.74]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.4} metalness={0.08} />
      </mesh>

      {/* Mast and boom. */}
      <mesh position={[0.05, 1.22, 0]}>
        <cylinderGeometry args={[0.025, 0.038, 2.44, 8]} />
        <meshStandardMaterial color="#D9E6EE" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh position={[-0.5, 0.53, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 1.24, 6]} />
        <meshStandardMaterial color="#C9D9E4" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Main sail aft, jib forward: the two sails from the school logo. */}
      <mesh position={[0.05, 0.55, -0.035]}>
        <shapeGeometry args={[MAIN_SAIL_SHAPE, 10]} />
        <meshStandardMaterial color={SAIL_SKY} side={THREE.DoubleSide} roughness={0.55} metalness={0.02} />
      </mesh>
      <mesh position={[0.05, 0.62, 0.035]}>
        <shapeGeometry args={[JIB_SHAPE, 10]} />
        <meshStandardMaterial color={SAIL_DARK} side={THREE.DoubleSide} roughness={0.6} metalness={0.04} />
      </mesh>

      {/* The crew rides the boat group, so they bob and advance with it. */}
      {CREW.map((member) => (
        <Kid key={`${member.hair}-${member.seed}`} {...member} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}

export default function HeroScene({ reducedMotion }: HeroSceneProps) {
  const compact = useCompactLayout()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const sparkleScale: [number, number, number] = compact ? [6, 2.4, 2] : [12, 3.2, 2.5]

  useCanvasSizeGuard(wrapperRef)

  // The Canvas creates its THREE.Clock inside a layout effect, which runs
  // before this component's layout effects. Insertion effects are flushed
  // earlier in the same commit, so installing here covers the first Clock.
  useInsertionEffect(() => {
    installClockWarningFilter()
    return () => restoreClockWarningFilter?.()
  }, [])

  // Re-install after StrictMode's passive cleanup and always restore on unmount.
  useEffect(() => {
    installClockWarningFilter()
    return () => restoreClockWarningFilter?.()
  }, [])

  useEffect(() => {
    const element = wrapperRef.current
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
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.6, 7], fov: 42, near: 0.1, far: 160, rotation: [0, 0, 0] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView ? 'always' : 'never'}
      >
        <fog attach="fog" args={[NAVY, 18, 52]} />
        <ambientLight color={AMBIENT_LIGHT} intensity={0.65} />
        <directionalLight color={KEY_LIGHT} intensity={2.2} position={[4, 5, 4]} />
        <directionalLight color={WARM_LIGHT} intensity={1.9} position={[-5, 3, 5]} />

        <NileWater compact={compact} reducedMotion={reducedMotion} />
        <Sailboat compact={compact} reducedMotion={reducedMotion} />

        <Sparkles
          color="#BFE9FF"
          count={compact ? 16 : 40}
          noise={0.6}
          opacity={0.5}
          position={[0, 0.8, -0.8]}
          scale={sparkleScale}
          size={compact ? 1.2 : 1.6}
          speed={reducedMotion ? 0.06 : 0.22}
        />
      </Canvas>
    </div>
  )
}
