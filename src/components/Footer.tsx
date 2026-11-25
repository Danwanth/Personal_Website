import { footer } from '../data/site'
import { useAchievements } from '../lib/achievements'

export function Footer() {
  const { unlocked, total, openDialog } = useAchievements()
  return (
    <footer className="wrap">
      <div className="space-y-2 border-t border-rule py-8 font-mono text-xs leading-relaxed text-muted">
        <p>{footer.credit}</p>
        <p>
          <button type="button" className="text-button" data-achievements-trigger onClick={openDialog}>
            Achievements {unlocked.size}/{total}
          </button>
          <span aria-hidden="true"> · </span>
          <span>{footer.hint}</span>
        </p>
      </div>
    </footer>
  )
}
