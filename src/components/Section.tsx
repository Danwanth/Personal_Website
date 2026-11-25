import type { ReactNode } from 'react'

// Shared section shell: hairline on top, label in columns 1-3 and content in
// columns 4-12 from lg up; the label stacks above the content below that.
// `number` is optional (the contact band has none). `compact` trims the top
// padding so the content starts higher (used for the game on /play).
export function Section({
  id,
  number,
  label,
  compact = false,
  children,
}: {
  id: string
  number?: string
  label: string
  compact?: boolean
  children: ReactNode
}) {
  const pad = compact ? 'pt-8 pb-16 lg:pb-24' : 'py-16 lg:py-24'
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="wrap">
      <div className={`border-t border-rule ${pad} lg:grid lg:grid-cols-12 lg:gap-x-8`}>
        <h2 id={`${id}-label`} className="label mb-8 font-normal lg:col-span-3 lg:mb-0 lg:pt-1">
          {number ? `${number} — ` : ''}
          {label}
        </h2>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}
