import type { ReactNode } from 'react'

// External link: opens in a new tab and carries the ↗ character (no icon library).
export function ExtLink({
  href,
  children,
  className = 'link',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  )
}
