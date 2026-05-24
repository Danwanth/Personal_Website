import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="relative grid h-28 w-28 place-items-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10"
          animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.08, 0.35] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-ember/70 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <span className="font-display text-xl font-black tracking-normal text-volt">DY</span>
      </div>
    </motion.div>
  );
}
