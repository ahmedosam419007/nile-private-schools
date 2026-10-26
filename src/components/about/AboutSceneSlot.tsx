import { lazy, Suspense, useState } from 'react'
import SceneBoundary from '../hero/SceneBoundary'
import SceneFallback from '../hero/SceneFallback'
import { supportsWebGl } from '../hero/webglSupport'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const AboutScene = lazy(() => import('./AboutScene'))

/**
 * Drop-in slot for the about section: give it a `relative` parent and it fills
 * it with the lazy learning vignette, the CSS fallback and the error boundary,
 * exactly like the hero wires its scene.
 */
export function AboutSceneSlot() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [webglAvailable] = useState(supportsWebGl)

  return (
    <div
      data-about-scene
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {webglAvailable ? (
        <SceneBoundary>
          <Suspense fallback={<SceneFallback />}>
            <AboutScene reducedMotion={prefersReducedMotion} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <SceneFallback />
      )}
    </div>
  )
}

export default AboutSceneSlot
