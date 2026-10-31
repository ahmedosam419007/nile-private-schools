import { useGSAP } from '@gsap/react'
import { lazy, Suspense, useRef, useState, type MouseEvent } from 'react'
import { school, ui } from '../data/school'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useSmoothScroll } from './SmoothScroll'
import SceneBoundary from './hero/SceneBoundary'
import SceneFallback from './hero/SceneFallback'
import { heroScrollProgress } from './hero/heroScrollProgress'
import { supportsWebGl } from './hero/webglSupport'

const HeroScene = lazy(() => import('./hero/HeroScene'))

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [webglAvailable] = useState(supportsWebGl)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        // Reverting an in-flight intro must not leave content at opacity 0.
        gsap.set('[data-hero-intro]', { clearProps: 'all' })
        return
      }

      gsap.from('[data-hero-intro]', {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
      })
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
  )

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (prefersReducedMotion) {
        heroScrollProgress.current = 0
        return
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroScrollProgress.current = self.progress
        },
        onRefresh: (self) => {
          heroScrollProgress.current = self.progress
        },
      })

      heroScrollProgress.current = trigger.progress

      return () => {
        trigger.kill()
        heroScrollProgress.current = 0
      }
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
  )

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.getElementById('contact')
    // `scroll-padding-top` on <html> handles the fixed-header offset.
    if (target) scrollTo(target, { offset: 0 })
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-surface relative isolate flex min-h-svh items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center sm:px-8"
    >
      <div
        data-hero-scene
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {webglAvailable ? (
          <SceneBoundary>
            <Suspense fallback={<SceneFallback />}>
              <HeroScene reducedMotion={prefersReducedMotion} />
            </Suspense>
          </SceneBoundary>
        ) : (
          <SceneFallback />
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <p
          data-hero-intro
          lang="en"
          dir="ltr"
          className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-pale/80 sm:text-xs sm:tracking-[0.3em]"
        >
          {school.name.en}
        </p>

        <h1
          data-hero-intro
          className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.45] text-sand sm:text-6xl sm:leading-[1.35] lg:text-7xl"
        >
          {school.name.ar}
        </h1>

        <div data-hero-intro className="mt-8 flex flex-col items-center">
          <span aria-hidden="true" className="mb-6 h-0.5 w-12 rounded-full bg-brand-red" />
          <p className="text-xl font-semibold leading-relaxed text-sky-pale sm:text-2xl">
            {school.tagline.ar}
          </p>
          <p
            lang="en"
            dir="ltr"
            className="mt-3 max-w-2xl text-xs font-medium leading-relaxed text-sand/65 sm:text-sm"
          >
            {school.tagline.en}
          </p>
        </div>

        <div
          data-hero-intro
          className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <a
            href={school.links.admissionForm}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-sky px-8 py-3 text-base font-bold text-navy shadow-[0_12px_40px_rgba(58,168,220,0.18)] transition-colors duration-300 hover:bg-sky-pale"
          >
            {ui.actions.applyNow}
          </a>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand/25 bg-white/5 px-8 py-3 text-base font-bold text-sand transition-colors duration-300 hover:bg-white/10"
          >
            {ui.actions.contactUs}
          </a>
        </div>
      </div>
    </section>
  )
}
