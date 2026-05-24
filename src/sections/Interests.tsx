import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { interests } from '../data/portfolio';

export function Interests() {
  return (
    <Section id="interests" eyebrow="Interests" title="Beyond the build.">
      <div className="grid gap-4 lg:grid-cols-2">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
            className="rounded-[1.35rem] border border-white/10 bg-black/22 p-5"
          >
            <h3 className="text-xl font-black text-white">{interest.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {interest.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/65 transition hover:border-volt/45 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
