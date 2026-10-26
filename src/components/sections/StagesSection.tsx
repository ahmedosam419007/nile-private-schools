import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Shapes,
  type LucideIcon,
} from 'lucide-react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { stagesSection } from '../../data/school'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import {
  type KidBottom,
  type KidHair,
  type KidPose,
  type KidSkin,
  type KidUniform,
} from '../kit/Kid'
import SceneBoundary from '../hero/SceneBoundary'
import { supportsWebGl } from '../hero/webglSupport'
import { SectionHeading } from './SectionHeading'
import { useSectionReveal } from './useSectionReveal'

const StagesKidScene = lazy(() => import('./StagesKidScene'))

interface StageLook {
  pose: KidPose
  skin: KidSkin
  hair: KidHair
  hairColor?: string
  hijabColor?: string
  uniform: KidUniform
  bottom: KidBottom
  seed: number
}

const STAGE_LOOKS: readonly StageLook[] = [
  {
    pose: 'wave',
    skin: 'honey',
    hair: 'ponytail',
    hairColor: '#3A2418',
    uniform: 'sky',
    bottom: 'skirt',
    seed: 2,
  },
  {
    pose: 'hold-book',
    skin: 'porcelain',
    hair: 'short',
    hairColor: '#5B3A24',
    uniform: 'navy',
    bottom: 'trousers',
    seed: 3,
  },
  {
    pose: 'cheer',
    skin: 'caramel',
    hair: 'hijab',
    hijabColor: '#C9DFEF',
    uniform: 'white',
    bottom: 'skirt',
    seed: 4,
  },
  {
    pose: 'idle',
    skin: 'amber',
    hair: 'curls',
    hairColor: '#2A1B12',
    uniform: 'sky',
    bottom: 'trousers',
    seed: 7,
  },
]

const STAGE_ICONS: readonly LucideIcon[] = [
  Shapes,
  BookOpenText,
  FlaskConical,
  GraduationCap,
]

const SWIPER_MODULES = [EffectCoverflow, Autoplay, Pagination, Navigation]

const SWIPER_NAVIGATION = {
  prevEl: '[data-stages-nav="prev"]',
  nextEl: '[data-stages-nav="next"]',
}

const SWIPER_PAGINATION = { clickable: true }

const SWIPER_COVERFLOW = {
  rotate: 0,
  stretch: 0,
  depth: 120,
  modifier: 1,
  scale: 0.94,
  slideShadows: false,
}

const SWIPER_BREAKPOINTS = {
  640: { slidesPerView: 1.55, spaceBetween: 20 },
  1024: { slidesPerView: 2.1, spaceBetween: 26 },
  1280: { slidesPerView: 2.4, spaceBetween: 30 },
}

const AUTOPLAY_OPTIONS = {
  delay: 5200,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}

const SWIPER_SPEED = 600

type SwiperStyle = CSSProperties & Record<`--swiper-${string}`, string>

const SWIPER_STYLE: SwiperStyle = {
  '--swiper-pagination-color': '#C9A24A',
  '--swiper-pagination-bullet-inactive-color': '#BFE9FF',
  '--swiper-pagination-bullet-inactive-opacity': '0.28',
  '--swiper-pagination-bullet-size': '6px',
  '--swiper-pagination-bullet-horizontal-gap': '5px',
  '--swiper-pagination-bottom': '18px',
}

function StagePortraitPlaceholder({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(58,168,220,0.24),transparent_62%)]" />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/30 bg-white/[0.04] shadow-[0_0_60px_-12px_rgba(58,168,220,0.45)]">
        <span className="absolute inset-2 rounded-full border border-dashed border-sky-pale/20" />
        <Icon aria-hidden="true" className="text-sky-pale/75" size={38} strokeWidth={1.15} />
      </div>
    </div>
  )
}

