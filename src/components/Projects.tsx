import { projects } from '../data/site'
import { ExtLink } from './ExtLink'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" number="03" label="Projects">
      <ol>
        {projects.map((p) => {
          const primary = p.live ?? p.code
          return (
            <li key={p.title} className="border-t border-rule py-9 first:border-t-0 first:pt-0">
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
              <p className="mt-2 max-w-[68ch] text-muted">{p.detail}</p>
              {(p.live || p.code) && (
                <p className="mt-4 flex gap-x-6 font-mono text-sm">
                  {p.live && <ExtLink href={p.live}>Live</ExtLink>}
                  {p.code && <ExtLink href={p.code}>Code</ExtLink>}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
