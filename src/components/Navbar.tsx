import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../data/portfolio';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.08] bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-black transition-transform duration-300 group-hover:rotate-6">
            DY
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/70 sm:block">
            Danwanth Yogesh
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/62 transition duration-300 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-black shadow-lime-glow transition duration-300 hover:-translate-y-0.5 hover:bg-white lg:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white md:hidden"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-ink/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
