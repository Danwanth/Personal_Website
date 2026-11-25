import { useEffect, useRef, useState } from 'react'
import { useAchievements } from '../lib/achievements'

export function AchievementsDialog() {
  const { list, unlocked, total, dialogOpen, closeDialog, reset } = useAchievements()
  const ref = useRef<HTMLDialogElement>(null)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (dialogOpen && !el.open) el.showModal()
    if (!dialogOpen && el.open) el.close()
    if (!dialogOpen) setConfirming(false)
  }, [dialogOpen])

  return (
    <dialog
      ref={ref}
      aria-labelledby="ach-title"
      onClose={closeDialog}
      onClick={(e) => {
        if (e.target === ref.current) closeDialog() // click on the backdrop
      }}
      className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-[30rem] overflow-y-auto border border-ink bg-paper p-0 text-ink"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="ach-title" className="display text-[2rem]">
            Achievements
          </h2>
          <button type="button" className="text-button" onClick={closeDialog}>
            Close
          </button>
        </div>
        <p className="label mt-2">
          {unlocked.size} / {total} unlocked
        </p>
        <ul className="mt-5 border-t border-rule">
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
        <div className="mt-5 font-mono text-xs text-muted">
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
      </div>
    </dialog>
  )
}
