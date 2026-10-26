import { Component, type ErrorInfo, type ReactNode } from 'react'
import SceneFallback from './SceneFallback'

interface SceneBoundaryProps {
  children: ReactNode
}

interface SceneBoundaryState {
  failed: boolean
}

/**
 * Keeps a WebGL/three failure from taking down the hero: the text and CTAs stay
 * usable and the CSS fallback replaces the canvas.
 */
export default class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn(
        '[HeroScene] 3D scene failed to start; showing the CSS fallback instead.',
        error,
        errorInfo.componentStack,
      )
    }
  }

  render() {
    if (this.state.failed) {
      return <SceneFallback />
    }

    return this.props.children
  }
}
