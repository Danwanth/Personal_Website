import { play } from '../data/site'
import { useAchievements } from '../lib/achievements'
import { AchievementItems, ResetControl } from './AchievementParts'
import { KeepyUppy } from './KeepyUppy'
import { Section } from './Section'

export function Play() {
  const { unlocked, total } = useAchievements()
  return (
    <>
      <Section id="keepy-uppy" number="01" label="Keepy-uppy" compact>
        <KeepyUppy />
        <p className="mt-4 font-mono text-xs text-muted sm:text-[0.8125rem]">{play.keyboard}</p>
      </Section>

      <Section id="achievements" number="02" label="Achievements">
        <p className="label mb-4" aria-live="polite">
          {unlocked.size} / {total} unlocked
        </p>
        <div className="max-w-[40rem]">
          <AchievementItems />
          <div className="mt-5">
            <ResetControl />
          </div>
        </div>
      </Section>
    </>
  )
}
