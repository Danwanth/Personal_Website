import { play } from '../data/site'
import { Section } from './Section'

// M4 replaces the placeholder box below (the element with data-game-slot)
// with <KeepyUppy />. The section label and intro text stay.
export function Play() {
  return (
    <Section id="play" number="05" label="Play">
      <p className="max-w-[68ch]">{play.intro}</p>
      <div
        data-game-slot
        className="mt-8 flex h-80 items-center justify-center border border-rule font-mono text-xs text-muted sm:h-[380px]"
      >
        The game goes here.
      </div>
    </Section>
  )
}
