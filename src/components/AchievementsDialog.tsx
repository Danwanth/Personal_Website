import { useEffect, useRef } from 'react'
import { useAchievements } from '../lib/achievements'
import { AchievementItems, ResetControl } from './AchievementParts'

export function AchievementsDialog() {
  const { unlocked, total, dialogOpen, closeDialog } = useAchievements()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (dialogOpen && !el.open) el.showModal()
    if (!dialogOpen && el.open) el.close()
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
        <div className="mt-5">
          <AchievementItems />
        </div>
        <div className="mt-5">
          {/* Remounted on each open so a half-finished confirm never lingers. */}
          {dialogOpen && <ResetControl />}
        </div>
      </div>
    </dialog>
  )
}
