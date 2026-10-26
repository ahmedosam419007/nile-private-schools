import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface ScrollOptions {
  offset?: number
}

interface SmoothScrollContextValue {
  getLenis: () => Lenis | null
  scrollTo: (target: HTMLElement, options?: ScrollOptions) => void
  setStopped: (stopped: boolean) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error('useSmoothScroll must be used inside SmoothScroll')
  }
  return context
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })
    const tick = (time: number) => lenis.raf(time * 1000)

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tick)
      // Undo the shared-ticker side effect: default lag smoothing is 500ms/33ms.
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
    }
  }, [prefersReducedMotion])

  const getLenis = useCallback(() => lenisRef.current, [])

  const scrollTo = useCallback((target: HTMLElement, options: ScrollOptions = {}) => {
    if (!target.isConnected) return

    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: options.offset ?? 0 })
      return
    }

    target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])

  const setStopped = useCallback((stopped: boolean) => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (stopped) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [])

  const value = useMemo(
    () => ({ getLenis, scrollTo, setStopped }),
    [getLenis, scrollTo, setStopped],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
