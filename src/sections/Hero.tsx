import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { stats } from '../data/portfolio';

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5 shadow-2xl backdrop-blur-xl sm:p-7 lg:p-8"
    >
      <div className="grid gap-12 xl:grid-cols-[1fr_250px]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65, ease: 'easeOut' }}
            className="pt-2"
          >
            <h2 className="font-display text-[clamp(4rem,12vw,10.8rem)] font-black uppercase leading-[0.78] tracking-normal text-white">
              Software
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.72)]">
                Engineer
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.5 }}
            className="mt-8 max-w-2xl text-base leading-8 text-white/64 sm:text-lg"
          >
            I design and build intelligent products across AI/ML, full-stack
            engineering, and scalable software systems with a clean, premium user
            experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-volt"
            >
              View work
              <ArrowDownRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white/78 transition duration-300 hover:-translate-y-1 hover:border-ember/50 hover:text-white"
            >
              Contact
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.62 }}
          className="relative hidden min-h-[410px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 p-5 xl:block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(199,255,47,0.2),transparent_34%),radial-gradient(circle_at_25%_75%,rgba(249,109,55,0.24),transparent_34%)]" />
          <motion.div
            className="absolute left-8 top-8 h-28 w-28 rounded-full border border-volt/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-10 right-8 h-32 w-32 rounded-[2rem] border border-ember/50"
            animate={{ rotate: [0, 12, -8, 0], y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-volt">
              Current focus
            </p>
            <p className="mt-3 text-2xl font-black leading-tight text-white">
              Shipping AI-enabled web products with elegant engineering.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
