/**
 * Pure-CSS stand-in for the 3D hero. Shown while the lazy scene chunk loads and
 * whenever the Canvas subtree fails (for example when WebGL is unavailable).
 */
export default function SceneFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#06182e_0%,#072743_48%,#0b4f7a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_8%,rgba(58,168,220,0.34),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_108%,rgba(191,233,255,0.16),transparent_56%)]" />
      <div className="hero-shimmer absolute bottom-0 left-[-33%] right-[-33%] h-2/3 bg-[linear-gradient(100deg,transparent_18%,rgba(191,233,255,0.14)_48%,transparent_76%)]" />
    </div>
  )
}
