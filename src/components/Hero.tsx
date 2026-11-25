import { hero, profile } from '../data/site'
import { ExtLink } from './ExtLink'
import { LocalClock } from './LocalClock'
import { PlayerCard } from './PlayerCard'

export function Hero() {
  return (
    <section
      id="top"
      className="wrap pb-16 pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-24 lg:pt-16"
      aria-label="Introduction"
    >
      <div className="min-w-0 lg:col-span-7">
        <h1 className="display hero-name text-[clamp(3.25rem,11vw,7.5rem)] lg:text-[clamp(3.5rem,9.5vw,7.5rem)]">
          <span className="block">Danwanth</span>
          <span className="block">Yogesh</span>
        </h1>
        <div className="mt-10 max-w-[68ch] lg:mt-12">
          <p className="text-[1.375rem] leading-snug">{hero.lead}</p>
          <p className="mt-4 text-muted">{hero.detail}</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            <ExtLink href={profile.resume}>Resume</ExtLink>
            <ExtLink href={profile.github}>GitHub</ExtLink>
            <ExtLink href={profile.linkedin}>LinkedIn</ExtLink>
            <a href={`mailto:${profile.email}`} className="link break-all">
              {profile.email}
            </a>
          </p>
          <p className="label mt-6">
            <LocalClock />
          </p>
        </div>
      </div>
      <div className="mt-12 min-w-0 lg:col-span-5 lg:mt-3">
        <PlayerCard />
      </div>
    </section>
  )
}
