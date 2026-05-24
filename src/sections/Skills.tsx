import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { skills } from '../data/portfolio';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Modern engineering stack.">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -5, borderColor: 'rgba(199,255,47,0.45)' }}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] text-ember transition duration-300 group-hover:bg-volt group-hover:text-black">
              <skill.icon size={20} />
            </span>
            <span className="text-base font-bold text-white/82">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
