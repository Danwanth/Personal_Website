import { interests } from '../data/site'
import { Section } from './Section'

export function OffThePitch() {
  const { watching, playing, riding } = interests
  return (
    <Section id="interests" number="06" label="Off the pitch">
      <div className="grid gap-10 md:grid-cols-3 md:gap-x-8">
        <div>
          <h3 className="label font-normal">{watching.label}</h3>
          <p className="mt-2">{watching.text}</p>
        </div>
        <div>
          <h3 className="label font-normal">{playing.label}</h3>
          <p className="mt-2">{playing.text}</p>
          <dl className="mt-4 space-y-1 font-mono text-[0.8125rem]">
            {playing.tags.map((t) => (
              <div key={t.platform} className="flex flex-wrap gap-x-4">
                <dt className="w-24 shrink-0 text-muted">{t.platform}</dt>
                <dd className="break-all">{t.tag}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="label font-normal">{riding.label}</h3>
          <p className="mt-2">{riding.text}</p>
        </div>
      </div>
    </Section>
  )
}
