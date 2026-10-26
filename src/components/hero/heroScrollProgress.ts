/**
 * Shared, render-free scroll progress for the hero scene.
 * 0 = hero top aligned with the viewport top, 1 = hero fully scrolled past.
 * Hero owns the ScrollTrigger that writes here; the lazy 3D scene reads it in useFrame.
 */
export const heroScrollProgress = { current: 0 }
