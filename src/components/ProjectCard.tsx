import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../data/portfolio';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-carbon p-5 shadow-2xl transition duration-300 hover:border-ember/40 sm:p-6"
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-ember/0 blur-2xl transition duration-500 group-hover:bg-ember/18" />
      <div className="relative z-10">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-volt">
            <ArrowUpRight size={22} />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <ArrowUpRight size={16} />
                Live App
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/70 transition duration-300 hover:border-volt/50 hover:bg-volt hover:text-black"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>

        <h3 className="font-display text-2xl font-black tracking-normal text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/58">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/55"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
