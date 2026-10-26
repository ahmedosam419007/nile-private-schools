import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap } from '../../lib/gsap'

interface SectionRevealOptions {
  /** CSS selector, scoped to the section, for the blocks that should reveal. */
  targets: string
  /** Optional selector for the element whose position drives the trigger. */
  trigger?: string
  y?: number
  stagger?: number
  start?: string
}

/**
 * Reveals whole blocks inside a section when they approach the viewport.
 * Arabic text is never split: only the containers animate. Under reduced
 * motion nothing is hidden and no tween is created.
 */
export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  { targets, trigger, y = 26, stagger = 0.1, start = 'top 80%' }: SectionRevealOptions,
) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const section = sectionRef.current

      if (prefersReducedMotion) {
        // A mid-session toggle to reduced motion reverts an in-flight reveal;
        // clear any inline styles so nothing is left stuck invisible.
        if (section) {
          gsap.set(gsap.utils.toArray<HTMLElement>(targets, section), { clearProps: 'all' })
        }
        return
      }

      if (!section) return

      const elements = gsap.utils.toArray<HTMLElement>(targets, section)
      if (elements.length === 0) return

      const triggerElement = trigger
        ? (section.querySelector<HTMLElement>(trigger) ?? section)
        : section

      gsap.from(elements, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        stagger,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: triggerElement,
          start,
          once: true,
        },
      })
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, targets, trigger, y, stagger, start],
      revertOnUpdate: true,
    },
  )
}

