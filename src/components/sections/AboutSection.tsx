import { useRef } from 'react'
import { aboutSection, school } from '../../data/school'
import { AboutSceneSlot } from '../about/AboutSceneSlot'
import { SectionHeading } from './SectionHeading'
import { useSectionReveal } from './useSectionReveal'

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useSectionReveal(sectionRef, {
    targets: '[data-reveal]',
    stagger: 0.12,
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-navy px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,rgba(58,168,220,0.14),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(11,79,122,0.32),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 end-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <div data-reveal>
            <SectionHeading
              eyebrow={aboutSection.eyebrow.en}
              title={aboutSection.heading.ar}
              titleId="about-title"
              subtitle={aboutSection.heading.en}
            />
          </div>

          <div data-reveal className="mt-8 max-w-xl space-y-5">
            {aboutSection.paragraphs.map((paragraph) => (
              <p
                key={paragraph.ar}
                className="text-[0.98rem] leading-8 text-sand/70 sm:text-[1.05rem] sm:leading-9"
              >
                {paragraph.ar}
              </p>
            ))}
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-2.5" aria-label={aboutSection.highlightsLabel}>
            {aboutSection.highlights.map((highlight) => (
              <li
                key={highlight.id}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.035] px-4 py-2 text-xs font-semibold text-sand/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 hover:text-sand"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold/80" />
                {highlight.ar}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-9 max-w-lg border-t border-white/10 pt-5">
            <p
              lang="en"
              dir="ltr"
              className="text-[0.82rem] leading-7 text-sand/45 sm:text-sm"
            >
              {aboutSection.paragraphs[0].en}
            </p>
          </div>
        </div>

        <div data-reveal className="relative mx-auto w-full max-w-[520px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -end-8 -z-10 h-56 w-56 bg-[radial-gradient(circle,rgba(201,162,74,0.35)_1px,transparent_1px)] bg-[length:16px_16px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -start-8 -top-8 -z-10 h-44 w-44 bg-[linear-gradient(rgba(191,233,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(191,233,255,0.18)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
          />

          <div className="relative aspect-square w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(58,168,220,0.28),transparent_62%)] blur-2xl"
            />
            <AboutSceneSlot />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-1 rounded-full border border-gold/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-7 rounded-full border border-dashed border-sky-pale/15"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(6,24,46,0.65)]"
            />
          </div>
        </div>
      </div>

      <div data-reveal className="mx-auto mt-20 w-full max-w-6xl">
        <figure className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-navy-deep/40 shadow-2xl shadow-navy/60 ring-1 ring-white/5">
          <img
            src={school.buildingImage}
            alt="مبنى مدارس النيل الخاصة للغات"
            loading="eager"
            decoding="async"
            className="block h-[260px] w-full object-cover object-center sm:h-[360px] lg:h-[460px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-6 py-6 sm:px-10 sm:py-8">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold/90">
              Campus
            </span>
            <span className="text-lg font-extrabold text-sand sm:text-2xl">
              {school.name.ar}
            </span>
            <span
              lang="en"
              dir="ltr"
              className="text-xs text-sand/60 sm:text-sm"
            >
              {school.address.en}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AboutSection
