import { useRef, type ReactNode } from 'react'
import { featuresSection, type FeatureIconName } from '../../data/school'
import { SectionHeading } from './SectionHeading'
import { useSectionReveal } from './useSectionReveal'

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      viewBox="0 0 48 48"
    >
      {children}
    </svg>
  )
}

const FEATURE_GLYPHS: Record<FeatureIconName, ReactNode> = {
  languages: (
    <Glyph>
      <path d="M8.5 13.2c0-2 1.6-3.6 3.6-3.6h13.2c2 0 3.6 1.6 3.6 3.6v9.1c0 2-1.6 3.6-3.6 3.6h-6.9l-5.4 4.2v-4.2h-1c-2 0-3.5-1.6-3.5-3.6Z" />
      <path
        d="M23.8 23.6c0-1.7 1.4-3.1 3.1-3.1h9.6c1.7 0 3.1 1.4 3.1 3.1v7.6c0 1.7-1.4 3.1-3.1 3.1h-2.9l-4 3.1v-3.1h-2.7c-1.7 0-3.1-1.4-3.1-3.1Z"
        opacity=".55"
      />
      <path d="M14 17.2h7.2M14 20.6h4.6" opacity=".7" />
      <path d="M37.2 12.8c1.2-.8 2.5-.8 3.6 0" opacity=".45" />
    </Glyph>
  ),
  teachers: (
    <Glyph>
      <circle cx="20.5" cy="14" r="4.4" />
      <path d="M12.4 35.4c.4-6.2 3.7-9.7 8.1-9.7s7.7 3.5 8.1 9.7" />
      <path d="M29.6 26.8 34.2 24l5.2 2.8v9.1l-5.2-2.8-4.6 2.8Z" />
      <path d="M34.2 24v9.1" opacity=".65" />
      <path d="M34.2 12.6v3.2M32.6 14.2h3.2" opacity=".55" />
    </Glyph>
  ),
  support: (
    <Glyph>
      <circle cx="15.4" cy="17.4" r="3.1" />
      <circle cx="24" cy="14.8" r="3.5" />
      <circle cx="32.6" cy="17.4" r="3.1" />
      <path d="M9.8 30.8c1-4.4 3-6.7 5.6-6.7 2.3 0 4.1 1.8 5.1 4.9" />
      <path d="M27.5 29c1-3.1 2.8-4.9 5.1-4.9 2.6 0 4.6 2.3 5.6 6.7" />
      <path d="M20.1 29.4c1.2-2.9 2.5-4.3 3.9-4.3s2.7 1.4 3.9 4.3" />
      <path d="M12 36.2c7.6 2.1 16.4 2.1 24 0" opacity=".55" />
    </Glyph>
  ),
  activities: (
    <Glyph>
      <path d="m23.2 8.6 3.1 8.7 8.8 3.1-8.8 3.1-3.1 8.7-3.1-8.7-8.8-3.1 8.8-3.1Z" />
      <circle cx="35.4" cy="32.4" r="3.2" opacity=".65" />
      <path d="M10.6 34.4c2.8-2 5.6-2 8.4 0" opacity=".6" />
      <path d="M33.4 11.2c1.4-.7 2.7-.7 4.1 0" opacity=".45" />
    </Glyph>
  ),
  care: (
    <Glyph>
      <path d="M24 8.8 36.2 13v9.4c0 7.4-5.1 12.2-12.2 15.6C16.9 34.6 11.8 29.8 11.8 22.4V13Z" />
      <path d="M24 28.3c-1.4-1.1-6.1-4.3-6.1-7.8 0-2 1.5-3.6 3.4-3.6 1.1 0 2.1.6 2.7 1.5.6-.9 1.6-1.5 2.7-1.5 1.9 0 3.4 1.6 3.4 3.6 0 3.5-4.7 6.7-6.1 7.8Z" />
    </Glyph>
  ),
  location: (
    <Glyph>
      <path d="M24 38.6S34 28.4 34 20.2a10 10 0 1 0-20 0c0 8.2 10 18.4 10 18.4Z" />
      <circle cx="24" cy="20.1" r="3.5" />
      <path d="M12.2 41.2c4-2 7.9-2 11.8 0 3.9 2 7.8 2 11.8 0" opacity=".55" />
    </Glyph>
  ),
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useSectionReveal(sectionRef, {
    targets: '[data-reveal="heading"]',
    y: 24,
  })

  useSectionReveal(sectionRef, {
    targets: '[data-feature-card]',
    trigger: '[data-features-grid]',
    y: 30,
    stagger: 0.08,
    start: 'top 84%',
  })

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-title"
      className="relative isolate overflow-hidden bg-navy px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(58,168,220,0.12),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(11,79,122,0.3),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 end-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div data-reveal="heading">
          <SectionHeading
            eyebrow={featuresSection.eyebrow.en}
            title={featuresSection.heading.ar}
            titleId="features-title"
            subtitle={featuresSection.heading.en}
            intro={featuresSection.intro.ar}
          />
        </div>

        <div
          data-features-grid
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {featuresSection.items.map((feature) => (
            <div key={feature.icon} data-feature-card className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_28px_70px_-35px_rgba(58,168,220,0.35)] sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 end-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(58,168,220,0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.06] text-sky-pale transition-[transform,color,border-color] duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg] group-hover:border-gold/50 group-hover:text-gold">
                    {FEATURE_GLYPHS[feature.icon]}
                  </span>
                  <span
                    lang="en"
                    dir="ltr"
                    className="mt-1 text-end text-[0.55rem] font-semibold uppercase leading-4 tracking-[0.22em] text-sand/35"
                  >
                    {feature.titleEn}
                  </span>
                </div>

                <h3 className="relative mt-5 text-lg font-bold text-sand sm:text-xl">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-7 text-sand/65">
                  {feature.description}
                </p>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 start-0 end-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
