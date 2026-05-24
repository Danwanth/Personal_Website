export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_32%)]" />
      <div className="absolute inset-0 bg-radial-grid bg-[length:32px_32px] opacity-[0.055]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.07] to-transparent" />
      <div className="absolute -left-24 top-24 h-56 w-56 rounded-full bg-ember/12 blur-2xl" />
      <div className="absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-volt/8 blur-2xl" />
    </div>
  );
}
