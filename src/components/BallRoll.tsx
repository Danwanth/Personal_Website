import { ballShapes } from '../game/ball'

const pts = (p: [number, number][]) => p.map((q) => q.join(',')).join(' ')

// The same football as the game, drawn as SVG (viewBox -1..1). It rolls across
// the bottom of the viewport once, then calls onDone. With reduced motion the
// parent never mounts it.
export function BallRoll({ onDone }: { onDone: () => void }) {
  const s = ballShapes(0)
  return (
    <div
      aria-hidden="true"
      className="ball-roll pointer-events-none fixed bottom-3 left-0 z-[80] h-14 w-14"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onDone()
      }}
    >
      <svg viewBox="-1.06 -1.06 2.12 2.12" className="block h-full w-full">
        <defs>
          <clipPath id="ball-clip">
            <circle r="1" />
          </clipPath>
        </defs>
        <circle r="1" fill="var(--ball-fill)" />
        <g clipPath="url(#ball-clip)" fill="var(--ball-ink)" stroke="var(--ball-ink)" strokeWidth="0.06">
          <polygon points={pts(s.centre)} stroke="none" />
          {s.edges.map((p, i) => (
            <polygon key={i} points={pts(p)} stroke="none" />
          ))}
          {s.seams.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} fill="none" />
          ))}
        </g>
        <circle r="1" fill="none" stroke="var(--ball-ink)" strokeWidth="0.09" />
      </svg>
    </div>
  )
}
