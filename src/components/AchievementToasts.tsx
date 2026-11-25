import { useEffect } from 'react'
import { useAchievements } from '../lib/achievements'

const SHOW_MS = 4500

function Trophy() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 2h8v4a4 4 0 0 1-8 0V2Z" />
      <path d="M4 3.5H1.5c0 2 1 3 2.5 3.2M12 3.5h2.5c0 2-1 3-2.5 3.2" />
      <path d="M8 10v3M5 14h6" />
    </svg>
  )
}

// One toast at a time (the rest wait in the queue). The wrapper is a permanent
// live region so screen readers pick up each new toast.
export function AchievementToasts() {
  const { toasts, dismissToast } = useAchievements()
  const current = toasts[0]
  const key = current?.key

  useEffect(() => {
    if (key === undefined) return
    const id = window.setTimeout(() => dismissToast(key), SHOW_MS)
    return () => window.clearTimeout(id)
  }, [key, dismissToast])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-[70] sm:right-auto sm:w-[340px]"
    >
      {current && (
        <div
          key={current.key}
          className="toast pointer-events-auto flex items-start gap-3 border border-rule bg-ink p-4 text-paper"
        >
          <div className="min-w-0 flex-1">
            {current.achievement ? (
              <>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] opacity-80">
                  <Trophy />
                  Achievement unlocked
                </p>
                <p className="display mt-2 text-[1.5rem] !leading-none" style={{ fontStretch: '85%' }}>
                  {current.achievement.title}
                </p>
                <p className="mt-2 text-sm leading-snug">{current.achievement.description}</p>
              </>
            ) : (
              <p className="font-mono text-sm leading-snug">{current.text}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(current.key)}
            aria-label="Dismiss notification"
            className="-mr-1 -mt-1 px-1 font-mono text-sm leading-none opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
