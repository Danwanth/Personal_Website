import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { projects } from '../data/portfolio';

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
