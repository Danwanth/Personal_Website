import { achievementList, pages, projects, work } from '../data/site'
import { BEST_KEY, useAchievements } from '../lib/achievements'
import { readStorage } from '../lib/storage'
import { Section } from './Section'

function bestScore(): number {
  const n = parseInt(readStorage(BEST_KEY) ?? '', 10)
  return Number.isFinite(n) && n > 0 ? n : 0
}

// The index of the other pages. The Play hint is read live: best score from
// localStorage and the achievements count from the achievements context.
export function AroundTheSite() {
  const { unlocked } = useAchievements()
  const hints: Record<string, string> = {
    work: `${work.experience.length} internships`,
    projects: `${projects.length} projects`,
    play: `Best ${bestScore()} · ${unlocked.size}/${achievementList.length}`,
  }
  return (
    <Section id="around" number="02" label="Around the site">
      <ul className="border-b border-rule">
        {pages
          .filter((p) => p.key !== 'home')
          .map((p) => (
            <li key={p.key} className="border-t border-rule">
              <a
                href={p.href}
                className="group block py-5 sm:grid sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6"
              >
                <span className="block font-display text-[1.5rem] font-bold leading-tight transition-colors duration-150 group-hover:text-accent">
                  {p.label}
                </span>
                <span className="mt-1 block text-muted sm:mt-0">{p.blurb}</span>
                <span className="mt-2 block font-mono text-xs text-muted sm:mt-0 sm:text-right sm:text-[0.8125rem]">
                  {hints[p.key] ?? p.hint}
                </span>
              </a>
            </li>
          ))}
      </ul>
    </Section>
  )
}
