import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { aboutSection, contactSection, school } from '../../data/school'
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

      <div data-reveal className="mx-auto mt-16 w-full max-w-5xl">
        <figure className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-b from-navy-deep/75 via-navy-deep/45 to-navy/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(58,168,220,0.18),transparent_55%),radial-gradient(ellipse_at_85%_100%,rgba(201,162,74,0.14),transparent_55%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent"
          />

          <div className="relative grid items-center gap-9 p-6 sm:gap-12 sm:p-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:p-14">
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[340px]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(58,168,220,0.32),transparent_68%)] blur-2xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-gold/35"
              />
              <img
                src={school.buildingImage}
                alt="مبنى مدارس النيل الخاصة للغات"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full rounded-full object-cover ring-1 ring-gold/50"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(6,24,46,0.55)]"
              />
            </div>

            <figcaption className="text-center lg:text-start">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold/90">
                CAMPUS
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-sand sm:text-3xl">
                {school.name.ar}
              </h3>
              <p
                lang="en"
                className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sand/50 sm:text-sm"
              >
                {school.name.en}
              </p>
              <p className="mt-5 text-sm leading-7 text-sand/65 sm:text-base">
                {school.address.ar}
              </p>
              <a
                href={school.links.location}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-6 py-2.5 text-sm font-bold text-sand transition-colors duration-300 hover:border-gold/70 hover:bg-white/[0.08]"
              >
                <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                {contactSection.actions.map}
              </a>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}

export default AboutSection
