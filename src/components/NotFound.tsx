import { useEffect } from 'react'
import { notFound } from '../data/site'
import { useAchievements } from '../lib/achievements'
import { Footer } from './Footer'
import { Header } from './Header'

// A strip of pitch with two offside lines. Ink = last defender, accent = the
// attacker, who is slightly past the line. Colours come from the tokens.
function OffsideDiagram() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="mt-10 block h-auto w-full max-w-[520px]"
      role="img"
      aria-label="Two players on a strip of pitch. The attacker stands slightly past the last defender, so the offside lines do not match."
    >
      <g className="stroke-rule" strokeWidth="1.5" fill="none">
        <line x1="0" y1="10" x2="400" y2="10" />
        <line x1="0" y1="110" x2="400" y2="110" />
        <line x1="130" y1="10" x2="130" y2="110" />
        <circle cx="130" cy="60" r="30" />
      </g>
      <line x1="250" y1="2" x2="250" y2="118" className="stroke-ink" strokeWidth="1.5" />
      <line x1="278" y1="2" x2="278" y2="118" className="stroke-accent" strokeWidth="1.5" />
      <circle cx="250" cy="76" r="7" className="fill-ink" />
      <circle cx="278" cy="40" r="7" className="fill-accent" />
    </svg>
  )
}

export function NotFound() {
  const { unlock } = useAchievements()
  useEffect(() => {
    unlock('offside')
  }, [unlock])
  return (
    <>
      <Header base="/" />
      <main id="main" className="wrap pb-16 pt-12 lg:pb-24 lg:pt-20">
        <p className="label">{notFound.label}</p>
        <h1 className="display mt-3 text-[clamp(3.25rem,15vw,10rem)]">{notFound.heading}</h1>
        <p className="mt-8 max-w-[52ch] text-[1.375rem] leading-snug">{notFound.text}</p>
        <OffsideDiagram />
        <p className="mt-10">
          <a
            href="/"
            className="inline-block border border-ink px-4 py-2 font-mono text-sm transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            {notFound.back}
            <span aria-hidden="true"> ↗</span>
          </a>
        </p>
      </main>
      <Footer />
    </>
  )
}
