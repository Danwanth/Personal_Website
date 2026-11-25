import { play } from '../data/site'
import { KeepyUppy } from './KeepyUppy'
import { Section } from './Section'

export function Play() {
  return (
    <Section id="play" number="05" label="Play">
      <p className="max-w-[68ch]">{play.intro}</p>
      <KeepyUppy />
    </Section>
  )
}
