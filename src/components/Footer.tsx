import { ArrowUp, MapPin } from 'lucide-react'
import type { MouseEvent } from 'react'
import {
  departments,
  footerSection,
  navItems,
  school,
  type SectionId,
} from '../data/school'
import { useSmoothScroll } from './SmoothScroll'

const sectionScrollOffset = 0

/** Facebook is not part of the installed lucide set, so the mark is drawn inline. */
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  )
}

export function Footer() {
  const { scrollTo } = useSmoothScroll()

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    scrollTo(target, { offset: id === 'top' ? 0 : sectionScrollOffset })
  }

  return (
    <footer className="relative isolate overflow-hidden border-t border-gold/25 bg-navy px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(11,79,122,0.4),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 end-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.7fr] lg:gap-10">
          <div>
            <a
              href="#top"
              onClick={(event) => handleSectionClick(event, 'top')}
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg shadow-black/25 ring-1 ring-white/25">
                <img
                  src={school.logo.src}
                  alt={school.logo.alt}
                  loading="lazy"
                  className="h-full w-full rounded-xl object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-extrabold leading-6 text-sand">
                  {school.name.ar}
                </span>
                <span
                  lang="en"
                  dir="ltr"
                  className="mt-1 block text-[0.58rem] font-semibold uppercase leading-4 tracking-[0.2em] text-sand/40"
                >
                  {school.name.en}
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-sand/55">{school.tagline.ar}</p>

            <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-sand/40">
              <MapPin
                aria-hidden="true"
                size={14}
                strokeWidth={1.6}
                className="mt-1 shrink-0 text-gold/60"
              />
              <span>
                {school.address.ar}
                <span
                  lang="en"
                  dir="ltr"
                  className="mt-1 block text-[0.68rem] leading-5 text-sand/30"
                >
                  {school.address.en}
                </span>
              </span>
            </p>
          </div>

          <nav aria-label={footerSection.quickLinksLabel}>
            <h2 className="text-sm font-bold text-sand/70">{footerSection.quickLinksLabel}</h2>
            <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold/40" />
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleSectionClick(event, item.id)}
                    className="group inline-flex items-center gap-2 text-sm text-sand/55 transition-colors duration-300 hover:text-sky-pale"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-gold/40 transition-[width] duration-300 group-hover:w-5"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold text-sand/70">{footerSection.contactLabel}</h2>
            <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold/40" />
            <ul className="mt-5 space-y-3">
              {departments.map((department) => (
                <li key={department.id}>
                  <a
                    href={department.phoneHref}
                    className="group flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="text-sand/50 transition-colors duration-300 group-hover:text-sand/80">
                      {department.nameAr}
                    </span>
                    <span
                      dir="ltr"
                      lang="en"
                      className="text-xs font-semibold tabular-nums text-sand/65 transition-colors duration-300 group-hover:text-sky-pale"
                    >
                      {department.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-sand/70">{footerSection.followLabel}</h2>
            <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold/40" />
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={school.links.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-sand/55 transition-colors duration-300 hover:text-gold"
                >
                  <FacebookGlyph className="h-4 w-4 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                  {footerSection.facebookLabel}
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  onClick={(event) => handleSectionClick(event, 'top')}
                  className="group inline-flex items-center gap-2.5 text-sm text-sand/55 transition-colors duration-300 hover:text-sky-pale"
                >
                  <ArrowUp
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.8}
                    className="text-gold/60"
                  />
                  {footerSection.backToTopLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-6 text-sand/35 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2">
            <span dir="ltr" lang="en">
              © {new Date().getFullYear()}
            </span>
            <span>{school.name.ar}</span>
          </p>
          <p>{footerSection.note}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
