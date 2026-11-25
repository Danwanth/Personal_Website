import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { interests, profile, projects } from '../data/site'
import { useAchievements } from '../lib/achievements'
import { toggleRetro } from '../lib/retro'
import { setTheme } from '../lib/theme'

// A line of output is a list of parts: plain text or a real link. Everything
// is rendered through React elements, never as HTML strings.
type Part = string | { href: string; text: string }
interface Line {
  id: number
  kind: 'in' | 'out' | 'dim'
  parts: Part[]
}

const PROMPT = 'guest@danwanth:~$'

const COMMANDS: { name: string; desc: string }[] = [
  { name: 'help', desc: 'list the commands' },
  { name: 'whoami', desc: 'who is this' },
  { name: 'projects', desc: 'things I have built, with links' },
  { name: 'gamertags', desc: 'find me in a lobby' },
  { name: 'socials', desc: 'email and profiles' },
  { name: 'resume', desc: 'open the resume (PDF)' },
  { name: 'play', desc: 'jump to the keepy-uppy game' },
  { name: 'retro', desc: 'toggle retro mode' },
  { name: 'theme light|dark', desc: 'switch the colour theme' },
  { name: 'achievements', desc: 'show your progress' },
  { name: 'clear', desc: 'clear the screen' },
  { name: 'exit', desc: 'close the console' },
]
// Completion candidates: the public commands, with the theme variants spelled out.
const COMPLETIONS = [
  ...COMMANDS.map((c) => c.name).filter((n) => !n.startsWith('theme')),
  'theme light',
  'theme dark',
]

const NOPE = new Set(['noclip', 'god', 'iddqd'])

function Output({ parts }: { parts: Part[] }): ReactNode {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <a
        key={i}
        href={p.href}
        target={p.href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-paper"
      >
        {p.text}
      </a>
    ),
  )
}

