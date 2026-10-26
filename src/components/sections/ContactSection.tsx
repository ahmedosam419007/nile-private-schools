import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useRef } from 'react'
import { contactSection, departments, school } from '../../data/school'
import { SectionHeading } from './SectionHeading'
import { useSectionReveal } from './useSectionReveal'

/** Facebook is not part of the installed lucide set, so the mark is drawn inline. */
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useSectionReveal(sectionRef, {
    targets: '[data-reveal="heading"]',
    y: 24,
  })

  useSectionReveal(sectionRef, {
    targets: '[data-department-card]',
    trigger: '[data-departments-grid]',
    y: 28,
    stagger: 0.08,
    start: 'top 84%',
  })

  useSectionReveal(sectionRef, {
    targets: '[data-reveal="location"]',
    trigger: '[data-reveal="location"]',
    y: 24,
  })

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-white/5 bg-navy-deep/25 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(58,168,220,0.12),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(11,79,122,0.3),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 end-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div data-reveal="heading">
          <SectionHeading
            eyebrow={contactSection.eyebrow.en}
            title={contactSection.heading.ar}
            titleId="contact-title"
            subtitle={contactSection.heading.en}
            intro={contactSection.intro.ar}
          />
        </div>

        <p className="mt-14 text-sm font-bold text-sand/50">{contactSection.departmentsLabel}</p>

        <div
          data-departments-grid
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {departments.map((department) => (
            <div key={department.id} data-department-card className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.9)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_28px_70px_-38px_rgba(58,168,220,0.35)] sm:p-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-14 end-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(58,168,220,0.16),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold leading-snug text-sand">
                      {department.nameAr}
                    </h3>
                    <p
                      lang="en"
                      dir="ltr"
                      className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-sand/40"
                    >
                      {department.nameEn}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06] text-gold/80"
                  >
                    <Phone size={15} strokeWidth={1.6} />
                  </span>
                </div>

                <p
                  dir="ltr"
                  lang="en"
                  className="relative mt-5 text-lg font-bold tracking-[0.06em] text-sky-pale tabular-nums"
                >
                  {department.phone}
                </p>

                <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <a
                    href={department.phoneHref}
                    aria-label={`${contactSection.actions.call} — ${department.nameAr}`}
                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-sky/30 bg-sky/10 px-3 text-[0.7rem] font-bold text-sky-pale transition-colors duration-300 hover:bg-sky hover:text-navy"
                  >
                    <Phone aria-hidden="true" size={13} strokeWidth={2} />
                    {contactSection.actions.call}
                  </a>
                  <a
                    href={department.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${contactSection.actions.whatsapp} — ${department.nameAr}`}
                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-3 text-[0.7rem] font-bold text-sand/75 transition-colors duration-300 hover:border-gold/45 hover:text-gold"
                  >
                    <MessageCircle aria-hidden="true" size={13} strokeWidth={2} />
                    {contactSection.actions.whatsapp}
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div data-reveal="location" className="mt-5 lg:mt-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-gold/20 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 backdrop-blur-md sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold"
              >
                <MapPin size={20} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs font-bold text-sand/45">{contactSection.addressLabel}</p>
                <p className="mt-1.5 text-base font-semibold leading-7 text-sand sm:text-lg">
                  {school.address.ar}
                </p>
                <p
                  lang="en"
                  dir="ltr"
                  className="mt-1 text-xs leading-6 text-sand/45 sm:text-sm"
                >
                  {school.address.en}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
              <a
                href={school.links.location}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sky px-5 text-sm font-bold text-navy transition-colors duration-300 hover:bg-sky-pale"
              >
                <MapPin aria-hidden="true" size={15} strokeWidth={2} />
                {contactSection.actions.map}
                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                />
              </a>
              <a
                href={school.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-bold text-sand/80 transition-colors duration-300 hover:border-gold/45 hover:text-gold"
              >
                <FacebookGlyph className="h-4 w-4" />
                {contactSection.actions.facebook}
                <ArrowUpRight aria-hidden="true" size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
