import type { Player } from '../data/site'

// Vertical line-drawn pitch, 68 x 105 (metres), attack at the top. The SVG is
// the drawing; players are real <button>s positioned over it in percent, so
// they are focusable and accessible. viewBox has a 1-unit margin so the outer
// stroke is never clipped.
const VB_W = 70
const VB_H = 107

function px(x: number): string {
  return `${((1 + (x / 100) * 68) / VB_W) * 100}%`
}
function py(y: number): string {
  return `${((1 + (y / 100) * 105) / VB_H) * 100}%`
}

export function Pitch({
  players,
  selected,
  onSelect,
}: {
  players: Player[]
  selected: string
  onSelect: (skill: string) => void
}) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:mx-0" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg
        viewBox={`-1 -1 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full text-rule"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
        focusable="false"
      >
        <g vectorEffect="non-scaling-stroke">
          <rect x="0" y="0" width="68" height="105" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="52.5" x2="68" y2="52.5" vectorEffect="non-scaling-stroke" />
          <circle cx="34" cy="52.5" r="9.15" vectorEffect="non-scaling-stroke" />
          {/* penalty boxes and six-yard boxes */}
          <rect x="13.84" y="0" width="40.32" height="16.5" vectorEffect="non-scaling-stroke" />
          <rect x="24.84" y="0" width="18.32" height="5.5" vectorEffect="non-scaling-stroke" />
          <rect x="13.84" y="88.5" width="40.32" height="16.5" vectorEffect="non-scaling-stroke" />
          <rect x="24.84" y="99.5" width="18.32" height="5.5" vectorEffect="non-scaling-stroke" />
          {/* penalty arcs */}
          <path d="M26.688 16.5 A9.15 9.15 0 0 0 41.312 16.5" vectorEffect="non-scaling-stroke" />
          <path d="M26.688 88.5 A9.15 9.15 0 0 1 41.312 88.5" vectorEffect="non-scaling-stroke" />
          {/* corner arcs */}
          <path d="M0 1 A1 1 0 0 0 1 0" vectorEffect="non-scaling-stroke" />
          <path d="M67 0 A1 1 0 0 0 68 1" vectorEffect="non-scaling-stroke" />
          <path d="M68 104 A1 1 0 0 0 67 105" vectorEffect="non-scaling-stroke" />
          <path d="M1 105 A1 1 0 0 0 0 104" vectorEffect="non-scaling-stroke" />
        </g>
        {/* centre spot and penalty spots */}
        <g fill="currentColor" stroke="none">
          <circle cx="34" cy="52.5" r="0.6" />
          <circle cx="34" cy="11" r="0.6" />
          <circle cx="34" cy="94" r="0.6" />
        </g>
      </svg>

      {players.map((p) => {
        const isSelected = p.skill === selected
        return (
          <button
            key={p.skill}
            type="button"
            aria-pressed={isSelected}
            aria-label={`No. ${p.number}, ${p.skill}${p.captain ? ', captain' : ''}`}
            onMouseEnter={() => onSelect(p.skill)}
            onFocus={() => onSelect(p.skill)}
            onClick={() => onSelect(p.skill)}
            className="absolute flex w-max flex-col items-center"
            style={{ left: px(p.x), top: py(p.y), transform: 'translate(-50%, -18px)' }}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-accent-ink">
              {isSelected && (
                <span className="pointer-events-none absolute -inset-[5px] rounded-full border-[1.5px] border-accent" />
              )}
              {p.number}
              {p.captain && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-paper bg-ink font-mono text-[9px] leading-none text-paper"
                >
                  C
                </span>
              )}
            </span>
            <span className="mt-1.5 font-mono text-xs leading-none text-ink">{p.skill}</span>
          </button>
        )
      })}
    </div>
  )
}
