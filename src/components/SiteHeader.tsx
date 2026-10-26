import { AnimatePresence, motion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { navItems, school, ui, type SectionId } from '../data/school'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSmoothScroll } from './SmoothScroll'

// `scroll-padding-top` on <html> already lands the section under the fixed
// header, so the JS offset must be zero (an offset here would double-count).
const sectionScrollOffset = 0
const primaryCtaClasses =
  'inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-sky px-5 py-2.5 text-sm font-bold text-navy shadow-lg shadow-sky/10 transition-colors duration-300 hover:bg-sky-pale'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollTo, setStopped } = useSmoothScroll()

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 40)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const closeMenuOnDesktop = () => {
      if (desktopQuery.matches) setIsMenuOpen(false)
    }
    desktopQuery.addEventListener('change', closeMenuOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeMenuOnDesktop)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const root = document.documentElement
    const menuButton = menuButtonRef.current
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    // Keep background content out of the tab order while the menu is open; the
    // header stays interactive so the close button and logo remain reachable.
    const main = document.querySelector('main')
    if (main) main.inert = true
    setStopped(true)
    mobilePanelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      root.style.overflow = previousOverflow
      if (main) main.inert = false
      setStopped(false)
      window.removeEventListener('keydown', closeOnEscape)
      menuButton?.focus()
    }
  }, [isMenuOpen, setStopped])

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    setIsMenuOpen(false)
    setStopped(false)
    scrollTo(target, { offset: id === 'top' ? 0 : sectionScrollOffset })
  }

  const hasSurface = isScrolled || isMenuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          hasSurface
            ? 'border-white/10 bg-navy/85 shadow-xl shadow-navy/20 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            onClick={(event) => handleSectionClick(event, 'top')}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-black/15 ring-1 ring-white/30 sm:h-12 sm:w-12">
              <img
                src={school.logo.src}
                alt={school.logo.alt}
                className="h-full w-full rounded-lg object-contain"
              />
            </span>
            <span className="max-w-44 text-xs font-bold leading-5 text-sand sm:max-w-none sm:text-sm lg:text-base">
              {school.name.ar}
            </span>
          </a>

          <nav
            aria-label={ui.header.navigation}
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleSectionClick(event, item.id)}
                className="whitespace-nowrap text-sm font-semibold text-sand/75 transition-colors duration-300 hover:text-sky-pale"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={school.links.admissionForm}
              target="_blank"
              rel="noreferrer"
              className={`${primaryCtaClasses} hidden md:inline-flex`}
            >
              {ui.actions.applyNow}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? ui.header.closeMenu : ui.header.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sand transition-colors duration-300 hover:bg-white/10 lg:hidden"
            >
              {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
          <motion.div
            className="h-full w-full origin-[100%_50%] bg-sky"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="mobile-menu"
            ref={mobilePanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.header.mobileNavigation}
            data-lenis-prevent=""
            className="fixed inset-0 z-40 overflow-y-auto bg-navy px-6 pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeOut' }}
          >
            <nav
              aria-label={ui.header.mobileNavigation}
              className="mx-auto flex min-h-full w-full max-w-lg flex-col"
            >
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => handleSectionClick(event, item.id)}
                    className="border-b border-white/10 py-5 text-2xl font-bold text-sand transition-colors duration-300 hover:text-sky-pale"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a
                href={school.links.admissionForm}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className={`${primaryCtaClasses} mt-8 w-full`}
              >
                {ui.actions.applyNow}
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