export function Console({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { unlocked, total, openDialog } = useAchievements()
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: 'dim', parts: ["Danwanth OS v2.0. Type 'help' for commands."] },
  ])
  const [value, setValue] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreRef = useRef(true)
  const nextId = useRef(1)
  const history = useRef<string[]>([])
  const histIdx = useRef(-1)
  const draft = useRef('')

  const close = useCallback(
    (restoreFocus = true) => {
      restoreRef.current = restoreFocus
      onClose()
    },
    [onClose],
  )

  // Focus the input on open; put focus back where it was on close.
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    restoreRef.current = true
    inputRef.current?.focus()
    return () => {
      if (restoreRef.current && prev instanceof HTMLElement) prev.focus()
      restoreRef.current = true
    }
  }, [open])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, open])

  const push = (...added: Omit<Line, 'id'>[]) =>
    setLines((l) => [...l, ...added.map((a) => ({ ...a, id: nextId.current++ }))])
  const out = (...parts: Part[]): Omit<Line, 'id'> => ({ kind: 'out', parts })

  const run = (raw: string) => {
    const norm = raw.trim().toLowerCase().replace(/\s+/g, ' ')
    const echo: Omit<Line, 'id'> = { kind: 'in', parts: [`${PROMPT} ${raw}`] }
    if (!norm) return push(echo)

    switch (norm) {
      case 'clear':
        return setLines([])
      case 'exit':
        return close()
      case 'help':
        return push(echo, ...COMMANDS.map((c) => out(`${c.name}: ${c.desc}`)))
      case 'whoami':
        return push(
          echo,
          out('Danwanth Yogesh. Final-year CSE student at RSET, Kochi. AI/ML, Python, React. Barça fan.'),
        )
      case 'projects':
        return push(
          echo,
          ...projects.map((p) => {
            const links: Part[] = []
            if (p.live) links.push({ href: p.live, text: 'live' })
            if (p.code) links.push({ href: p.code, text: 'code' })
            const parts: Part[] = [`${p.title}`]
            links.forEach((l, i) => parts.push(i === 0 ? '  ' : ' ', l))
            return out(...parts)
          }),
        )
      case 'gamertags':
        return push(echo, ...interests.playing.tags.map((t) => out(`${t.platform.padEnd(10)}${t.tag}`)))
      case 'socials':
        return push(
          echo,
          out('email     ', { href: `mailto:${profile.email}`, text: profile.email }),
          out('github    ', { href: profile.github, text: profile.github }),
          out('linkedin  ', { href: profile.linkedin, text: profile.linkedin }),
          out('instagram ', { href: profile.instagram, text: profile.instagram }),
        )
      case 'resume':
        window.open(profile.resume, '_blank', 'noopener,noreferrer')
        return push(echo, out('Opening resume…'))
      case 'play': {
        close(false)
        const target = document.getElementById('play')
        target?.scrollIntoView({ block: 'start' })
        document.querySelector<HTMLElement>('[data-game-canvas]')?.focus({ preventScroll: true })
        return
      }
      case 'retro': {
        const on = toggleRetro()
        return push(echo, out(`Retro mode ${on ? 'on' : 'off'}.`), out("Tip: there's a cheat code for the achievement."))
      }
      case 'theme light':
      case 'theme dark':
        setTheme(norm.endsWith('dark') ? 'dark' : 'light')
        return push(echo, out(`Theme: ${norm.slice(6)}.`))
      case 'theme':
        return push(echo, out('Usage: theme light | theme dark'))
      case 'achievements':
        push(echo, out(`${unlocked.size}/${total}`))
        close()
        return openDialog()
      case 'sudo hire danwanth':
        push(echo, out('Permission granted. Opening your mail client…'))
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's talk")}`
        return
      case 'sv_cheats 1':
        return push(echo, out('Cheats are not enabled on this server.'))
      case 'sudo rm -rf /':
        return push(echo, out('Red card. Straight off.'))
      default:
        if (NOPE.has(norm)) return push(echo, out('Nice try.'))
        return push(echo, out(`command not found: ${raw.trim()}. Try 'help'.`))
    }
  }

  const complete = (e: KeyboardEvent<HTMLInputElement>) => {
    const v = value.trimStart().toLowerCase()
    if (!v) return // nothing typed: let Tab move focus
    const matches = COMPLETIONS.filter((c) => c.startsWith(v))
    if (!matches.length) return
    e.preventDefault()
    if (matches.length === 1) return setValue(matches[0])
    let prefix = matches[0]
    for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
    if (prefix.length > v.length) setValue(prefix)
    else push({ kind: 'dim', parts: [matches.join('   ')] })
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' || e.key === '`' || e.key === '~' || e.code === 'Backquote') {
      e.preventDefault()
      close()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const raw = value
      if (raw.trim()) history.current.push(raw.trim())
      histIdx.current = -1
      setValue('')
      run(raw)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const h = history.current
      if (!h.length) return
      if (histIdx.current === -1) {
        draft.current = value
        histIdx.current = h.length - 1
      } else if (histIdx.current > 0) histIdx.current--
      setValue(h[histIdx.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const h = history.current
      if (histIdx.current === -1) return
      if (histIdx.current < h.length - 1) {
        histIdx.current++
        setValue(h[histIdx.current])
      } else {
        histIdx.current = -1
        setValue(draft.current)
      }
    } else if (e.key === 'Tab' && !e.shiftKey) {
      complete(e)
    }
  }

  // Keep Tab inside the panel (it is a non-modal dialog, but it should not leak focus).
  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab' || e.defaultPrevented) return
    const items = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button, input')
    if (!items || !items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (!open) return null

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Developer console"
      onKeyDown={onPanelKeyDown}
      className="console-panel fixed inset-x-0 top-0 z-[75] flex h-[45vh] max-h-[420px] flex-col border-b border-accent bg-ink font-mono text-sm text-paper"
    >
      <div className="wrap flex flex-none items-center justify-between pt-3">
        <span className="text-xs uppercase tracking-[0.08em] opacity-80">Console</span>
        <button
          type="button"
          onClick={() => close()}
          className="text-xs underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-paper"
        >
          Close (Esc)
        </button>
      </div>
      <div
        ref={logRef}
        role="log"
        aria-label="Console output"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus()
        }}
        className="wrap min-h-0 flex-1 overflow-y-auto py-2 leading-relaxed"
      >
        {lines.map((l) => (
          <p
            key={l.id}
            className={`whitespace-pre-wrap break-words ${l.kind === 'dim' ? 'opacity-80' : ''}`}
          >
            <Output parts={l.parts} />
          </p>
        ))}
      </div>
      <label className="wrap flex flex-none items-center gap-2 pb-4 pt-1">
        <span className="flex-none">{PROMPT}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Console command"
          className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm text-paper caret-current focus-visible:outline-paper"
        />
      </label>
    </div>
  )
}
