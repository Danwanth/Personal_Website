import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { gamertags } from '../data/portfolio';

export function Gamertags() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.section
      id="gamertags"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="scroll-mt-28 rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl sm:p-5"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="gamertag-list"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-left transition duration-300 hover:border-volt/40 hover:bg-white/[0.055]"
      >
        <span className="inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-volt text-black shadow-lime-glow">
            <Gamepad2 size={21} />
          </span>
          <span>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ember">
              Gamertags
            </span>
            <span className="mt-1 block text-base font-black text-white">Gaming IDs</span>
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/55 transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.ul
            id="gamertag-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-3 flex flex-wrap gap-2 overflow-hidden"
          >
            {gamertags.map((gamertag) => (
              <li
                key={gamertag.platform}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs font-semibold text-white/70"
              >
                <span className="text-volt">{gamertag.platform}:</span>{' '}
                <span>{gamertag.tag}</span>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
