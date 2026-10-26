import * as THREE from 'three'
import { useKidMotion } from './useKidMotion'

const HEAD_RADIUS = 0.21
const HEAD_Y = 0.8
const BRAND_RED = '#D7262E'
const NAVY = '#0B2E4F'
const SHOE = '#111A24'
const SOCK = '#F5F1E8'
const EYE = '#14202B'
const CHEEK = '#F0A39C'
const MOUTH = '#6B3429'
const DEFAULT_HAIR = '#241814'

export type KidSkin = 'porcelain' | 'honey' | 'amber' | 'caramel' | 'cocoa'
export type KidHair = 'short' | 'bob' | 'ponytail' | 'curls' | 'hijab'
export type KidPose = 'wave' | 'hold-book' | 'cheer' | 'idle'
export type KidUniform = 'sky' | 'navy' | 'white'
export type KidBottom = 'trousers' | 'skirt'

export interface KidProps {
  skin?: KidSkin
  hair?: KidHair
  hairColor?: string
  hijabColor?: string
  uniform?: KidUniform
  bottom?: KidBottom
  pose?: KidPose
  /** Bends the legs so the kid can sit on a ledge, seat or platform. */
  sitting?: boolean
  reducedMotion?: boolean
  seed?: number
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

const SKIN_TONES: Record<KidSkin, string> = {
  porcelain: '#F4D2B8',
  honey: '#E5B78C',
  amber: '#D79B68',
  caramel: '#B97C51',
  cocoa: '#8B5C3E',
}

const SHIRTS: Record<KidUniform, string> = {
  sky: '#3AA8DC',
  navy: '#0B2E4F',
  white: '#F5F1E8',
}

const HIJAB_COLORS = ['#D8C6EA', '#C9DFEF', '#F3D3CE', '#CFE4D6'] as const

interface ArmPose {
  left: [number, number, number]
  right: [number, number, number]
  forearmLeft: [number, number, number]
  forearmRight: [number, number, number]
}

const ARM_POSES: Record<KidPose, ArmPose> = {
  idle: {
    left: [0, 0, -0.08],
    right: [0, 0, 0.08],
    forearmLeft: [0, 0, 0],
    forearmRight: [0, 0, 0],
  },
  wave: {
    left: [0, 0, -0.08],
    right: [0, 0, 2.35],
    forearmLeft: [0, 0, 0],
    forearmRight: [0, 0, 0.08],
  },
  cheer: {
    left: [0, 0, -2.45],
    right: [0, 0, 2.45],
    forearmLeft: [0, 0, 0],
    forearmRight: [0, 0, 0],
  },
  'hold-book': {
    left: [-1.25, 0, -0.12],
    right: [-1.25, 0, 0.12],
    forearmLeft: [-0.15, 0, 0],
    forearmRight: [-0.15, 0, 0],
  },
}

/**
 * A cheerful chibi classmate built only from three.js primitives: no textures,
 * no external assets. Origin is between the shoes so kids can be dropped
 * straight onto a deck, platform or seat.
 */
export default function Kid({
  skin = 'honey',
  hair = 'short',
  hairColor = DEFAULT_HAIR,
  hijabColor,
  uniform = 'sky',
  bottom = 'trousers',
  pose = 'idle',
  sitting = false,
  reducedMotion = false,
  seed = 0,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: KidProps) {
  const motion = useKidMotion({ pose, reducedMotion, seed })

  const skinTone = SKIN_TONES[skin]
  const shirt = SHIRTS[uniform]
  const legsColor = bottom === 'skirt' ? skinTone : NAVY
  const arms = ARM_POSES[pose]
  const hijabTone = hijabColor ?? HIJAB_COLORS[Math.abs(Math.round(seed)) % HIJAB_COLORS.length]
  const headwearColor = hair === 'hijab' ? hijabTone : hairColor
  const headwearRadius = HEAD_RADIUS + (hair === 'hijab' ? 0.022 : 0.012)
  const topDepth = Math.PI * 0.44
  const sideGap =
    hair === 'bob' ? 1.3 : hair === 'hijab' ? 1.22 : hair === 'ponytail' ? 2 : hair === 'curls' ? 1.7 : 1.9
  const sideDepth =
    Math.PI * (hair === 'bob' ? 0.22 : hair === 'hijab' ? 0.26 : hair === 'ponytail' ? 0.14 : hair === 'curls' ? 0.12 : 0.1)

  const thighRotation: [number, number, number] = sitting ? [-1.35, 0, 0] : [0, 0, 0]
  const shinRotation: [number, number, number] = sitting ? [1.3, 0, 0] : [0, 0, 0]

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={motion.bodyRef} rotation={[sitting ? -0.05 : 0, 0, 0]}>
        {([-1, 1] as const).map((side) => (
          <group key={`leg-${side}`} position={[side * 0.062, 0.32, 0]} rotation={thighRotation}>
            <mesh position={[0, -0.075, 0]}>
              <capsuleGeometry args={[0.043, 0.064, 3, 8]} />
              <meshStandardMaterial color={legsColor} roughness={0.6} />
            </mesh>
            <group position={[0, -0.15, 0]} rotation={shinRotation}>
              <mesh position={[0, -0.06, 0]}>
                <capsuleGeometry args={[0.039, 0.05, 3, 8]} />
                <meshStandardMaterial color={legsColor} roughness={0.6} />
              </mesh>
              <mesh position={[0, -0.115, 0]}>
                <cylinderGeometry args={[0.043, 0.043, 0.035, 10]} />
                <meshStandardMaterial color={SOCK} roughness={0.78} />
              </mesh>
              <mesh position={[0, -0.145, 0.022]}>
                <boxGeometry args={[0.088, 0.055, 0.135]} />
                <meshStandardMaterial color={SHOE} roughness={0.4} metalness={0.08} />
              </mesh>
            </group>
          </group>
        ))}

        {bottom === 'skirt' ? (
          <mesh position={[0, 0.29, 0]}>
            <cylinderGeometry args={[0.12, 0.175, 0.15, 18]} />
            <meshStandardMaterial color={NAVY} roughness={0.55} />
          </mesh>
        ) : (
          <mesh position={[0, 0.315, 0]}>
            <cylinderGeometry args={[0.125, 0.14, 0.11, 16]} />
            <meshStandardMaterial color={NAVY} roughness={0.55} />
          </mesh>
        )}

        <mesh position={[0, 0.46, 0]}>
          <capsuleGeometry args={[0.115, 0.1, 4, 12]} />
          <meshStandardMaterial color={shirt} roughness={0.62} />
        </mesh>
        <mesh position={[0, 0.615, 0]}>
          <cylinderGeometry args={[0.05, 0.055, 0.05, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.65} />
        </mesh>

        {hair !== 'hijab' ? (
          <group>
            <mesh position={[-0.042, 0.588, 0.088]} rotation={[0, 0, 0.42]}>
              <boxGeometry args={[0.075, 0.022, 0.045]} />
              <meshStandardMaterial color={SOCK} roughness={0.72} />
            </mesh>
            <mesh position={[0.042, 0.588, 0.088]} rotation={[0, 0, -0.42]}>
              <boxGeometry args={[0.075, 0.022, 0.045]} />
              <meshStandardMaterial color={SOCK} roughness={0.72} />
            </mesh>
            <mesh position={[0, 0.575, 0.105]}>
              <boxGeometry args={[0.04, 0.034, 0.026]} />
              <meshStandardMaterial color={BRAND_RED} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.515, 0.112]} rotation={[0, Math.PI / 4, Math.PI]}>
              <coneGeometry args={[0.036, 0.1, 4]} />
              <meshStandardMaterial color={BRAND_RED} roughness={0.5} />
            </mesh>
          </group>
        ) : (
          <mesh position={[0, 0.55, 0.205]}>
            <sphereGeometry args={[0.018, 10, 8]} />
            <meshStandardMaterial color={BRAND_RED} roughness={0.45} metalness={0.2} />
          </mesh>
        )}

        {([-1, 1] as const).map((side) => {
          const isLeft = side === -1
          return (
            <group
              key={`arm-${side}`}
              ref={isLeft ? motion.armLeftRef : motion.armRightRef}
              position={[side * 0.145, 0.55, 0]}
              rotation={isLeft ? arms.left : arms.right}
            >
              <mesh position={[0, -0.07, 0]}>
                <capsuleGeometry args={[0.037, 0.06, 3, 8]} />
                <meshStandardMaterial color={shirt} roughness={0.62} />
              </mesh>
              <group
                ref={isLeft ? motion.forearmLeftRef : motion.forearmRightRef}
                position={[0, -0.14, 0]}
                rotation={isLeft ? arms.forearmLeft : arms.forearmRight}
              >
                <mesh position={[0, -0.055, 0]}>
                  <capsuleGeometry args={[0.033, 0.05, 3, 8]} />
                  <meshStandardMaterial color={skinTone} roughness={0.62} />
                </mesh>
                <mesh position={[0, -0.125, 0]}>
                  <sphereGeometry args={[0.042, 12, 10]} />
                  <meshStandardMaterial color={skinTone} roughness={0.62} />
                </mesh>
              </group>
            </group>
          )
        })}

        {pose === 'hold-book' ? (
          <group ref={motion.bookRef} position={[0, 0.43, 0.3]} rotation={[-0.35, 0, 0]}>
            <mesh position={[-0.068, 0, 0]} rotation={[0, 0.24, 0]}>
              <boxGeometry args={[0.135, 0.17, 0.018]} />
              <meshStandardMaterial color={NAVY} roughness={0.5} />
            </mesh>
            <mesh position={[0.068, 0, 0]} rotation={[0, -0.24, 0]}>
              <boxGeometry args={[0.135, 0.17, 0.018]} />
              <meshStandardMaterial color={NAVY} roughness={0.5} />
            </mesh>
            <mesh position={[-0.068, 0, 0.013]} rotation={[0, 0.24, 0]}>
              <boxGeometry args={[0.122, 0.155, 0.012]} />
              <meshStandardMaterial color="#F7F4EC" roughness={0.86} />
            </mesh>
            <mesh position={[0.068, 0, 0.013]} rotation={[0, -0.24, 0]}>
              <boxGeometry args={[0.122, 0.155, 0.012]} />
              <meshStandardMaterial color="#F7F4EC" roughness={0.86} />
            </mesh>
            <mesh position={[0, -0.002, 0.006]}>
              <boxGeometry args={[0.024, 0.18, 0.03]} />
              <meshStandardMaterial color={BRAND_RED} roughness={0.5} />
            </mesh>
          </group>
        ) : null}

        <group ref={motion.headRef} position={[0, HEAD_Y, 0]}>
          <mesh>
            <sphereGeometry args={[HEAD_RADIUS, 22, 18]} />
            <meshStandardMaterial color={skinTone} roughness={0.6} />
          </mesh>

          {hair !== 'hijab'
            ? ([-1, 1] as const).map((side) => (
                <mesh
                  key={`ear-${side}`}
                  position={[side * 0.198, -0.005, 0]}
                  scale={[0.55, 0.8, 0.75]}
                >
                  <sphereGeometry args={[0.048, 10, 8]} />
                  <meshStandardMaterial color={skinTone} roughness={0.65} />
                </mesh>
              ))
            : null}

          {([-1, 1] as const).map((side) => (
            <group
              key={`eye-${side}`}
              ref={side === -1 ? motion.eyeLeftRef : motion.eyeRightRef}
              position={[side * 0.074, 0.005, 0.183]}
            >
              <mesh scale={[0.95, 1.15, 0.55]}>
                <sphereGeometry args={[0.036, 14, 12]} />
                <meshStandardMaterial color={EYE} roughness={0.22} metalness={0.08} />
              </mesh>
              <mesh position={[side * 0.011, 0.014, 0.019]}>
                <sphereGeometry args={[0.0095, 8, 6]} />
                <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
              </mesh>
            </group>
          ))}

          {([-1, 1] as const).map((side) => (
            <mesh
              key={`cheek-${side}`}
              position={[side * 0.128, -0.058, 0.152]}
              scale={[1, 0.72, 0.35]}
            >
              <sphereGeometry args={[0.042, 12, 10]} />
              <meshStandardMaterial color={CHEEK} roughness={0.85} />
            </mesh>
          ))}

          <mesh position={[0, -0.035, 0.202]} scale={[1, 0.8, 0.7]}>
            <sphereGeometry args={[0.02, 10, 8]} />
            <meshStandardMaterial color={skinTone} roughness={0.62} />
          </mesh>

          <mesh position={[0, -0.077, 0.198]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.047, 0.0085, 6, 14, Math.PI]} />
            <meshStandardMaterial color={MOUTH} roughness={0.6} />
          </mesh>

