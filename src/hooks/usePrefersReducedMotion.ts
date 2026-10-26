import { useSyncExternalStore } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
let mediaQuery: MediaQueryList | undefined

function getMediaQuery() {
  mediaQuery ??= window.matchMedia(reducedMotionQuery)
  return mediaQuery
}

function subscribe(onChange: () => void) {
  const query = getMediaQuery()
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getSnapshot() {
  return getMediaQuery().matches
}

function getServerSnapshot() {
  return false
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
