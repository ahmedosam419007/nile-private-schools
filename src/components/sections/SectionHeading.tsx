interface SectionHeadingProps {
  /** Small uppercase English label above the title. */
  eyebrow: string
  title: string
  titleId?: string
  /** English rendering of the title, shown as an editorial sub-line. */
  subtitle?: string
  intro?: string
  align?: 'start' | 'center'
}

/**
 * Shared editorial heading for the page sections: a tracked English eyebrow
 * with a gold rule and a restrained red dot, a large Arabic title, an optional
 * English sub-line and an optional Arabic introduction.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  subtitle,
  intro,
  align = 'start',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'flex flex-col items-center text-center' : 'flex flex-col items-start text-start'}>
      <div className="flex items-center gap-2.5" aria-hidden="true">
        <span className="h-px w-10 bg-gold/70 sm:w-12" />
        <span className="h-1 w-1 rounded-full bg-brand-red" />
      </div>

      <p
        lang="en"
        dir="ltr"
        className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-sky-pale/60 sm:text-[0.68rem]"
      >
        {eyebrow}
      </p>

      <h2
        id={titleId}
        className="mt-5 max-w-3xl text-balance text-[2rem] font-extrabold leading-[1.38] text-sand sm:text-[2.5rem] sm:leading-[1.32] lg:text-[2.9rem]"
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          lang="en"
          dir="ltr"
          className="mt-3 max-w-2xl text-[0.7rem] font-semibold uppercase leading-6 tracking-[0.2em] text-gold/70 sm:text-xs"
        >
          {subtitle}
        </p>
      ) : null}

      {intro ? (
        <p
          className={`mt-6 max-w-2xl text-[0.98rem] leading-8 text-sand/65 sm:text-lg sm:leading-9 ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
