let cachedSupport: boolean | undefined

/**
 * Detects WebGL once, before the lazy scene chunk is requested, so unsupported
 * browsers can keep the CSS fallback instead of mounting a failing Canvas.
 */
export function supportsWebGl() {
  if (cachedSupport !== undefined) return cachedSupport
  if (typeof document === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    cachedSupport = context !== null
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cachedSupport = false
  }

  return cachedSupport
}
