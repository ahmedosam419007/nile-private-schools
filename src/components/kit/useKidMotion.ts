import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { RefObject } from 'react'
import type { Group } from 'three'
import type { KidPose } from './Kid'

export interface KidMotion {
  bodyRef: RefObject<Group | null>
  headRef: RefObject<Group | null>
  eyeLeftRef: RefObject<Group | null>
  eyeRightRef: RefObject<Group | null>
  armLeftRef: RefObject<Group | null>
  armRightRef: RefObject<Group | null>
  forearmLeftRef: RefObject<Group | null>
  forearmRightRef: RefObject<Group | null>
  bookRef: RefObject<Group | null>
}

interface KidMotionOptions {
  pose: KidPose
  reducedMotion?: boolean
  seed?: number
}

interface PoseBase {
  armLeftX: number
  armLeftZ: number
  armRightX: number
  armRightZ: number
  forearmRightZ: number
  bookX: number
  bookZ: number
}

/** Character motion slows to a whisper instead of stopping dead. */
const REDUCED_MOTION_SPEED = 0.04

/**
 * Shared idle driver for every cartoon kid: breathing, sway, blinks with a
 * randomized phase, plus the small gesture that belongs to the current pose.
 * The base pose rotations are captured from the declarative JSX on the first
 * frame, so the hook only ever adds movement on top of them.
 */
export function useKidMotion({ pose, reducedMotion = false, seed = 0 }: KidMotionOptions): KidMotion {
  const bodyRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const eyeLeftRef = useRef<Group>(null)
  const eyeRightRef = useRef<Group>(null)
  const armLeftRef = useRef<Group>(null)
  const armRightRef = useRef<Group>(null)
  const forearmLeftRef = useRef<Group>(null)
  const forearmRightRef = useRef<Group>(null)
  const bookRef = useRef<Group>(null)

  const timeRef = useRef(0)
  const baseRef = useRef<PoseBase | null>(null)

  useFrame((_state, delta) => {
    const body = bodyRef.current
    const head = headRef.current
    const armLeft = armLeftRef.current
    const armRight = armRightRef.current
    const forearmRight = forearmRightRef.current

    if (!body || !head || !armLeft || !armRight || !forearmRight) return

    if (!baseRef.current) {
      baseRef.current = {
        armLeftX: armLeft.rotation.x,
        armLeftZ: armLeft.rotation.z,
        armRightX: armRight.rotation.x,
        armRightZ: armRight.rotation.z,
        forearmRightZ: forearmRight.rotation.z,
        bookX: bookRef.current?.rotation.x ?? 0,
        bookZ: bookRef.current?.rotation.z ?? 0,
      }
    }

    const base = baseRef.current
    const speed = reducedMotion ? REDUCED_MOTION_SPEED : 1
    timeRef.current += Math.min(delta, 0.05) * speed

    const t = timeRef.current
    const phase = (seed % 9) * 0.91
    const breath = Math.sin(t * 1.65 + phase) * 0.009
    const cheerBounce = pose === 'cheer' ? Math.abs(Math.sin(t * 2.3 + phase)) * 0.012 : 0

    body.position.y = breath + cheerBounce
    body.rotation.z = Math.sin(t * 0.58 + phase) * 0.02
    body.rotation.y = Math.sin(t * 0.31 + phase) * 0.04

    head.rotation.z = Math.sin(t * 0.52 + phase + 0.7) * 0.03
    head.rotation.y = Math.sin(t * 0.37 + phase) * 0.055

    const blinkPeriod = 3.2 + (seed % 5) * 0.55
    const blinkPhase = (t + phase * 2.3) % blinkPeriod
    const eyeScale = blinkPhase < 0.11 ? 0.14 : 1

    if (eyeLeftRef.current) eyeLeftRef.current.scale.y = eyeScale
    if (eyeRightRef.current) eyeRightRef.current.scale.y = eyeScale

    const armSway = Math.sin(t * 0.55 + phase) * 0.025
    armLeft.rotation.z = base.armLeftZ + armSway
    armRight.rotation.z = base.armRightZ - armSway

    if (pose === 'wave') {
      forearmRight.rotation.z = base.forearmRightZ + Math.sin(t * 3.1 + phase) * 0.32
    } else if (pose === 'cheer') {
      const bounce = Math.sin(t * 2.3 + phase) * 0.06
      armLeft.rotation.z = base.armLeftZ - bounce
      armRight.rotation.z = base.armRightZ + bounce
    } else if (pose === 'hold-book') {
      armLeft.rotation.x = base.armLeftX + Math.sin(t * 0.8 + phase) * 0.015
      armRight.rotation.x = base.armRightX + Math.sin(t * 0.8 + phase + 0.5) * 0.015

      const book = bookRef.current
      if (book) {
        book.rotation.x = base.bookX + Math.sin(t * 1.05 + phase) * 0.022
        book.rotation.z = base.bookZ + Math.sin(t * 0.68 + phase) * 0.03
      }
    }
  })

  return {
    bodyRef,
    headRef,
    eyeLeftRef,
    eyeRightRef,
    armLeftRef,
    armRightRef,
    forearmLeftRef,
    forearmRightRef,
    bookRef,
  }
}