          <mesh>
            <sphereGeometry args={[headwearRadius, 20, 12, 0, Math.PI * 2, 0, topDepth]} />
            <meshStandardMaterial
              color={headwearColor}
              roughness={hair === 'hijab' ? 0.74 : 0.68}
              side={hair === 'hijab' ? THREE.DoubleSide : THREE.FrontSide}
            />
          </mesh>
          <mesh>
            <sphereGeometry
              args={[
                headwearRadius,
                20,
                12,
                Math.PI / 2 + sideGap / 2,
                Math.PI * 2 - sideGap,
                topDepth,
                sideDepth,
              ]}
            />
            <meshStandardMaterial
              color={headwearColor}
              roughness={hair === 'hijab' ? 0.74 : 0.68}
              side={hair === 'hijab' ? THREE.DoubleSide : THREE.FrontSide}
            />
          </mesh>

          {hair === 'curls' ? (
            <group>
              {(
                [
                  [-0.14, 0.14, 0.09, 0.058],
                  [0.14, 0.14, 0.09, 0.058],
                  [0, 0.18, 0.06, 0.06],
                  [-0.1, 0.13, -0.1, 0.062],
                  [0.1, 0.13, -0.1, 0.062],
                  [-0.18, 0.05, -0.02, 0.055],
                  [0.18, 0.05, -0.02, 0.055],
                ] as const
              ).map(([x, y, z, radius]) => (
                <mesh key={`curl-${x}-${y}-${z}`} position={[x, y, z]}>
                  <sphereGeometry args={[radius, 10, 8]} />
                  <meshStandardMaterial color={hairColor} roughness={0.7} />
                </mesh>
              ))}
            </group>
          ) : null}

          {hair === 'ponytail' ? (
            <group position={[0, 0.22, -0.04]} rotation={[2.4, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.045, 0.05, 0.04, 10]} />
                <meshStandardMaterial color={BRAND_RED} roughness={0.55} />
              </mesh>
              <mesh position={[0, -0.11, 0]}>
                <capsuleGeometry args={[0.058, 0.1, 3, 10]} />
                <meshStandardMaterial color={hairColor} roughness={0.68} />
              </mesh>
              <mesh position={[0, -0.205, 0]}>
                <sphereGeometry args={[0.055, 12, 10]} />
                <meshStandardMaterial color={hairColor} roughness={0.68} />
              </mesh>
            </group>
          ) : null}
        </group>

        {hair === 'hijab' ? (
          <mesh position={[0, 0.59, 0]}>
            <cylinderGeometry args={[0.16, 0.215, 0.14, 20, 1, true]} />
            <meshStandardMaterial color={hijabTone} roughness={0.74} side={THREE.DoubleSide} />
          </mesh>
        ) : null}
      </group>
    </group>
  )
}
