import { nav, profile } from '../data/site'
import { ThemeToggle } from './ThemeToggle'

// `base` is "" on the main page and "/" on the 404 page so anchors still resolve.
export function Header({ base = '' }: { base?: string }) {
  return (
    <header className="border-b border-rule">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-2 focus:bg-paper focus:px-2 focus:py-1"
      >
        Skip to content
      </a>
      <div className="wrap flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4">
        <a
          href={`${base}#top`}
          className="display text-[1.25rem] leading-none tracking-[0.01em]"
        >
          {profile.name}
        </a>
        <div className="order-2 sm:order-3">
          <ThemeToggle />
        </div>
        <nav
          aria-label="Sections"
          className="order-3 flex w-full gap-x-5 sm:order-2 sm:w-auto sm:gap-x-6"
        >
          {nav.map((item) => (
            <a key={item.href} href={`${base}${item.href}`} className="label hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
