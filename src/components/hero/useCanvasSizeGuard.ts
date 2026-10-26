import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * @react-three/fiber measures its canvas with react-use-measure. When the very
 * first ResizeObserver callback lands before that hook marks itself mounted,
 * the measurement is dropped and the renderer never configures, leaving the
 * canvas at its 300x150 default inside a correctly sized wrapper.
 *
 * This guard re-measures only when that actually happened: it compares the
 * rendered canvas box with its host and dispatches at most two window resize
 * events, which is the public signal react-use-measure listens for.
 */
export function useCanvasSizeGuard(hostRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let frame = 0
    let attempts = 0
    let frames = 0
    let settled: number | undefined
    let finalState: 'matched' | 'pending' | 'gave-up' = 'pending'

    const check = () => {
      if (finalState !== 'pending') return
      if (attempts >= 2 || frames >= 300) {
        finalState = 'gave-up'
        return
      }
      frames += 1

      const canvas = host.querySelector('canvas')
      const width = host.clientWidth
      const height = host.clientHeight

      // A lazily mounted canvas can appear before its host is laid out; keep
      // waiting instead of concluding that sizing is wrong or right too early.
      if (!canvas || width === 0 || height === 0) {
        frame = window.requestAnimationFrame(check)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const matches = Math.round(rect.width) === width && Math.round(rect.height) === height
      if (matches) {
        finalState = 'matched'
        return
      }

      attempts += 1
      window.dispatchEvent(new Event('resize'))
      frame = window.requestAnimationFrame(check)
    }

    frame = window.requestAnimationFrame(check)
    // Late fallback for a canvas that only appears after the loop gave up, but
    // never dispatch a synthetic resize when sizing was already correct —
    // other listeners (Swiper's resize handling) would needlessly re-run.
    settled = window.setTimeout(() => {
      if (finalState !== 'matched') window.dispatchEvent(new Event('resize'))
    }, 400)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(settled)
    }
  }, [hostRef])
}
