import { useState } from 'react'
import { useAchievements } from '../lib/achievements'

// Shared by the achievements dialog and the inline list on /play. Both read
// the same context, so they update live when something unlocks.
export function AchievementItems() {
  const { list, unlocked } = useAchievements()
  return (
    <ul className="border-t border-rule">
      {list.map((a) => {
        const done = unlocked.has(a.id)
        return (
          <li key={a.id} className="border-b border-rule py-3">
            {done ? (
              <>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm">{a.description}</p>
              </>
            ) : (
              <>
                <p className="font-mono">
                  <span aria-hidden="true">???</span>
                  <span className="sr-only">Locked</span>
                </p>
                <p className="text-sm text-muted">{a.hint}</p>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function ResetControl() {
  const { reset } = useAchievements()
  const [confirming, setConfirming] = useState(false)
  return (
    <div className="font-mono text-xs text-muted">
      {confirming ? (
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Clear achievements and best score?</span>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              reset()
              setConfirming(false)
            }}
          >
            Yes, reset
          </button>
          <button type="button" className="text-button" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </p>
      ) : (
        <button type="button" className="text-button" onClick={() => setConfirming(true)}>
          Reset
        </button>
      )}
    </div>
  )
}
