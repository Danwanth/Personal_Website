import { motion } from 'framer-motion';
import type { Stat } from '../data/portfolio';

type StatCardProps = {
  stat: Stat;
  index: number;
};

export function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 + index * 0.1, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl"
    >
      <p className="font-display text-4xl font-black tracking-normal text-white">{stat.value}</p>
      <p className="mt-2 text-sm font-medium text-white/55">{stat.label}</p>
    </motion.div>
  );
}
