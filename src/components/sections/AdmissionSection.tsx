import { ArrowUpRight } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import { admissionSection, school, ui } from '../../data/school'
import { useSmoothScroll } from '../SmoothScroll'
import { useSectionReveal } from './useSectionReveal'

const sectionScrollOffset = 0

/**
 * Admissions call-to-action band: a duotone navy panel with a gold hairline
 * frame, an editorial heading and the two ways forward (apply / ask).
 */
export function AdmissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  useSectionReveal(sectionRef, {
    targets: '[data-reveal]',
    y: 30,
    stagger: 0.12,
  })

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.getElementById('contact')
    if (target) scrollTo(target, { offset: sectionScrollOffset })
  }

  return (
    <section
      ref={sectionRef}
      id="admission"
      aria-labelledby="admission-title"
      className="relative isolate overflow-hidden border-t border-white/5 bg-navy px-5 py-20 sm:px-8 sm:py-28"
    >
      <div data-reveal className="relative mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-[linear-gradient(135deg,rgba(11,46,79,0.85)_0%,rgba(6,24,46,0.96)_52%,rgba(4,18,31,1)_100%)] shadow-[0_40px_120px_-60px_rgba(58,168,220,0.55)] sm:rounded-[2rem]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full border border-sky-pale/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 end-10 h-64 w-64 rounded-full border border-dashed border-gold/15"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 end-0 h-56 w-56 bg-[radial-gradient(rgba(201,162,74,0.4)_1px,transparent_1px)] bg-[length:18px_18px] opacity-35 [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_72%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-5 top-5 h-6 w-6 border-s border-t border-gold/45"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 end-5 h-6 w-6 border-e border-b border-gold/45"
          />

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <div className="flex items-center gap-2.5" aria-hidden="true">
                <span className="h-px w-10 bg-gold/70 sm:w-12" />
                <span className="h-1 w-1 rounded-full bg-brand-red" />
              </div>

              <p
                lang="en"
                dir="ltr"
                className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-sky-pale/60 sm:text-[0.68rem]"
              >
                {admissionSection.eyebrow.en}
              </p>

              <h2
                id="admission-title"
                className="mt-5 max-w-xl text-balance text-[2rem] font-extrabold leading-[1.38] text-sand sm:text-[2.5rem] sm:leading-[1.3] lg:text-[2.9rem]"
              >
                {admissionSection.heading.ar}
              </h2>

              <p
                lang="en"
                dir="ltr"
                className="mt-3 max-w-xl text-[0.7rem] font-semibold uppercase leading-6 tracking-[0.2em] text-gold/70 sm:text-xs"
              >
                {admissionSection.heading.en}
              </p>

              <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-sand/65 sm:text-lg sm:leading-9">
                {admissionSection.description.ar}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={school.links.admissionForm}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-14 items-center justify-between gap-4 rounded-full bg-sky px-7 py-4 text-base font-bold text-navy shadow-[0_18px_50px_-20px_rgba(58,168,220,0.75)] transition-colors duration-300 hover:bg-sky-pale"
              >
                <span>{ui.actions.applyNow}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                >
                  <ArrowUpRight size={17} strokeWidth={2} />
                </span>
              </a>

              <a
                href="#contact"
                onClick={handleContactClick}
                className="group inline-flex items-center justify-center gap-3 rounded-full px-4 py-2 text-sm font-semibold text-sand/75 transition-colors duration-300 hover:text-gold"
              >
                {admissionSection.secondaryLabel}
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-gold/50 transition-[width] duration-300 group-hover:w-10"
                />
              </a>

              <p className="text-center text-xs leading-6 text-sand/40">{admissionSection.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdmissionSection
