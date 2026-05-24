import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  id: string;
  eyebrow: string;
  title: string;
}>;

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.58, ease: 'easeOut' }}
      className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-7 lg:p-8"
    >
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-volt">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-normal text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-ember/50 to-transparent sm:max-w-xs" />
      </div>
      {children}
    </motion.section>
  );
}
