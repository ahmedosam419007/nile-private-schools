import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function vendorChunk(id: string): string | undefined {
  if (!id.includes('node_modules')) return undefined

  const from = (name: string) => id.includes(`node_modules/${name}/`)

  if (from('three') || id.includes('node_modules/@react-three/') || from('three-stdlib')) {
    return 'three'
  }
  if (from('gsap')) return 'gsap'
  if (from('lenis')) return 'lenis'
  if (from('swiper')) return 'swiper'
  if (from('motion') || from('framer-motion')) return 'motion'
  if (from('react') || from('react-dom') || from('scheduler')) return 'react'
  return undefined
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js is intentionally a single lazy chunk (only fetched once the hero
    // scene mounts), so allow it past Vite's default 500 kB warning threshold.
    chunkSizeWarningLimit: 1000,
    // three.js lives in its own lazy chunk; the remaining vendors are split so
    // the entry chunk stays cacheable between content-only updates.
    rollupOptions: {
      output: {
        manualChunks: vendorChunk,
      },
    },
  },
})
