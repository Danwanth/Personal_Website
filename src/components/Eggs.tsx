import { useCallback, useEffect, useState } from 'react'
import { eggs } from '../data/site'
import { useAchievements } from '../lib/achievements'
import { toggleRetro } from '../lib/retro'
import { useKeyEggs } from '../lib/useKeyEggs'
import { BallRoll } from './BallRoll'
import { Console } from './Console'
import { RetroExit } from './RetroExit'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Mounts the hidden stuff: the key listener, the console, the ball roll and
// the retro exit button. Lives inside <AchievementsProvider>.
export function Eggs() {
  const { unlock, notify } = useAchievements()
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [rolling, setRolling] = useState(0) // key of the current roll, 0 = none

  useKeyEggs({
    onKonami: () => {
      toggleRetro()
      unlock('konami')
    },
    onConsoleKey: () => setConsoleOpen((o) => !o),
    onMessi: () => {
      unlock('goat')
      if (!reducedMotion()) setRolling((k) => k + 1)
    },
    onSiu: () => notify(eggs.siu),
  })

  useEffect(() => {
    if (consoleOpen) unlock('console')
  }, [consoleOpen, unlock])

  const closeConsole = useCallback(() => setConsoleOpen(false), [])

  return (
    <>
      <RetroExit />
      <Console open={consoleOpen} onClose={closeConsole} />
      {rolling > 0 && <BallRoll key={rolling} onDone={() => setRolling(0)} />}
    </>
  )
}
