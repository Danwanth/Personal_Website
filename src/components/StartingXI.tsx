import { useState } from 'react'
import { players, skills } from '../data/site'
import { Pitch } from './Pitch'
import { Section } from './Section'

export function StartingXI() {
  const [selected, setSelected] = useState<string>(skills.defaultSkill)
  const player = players.find((p) => p.skill === selected) ?? players[0]

  return (
    <Section id="skills" number="01" label="Line-up">
      <div className="lg:grid lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-x-10">
        <Pitch players={players} selected={selected} onSelect={setSelected} />

        <div className="mt-8 lg:mt-0">
          <p aria-live="polite" className="min-h-[3.3em] max-w-[68ch] font-mono text-sm leading-relaxed">
            No. {player.number} · {player.skill}
            {player.captain ? ' (captain)' : ''}: {player.role}
          </p>

          <div className="mt-8 border-t border-rule pt-6">
            <h3 className="label font-normal">Bench</h3>
            <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed">
              {skills.bench.join(' · ')}
            </p>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <h3 className="label font-normal">Full list</h3>
            <dl className="mt-2 space-y-1.5 text-[0.9375rem]">
              {skills.fullList.map((row) => (
                <div key={row.label} className="sm:grid sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-x-4 lg:block">
                  <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted sm:pt-1 lg:pt-0">
                    {row.label}
                  </dt>
                  <dd>{row.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  )
}
