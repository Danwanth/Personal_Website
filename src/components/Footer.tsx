import { footer } from '../data/site'

// The achievements counter is a placeholder for now: it is wired to the
// achievements dialog in M5 (pass `onOpenAchievements`).
export function Footer({ onOpenAchievements }: { onOpenAchievements?: () => void }) {
  return (
    <footer className="wrap">
      <div className="space-y-2 border-t border-rule py-8 font-mono text-xs leading-relaxed text-muted">
        <p>{footer.credit}</p>
        <p>
          <button
            type="button"
            className="text-button"
            data-achievements-trigger
            onClick={onOpenAchievements}
          >
            Achievements {footer.achievementsCount}/{footer.achievementsTotal}
          </button>
          <span aria-hidden="true"> · </span>
          <span>{footer.hint}</span>
        </p>
      </div>
    </footer>
  )
}
