import { projects } from '../data/site'
import { ProjectItem } from './Projects'
import { Section } from './Section'

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured)
  return (
    <Section id="selected-work" number="01" label="Selected work">
      <ol>
        {featured.map((p) => (
          <ProjectItem key={p.title} p={p} compact />
        ))}
      </ol>
      <p className="mt-2 border-t border-rule pt-6 font-mono text-sm">
        <a href="/projects" className="link">
          All {projects.length} projects <span aria-hidden="true">→</span>
        </a>
      </p>
    </Section>
  )
}
