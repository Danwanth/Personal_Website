import { motion } from 'framer-motion';

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_32%)]" />
      <div className="absolute inset-0 bg-radial-grid bg-[length:32px_32px] opacity-[0.055]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.07] to-transparent" />
      <motion.div
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-ember/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-volt/12 blur-3xl"
        animate={{ x: [0, -35, 0], y: [0, -20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