export function StagesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [webglAvailable] = useState(supportsWebGl)
  const [portraitEnabled, setPortraitEnabled] = useState(false)

  useSectionReveal(sectionRef, {
    targets: '[data-reveal]',
    stagger: 0.14,
  })

  /**
   * The single portrait canvas lives outside the Swiper slides and is moved
   * over whichever card is active. Reading the active image region's rect
   * (coverflow scale included) keeps the canvas pixel-aligned at every
   * breakpoint, in RTL, and while the carousel animates.
   */
  const syncPortraitPosition = useCallback(() => {
    const host = carouselRef.current
    const overlay = portraitRef.current
    if (!host || !overlay) return

    const activeSlide = host.querySelector<HTMLElement>('.swiper-slide-active')
    const portrait = activeSlide?.querySelector<HTMLElement>('[data-stage-portrait]')
    if (!portrait) return

    const hostRect = host.getBoundingClientRect()
    const portraitRect = portrait.getBoundingClientRect()

    overlay.style.width = `${portraitRect.width}px`
    overlay.style.height = `${portraitRect.height}px`
    overlay.style.transform = `translate3d(${portraitRect.left - hostRect.left}px, ${portraitRect.top - hostRect.top}px, 0)`
  }, [])

  // Follow the active card for the duration of the slide transition, then stop.
  useLayoutEffect(() => {
    let frame = 0
    let stopped = false
    const startedAt = performance.now()
    const duration = SWIPER_SPEED + 100

    syncPortraitPosition()

    const follow = () => {
      if (stopped) return
      syncPortraitPosition()
      if (performance.now() - startedAt < duration) {
        frame = window.requestAnimationFrame(follow)
      }
    }

    frame = window.requestAnimationFrame(follow)

    return () => {
      stopped = true
      window.cancelAnimationFrame(frame)
    }
  }, [activeIndex, syncPortraitPosition])

  useEffect(() => {
    const host = carouselRef.current
    if (!host) return

    const handleResize = () => syncPortraitPosition()
    window.addEventListener('resize', handleResize)

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(handleResize)
    observer?.observe(host)

    return () => {
      window.removeEventListener('resize', handleResize)
      observer?.disconnect()
    }
  }, [syncPortraitPosition])

  useEffect(() => {
    const host = carouselRef.current
    if (!host || !webglAvailable) return

    if (typeof IntersectionObserver === 'undefined') {
      setPortraitEnabled(true)
      return
    }

    // Mount the shared canvas just before the carousel is reachable instead of
    // creating a WebGL context for an off-screen section during page load.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        setPortraitEnabled(true)
        observer.disconnect()
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [webglAvailable])

  const activeLook = STAGE_LOOKS[activeIndex % STAGE_LOOKS.length]
  const ActiveStageIcon = STAGE_ICONS[activeIndex % STAGE_ICONS.length]

  return (
    <section
      ref={sectionRef}
      id="stages"
      aria-labelledby="stages-title"
      className="relative isolate overflow-hidden border-y border-white/5 bg-navy py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(11,79,122,0.55),transparent_60%),radial-gradient(ellipse_at_50%_100%,rgba(58,168,220,0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 end-0 top-0 h-px bg-linear-to-r from-transparent via-sky-pale/20 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow={stagesSection.eyebrow.en}
            title={stagesSection.heading.ar}
            titleId="stages-title"
            subtitle={stagesSection.heading.en}
            intro={stagesSection.intro.ar}
          />
        </div>
      </div>

      <div
        data-reveal
        className="mx-auto mt-14 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div ref={carouselRef} className="relative overflow-hidden">
          <Swiper
            id="stages-carousel"
            aria-label={stagesSection.carouselLabel}
            className="stages-swiper pb-14!"
            style={SWIPER_STYLE}
            dir="rtl"
            modules={SWIPER_MODULES}
            effect="coverflow"
            coverflowEffect={SWIPER_COVERFLOW}
            slidesPerView={1.08}
            spaceBetween={18}
            centeredSlides
            grabCursor
            rewind
            speed={prefersReducedMotion ? 0 : SWIPER_SPEED}
            breakpoints={SWIPER_BREAKPOINTS}
            autoplay={prefersReducedMotion ? false : AUTOPLAY_OPTIONS}
            navigation={SWIPER_NAVIGATION}
            pagination={SWIPER_PAGINATION}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {stagesSection.items.map((stage, index) => {
              const StageIcon = STAGE_ICONS[index % STAGE_ICONS.length]
              const isActive = index === activeIndex

              return (
                <SwiperSlide key={stage.id} aria-label={stage.nameAr} className="h-full">
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(160deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] shadow-[0_30px_90px_-45px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 ${
                      isActive
                        ? 'border-gold/35 shadow-[0_40px_110px_-55px_rgba(201,162,74,0.45)]'
                        : 'border-white/10'
                    }`}
                  >
                    <div
                      data-stage-portrait
                      className="relative h-56 shrink-0 overflow-hidden border-b border-white/10 sm:h-64"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(58,168,220,0.24),transparent_64%)]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(11,79,122,0.5),transparent_58%)]"
                      />

                      {/* The active card shows the shared canvas instead of the icon. */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive && webglAvailable ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <StagePortraitPlaceholder icon={StageIcon} />
                      </div>

                      <span className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-navy/45 px-3 py-1 text-[0.6rem] font-semibold text-gold/90 backdrop-blur-md">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-red" />
                        {stagesSection.cardLabel} {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        lang="en"
                        dir="ltr"
                        className="absolute end-4 top-4 z-10 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-sand/45"
                      >
                        {stage.nameEn}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-2xl font-extrabold leading-snug text-sand">
                        {stage.nameAr}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{stage.description}</p>
                      <div aria-hidden="true" className="mt-auto flex items-center gap-2 pt-6">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
            </Swiper>

          {webglAvailable ? (
            <div
              ref={portraitRef}
              data-stage-canvas
              aria-hidden="true"
              inert
              className="pointer-events-none absolute start-0 top-0 z-10 h-0 w-0"
            >
              <SceneBoundary>
                <Suspense fallback={<StagePortraitPlaceholder icon={ActiveStageIcon} />}>
                  {portraitEnabled ? (
                    <StagesKidScene
                      character={activeLook}
                      reducedMotion={prefersReducedMotion}
                    />
                  ) : (
                    <StagePortraitPlaceholder icon={ActiveStageIcon} />
                  )}
                </Suspense>
              </SceneBoundary>
            </div>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            data-stages-nav="prev"
            aria-label={stagesSection.previousLabel}
            aria-controls="stages-carousel"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sand/80 transition-[color,border-color,background-color] duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold disabled:cursor-default disabled:opacity-30"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
          <span aria-hidden="true" className="h-px w-10 bg-white/15" />
          <button
            type="button"
            data-stages-nav="next"
            aria-label={stagesSection.nextLabel}
            aria-controls="stages-carousel"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sand/80 transition-[color,border-color,background-color] duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold disabled:cursor-default disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default StagesSection
