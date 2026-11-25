import { about, interests } from '../data/site'
import { Section } from './Section'

export function About() {
  const { watching, playing, riding } = interests
  return (
    <>
      <Section id="about" number="01" label="About">
        <div className="max-w-[68ch] space-y-5">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="interests" number="02" label="Interests">
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
    </>
  )
}
