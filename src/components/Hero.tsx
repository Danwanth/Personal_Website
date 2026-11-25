import { hero, profile } from '../data/site'
import { ExtLink } from './ExtLink'
import { LocalClock } from './LocalClock'

export function Hero() {
  return (
    <section id="top" className="wrap pb-16 pt-10 lg:pb-24 lg:pt-16" aria-label="Introduction">
      <h1 className="display text-[clamp(3.25rem,11vw,7.5rem)]">
        <span className="block">Danwanth</span>
        <span className="block">Yogesh</span>
      </h1>
      <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <p className="label mb-6 lg:col-span-3 lg:mb-0 lg:pt-2">
          <LocalClock />
        </p>
        <div className="max-w-[68ch] lg:col-span-9">
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
        </div>
      </div>
    </section>
  )
}
