import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { experienceHighlights } from '../data/portfolio';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Internships.">
      <div className="relative">
        <div className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-ember via-white/15 to-volt" />
        <div className="space-y-5">
          {experienceHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative pl-14"
            >
              <span className="absolute left-[13px] top-2 h-4 w-4 rounded-full border-4 border-ink bg-volt shadow-lime-glow" />
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/58">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
