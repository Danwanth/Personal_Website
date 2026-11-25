import { nav, profile, type PageKey } from '../data/site'
import { ThemeToggle } from './ThemeToggle'

// `current` marks the page you are on (aria-current + ink text + accent underline).
export function Header({ current }: { current?: PageKey }) {
  return (
    <header className="border-b border-rule" style={{ viewTransitionName: 'site-header' }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-2 focus:bg-paper focus:px-2 focus:py-1"
      >
        Skip to content
      </a>
      <div className="wrap flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4">
        <a href="/" className="display text-[1.25rem] leading-none tracking-[0.01em]">
          {profile.name}
        </a>
        <div className="order-2 sm:order-3">
          <ThemeToggle />
        </div>
        <nav
          aria-label="Pages"
          className="order-3 flex w-full gap-x-3.5 sm:order-2 sm:w-auto sm:gap-x-6"
        >
          {nav.map((item) => {
            const active = item.key === current
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`label border-b pb-0.5 transition-colors duration-150 hover:text-accent ${
                  active ? 'border-accent text-ink' : 'border-transparent'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
