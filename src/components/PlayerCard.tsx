import { useState } from 'react'
import { hero, profile, projects, work } from '../data/site'

const { card } = hero

// The stats come from the data, not from the card copy.
const stats = [
  { label: 'Apps', value: String(work.experience.length), sub: 'internships' },
  { label: 'Goals', value: String(projects.length), sub: 'projects' },
  { label: 'Trophies', value: String(work.trophies), sub: 'hackathon win' },
  { label: 'Rating', value: profile.cgpa, sub: 'CGPA' },
]

// A matchday-programme player panel: hairline border, square corners, no
// shadow. "Scouting report" swaps the body for the back side; both sides sit
// in one grid cell, so the card never changes size.
export function PlayerCard() {
  const [back, setBack] = useState(false)

  // Inactive side: invisible (so it also leaves the accessibility tree) but
  // still takes up its space.
  const side = (active: boolean) =>
    `col-start-1 row-start-1 motion-safe:transition-[opacity,visibility] motion-safe:duration-150 ${
      active ? 'opacity-100' : 'invisible opacity-0'
    }`

  return (
    <aside
      aria-label="Player profile"
      className="w-full max-w-[28rem] border border-ink bg-paper text-ink lg:max-w-none"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-rule px-4 py-2.5">
        <p className="label !text-[0.6875rem] sm:!text-xs">{back ? 'Scouting report' : 'Player profile'}</p>
        <p className="label !text-[0.6875rem] sm:!text-xs">{card.season}</p>
      </div>

      <div aria-live="polite" className="grid">
        {/* Front */}
        <div className={side(!back)}>
          <div className="flex items-center gap-4 px-4 py-4">
            <p
              className="display shrink-0 text-[5.5rem] text-accent"
              aria-hidden="true"
            >
              {card.number}
            </p>
            <div className="min-w-0">
              <p className="display text-[1.5rem]">
                <span className="sr-only">Number {card.number}, </span>
                {card.shortName}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">{card.role}</p>
            </div>
          </div>

          <dl className="kv border-t border-rule px-4 py-4 text-[0.9375rem] leading-snug">
            <div>
              <dt>Club</dt>
              <dd>{card.club}</dd>
            </div>
            <div>
              <dt>Former clubs</dt>
              <dd>{card.formerClubs}</dd>
            </div>
            <div>
              <dt>Preferred foot</dt>
              <dd>{card.foot}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="text-accent">{card.status}</dd>
            </div>
          </dl>

          <dl className="stats-grid grid grid-cols-2 gap-x-4 gap-y-5 border-t border-rule px-4 py-4 min-[400px]:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[0.6875rem] uppercase leading-none tracking-[0.08em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5">
                  <span className="display block text-[2.25rem] leading-none">{s.value}</span>
                  <span className="mt-1.5 block font-mono text-[0.6875rem] leading-tight text-muted">
                    {s.sub}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Back */}
        <div className={side(back)}>
          <dl className="kv px-4 py-4 text-[0.9375rem] leading-snug">
            {card.scouting.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-rule px-4 py-3">
        <button type="button" className="text-button" aria-pressed={back} onClick={() => setBack((b) => !b)}>
          {back ? 'Player profile' : 'Scouting report'}
          <span aria-hidden="true"> ↻</span>
        </button>
      </div>
    </aside>
  )
}
