import { projects, type Project } from '../data/site'
import { ExtLink } from './ExtLink'
import { Section } from './Section'

// One project row. `compact` is the home-page version: no long detail.
export function ProjectItem({ p, compact = false }: { p: Project; compact?: boolean }) {
  const primary = p.live ?? p.code
  return (
    <li className={`border-t border-rule first:border-t-0 first:pt-0 ${compact ? 'py-7' : 'py-9'}`}>
      <p className="font-mono text-xs text-muted sm:text-[0.8125rem]">
        {[p.meta, ...p.stack].join(' · ')}
      </p>
      <h3 className="mt-2 font-display text-[1.75rem] font-bold leading-tight">
        {primary ? (
          <a href={primary} target="_blank" rel="noopener noreferrer" className="link">
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </h3>
      <p className="mt-3 max-w-[68ch]">{p.summary}</p>
      {!compact && <p className="mt-2 max-w-[68ch] text-muted">{p.detail}</p>}
      {(p.live || p.code) && (
        <p className={`flex gap-x-6 font-mono text-sm ${compact ? 'mt-3' : 'mt-4'}`}>
          {p.live && <ExtLink href={p.live}>Live</ExtLink>}
          {p.code && <ExtLink href={p.code}>Code</ExtLink>}
        </p>
      )}
    </li>
  )
}

export function ProjectList() {
  return (
    <ol>
      {projects.map((p) => (
        <ProjectItem key={p.title} p={p} />
      ))}
    </ol>
  )
}

export function Projects() {
  return (
    <Section id="projects" number="03" label="Projects">
      <ProjectList />
    </Section>
  )
}
