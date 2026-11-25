import { useEffect, useRef, useState } from 'react'
import { keepy } from '../data/site'
import { drawGame, readPalette, type Palette } from '../game/draw'
import { Engine, type EngineEvent, type Phase } from '../game/engine'
import { BEST_KEY, RESET_EVENT, useAchievements } from '../lib/achievements'
import { readStorage, writeStorage } from '../lib/storage'

function readBest(): number {
  const n = parseInt(readStorage(BEST_KEY) ?? '', 10)
  return Number.isFinite(n) && n > 0 ? n : 0
}

const FRAME_MS = 1000 / 60

export function KeepyUppy() {
  const { unlock } = useAchievements()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const unlockRef = useRef(unlock)
  const bestRef = useRef(readBest())
  const prevBestRef = useRef(0)
  const newBestShown = useRef(false)

  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(bestRef.current)
  const [line, setLine] = useState('')

  useEffect(() => {
    unlockRef.current = unlock
  }, [unlock])

  useEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const onEvent = (e: EngineEvent) => {
      if (e.type === 'restart') {
        prevBestRef.current = bestRef.current
        newBestShown.current = false
        setScore(0)
        setPhase('playing')
        setLine('')
      } else if (e.type === 'touch') {
        const n = e.touches
        if (n === 1) {
          prevBestRef.current = bestRef.current
          newBestShown.current = false
          unlockRef.current('first-touch')
        }
        if (n === 10) unlockRef.current('number-ten')
        setScore(n)
        setPhase('playing')
        const milestone = keepy.milestones[n]
        if (milestone) setLine(milestone)
        else if (!newBestShown.current && prevBestRef.current >= 5 && n > prevBestRef.current) {
          newBestShown.current = true
          setLine(keepy.newBest)
        }
        if (n > bestRef.current) {
          bestRef.current = n
          writeStorage(BEST_KEY, String(n))
          setBest(n)
        }
      } else {
        setPhase('over')
        setScore(e.touches)
        setLine(keepy.gameOver[Math.floor(Math.random() * keepy.gameOver.length)])
      }
    }

    const rect = wrap.getBoundingClientRect()
    const engine = new Engine(rect.width || 600, rect.height || 380, onEvent)
    engineRef.current = engine
    // Dev-only handle for poking the engine from the browser console.
    if (import.meta.env.DEV) (window as unknown as { __engine?: Engine }).__engine = engine

    let palette: Palette = readPalette()
    let dpr = window.devicePixelRatio || 1
    let raf = 0
    let last = 0
    let visible = true
    let disposed = false

    const frame = (now: number) => {
      raf = 0
      if (disposed || !visible || document.hidden) {
        last = 0
        return
      }
      if (last && now - last < FRAME_MS - 2) {
        raf = requestAnimationFrame(frame) // cap at about 60 renders per second
        return
      }
      engine.advance(last ? (now - last) / 1000 : 0)
      last = now
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawGame(ctx, engine, palette)
      if (engine.settled) {
        last = 0
        return // nothing is moving: stop until something wakes the loop
      }
      raf = requestAnimationFrame(frame)
    }
    const wake = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(frame)
    }

    const size = () => {
      const r = wrap.getBoundingClientRect()
      if (!r.width || !r.height) return
      dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      engine.resize(r.width, r.height)
      wake()
    }
    size()

    const ro = new ResizeObserver(size)
    ro.observe(wrap)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(wrap)

    const onVisibility = () => {
      if (!document.hidden) wake()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Re-read the colour tokens when the theme or retro mode changes.
    const mo = new MutationObserver(() => {
      palette = readPalette()
      wake()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-retro'] })

    const onReset = () => {
      bestRef.current = 0
      setBest(0)
      engine.toIdle()
      setScore(0)
      setPhase('idle')
      setLine('')
      wake()
    }
    window.addEventListener(RESET_EVENT, onReset)

    // /play#game (the console's `play`): scroll to the game and focus it.
    const focusFromHash = () => {
      if (window.location.hash !== '#game') return
      wrap.scrollIntoView({ block: 'center' })
      canvas.focus({ preventScroll: true })
    }
    focusFromHash()
    window.addEventListener('hashchange', focusFromHash)

    const onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return
      if (engine.phase === 'over') {
        engine.restart()
      } else {
        const r = canvas.getBoundingClientRect()
        engine.kick(e.clientX - r.left, e.clientY - r.top, e.pointerType === 'touch' ? 12 : 0)
      }
      wake()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      e.preventDefault()
      if (e.repeat) return
      if (engine.phase === 'over') engine.restart()
      else engine.kickKeyboard()
      wake()
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('keydown', onKeyDown)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener(RESET_EVENT, onReset)
      window.removeEventListener('hashchange', focusFromHash)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('keydown', onKeyDown)
      engineRef.current = null
    }
  }, [])

  const playAgain = (e: React.MouseEvent) => {
    engineRef.current?.restart()
    // Keyboard users keep playing from the keyboard; mouse users just click the ball.
    if (e.detail === 0) canvasRef.current?.focus({ preventScroll: true })
  }

  return (
    <div ref={wrapRef} id="game" className="relative h-80 w-full border border-rule sm:h-[380px] lg:h-[400px]">
      <canvas
        ref={canvasRef}
        data-game-canvas
        tabIndex={0}
        role="application"
        aria-label={keepy.label}
        className="block h-full w-full touch-manipulation select-none"
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-3 sm:left-5 sm:top-4">
          <p className="flex items-baseline gap-3">
            <span className="display text-[3.5rem] sm:text-[4.5rem]">
              <span className="sr-only">Score </span>
              {score}
            </span>
            <span className="label">Best {best}</span>
          </p>
          <p aria-live="polite" className="mt-1 min-h-[1.5rem] font-mono text-xs text-muted sm:text-sm">
            {line}
          </p>
        </div>
        {phase === 'idle' && (
          <div className="absolute inset-x-0 top-[34%] px-4 text-center">
            <p className="font-mono text-sm">
              <span className="pointer-coarse:hidden">{keepy.idle}</span>
              <span className="hidden pointer-coarse:inline">{keepy.idleTouch}</span>
            </p>
            <p className="label mt-1 hidden sm:block">{keepy.idleKeyboard}</p>
          </div>
        )}
        {phase === 'over' && (
          <div className="absolute inset-x-0 top-[36%] px-4 text-center">
            <p className="font-mono text-sm">
              Dropped it. {score} {score === 1 ? 'touch' : 'touches'}.
            </p>
            <p className="label mt-1">Best {best}</p>
            <button
              type="button"
              onClick={playAgain}
              className="pointer-events-auto mt-4 inline-block border border-ink px-4 py-2 font-mono text-sm transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
