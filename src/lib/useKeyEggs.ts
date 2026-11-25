import { useEffect, useRef } from 'react'

const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]
const COOLDOWN_MS = 5000

export interface KeyEggHandlers {
  onKonami: () => void
  onConsoleKey: () => void
  onMessi: () => void
  onSiu: () => void
}

/** True when the event comes from somewhere the user is typing. */
export function isTypingTarget(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false
  return t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)
}

/**
 * One global keydown listener for the easter eggs: the Konami code, the
 * console key and the typed words. It ignores typing in form fields and any
 * event with Ctrl, Meta or Alt held. Shift is allowed (`~` needs it on many layouts).
 */
export function useKeyEggs(handlers: KeyEggHandlers): void {
  const ref = useRef(handlers)
  useEffect(() => {
    ref.current = handlers
  })

  useEffect(() => {
    let keys: string[] = []
    let letters = ''
    const lastFired: Record<string, number> = {}

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      if (e.repeat) return

      // The key under Esc: ` or ~ (and Backquote on layouts that print something else).
      if (e.key === '`' || e.key === '~' || e.code === 'Backquote') {
        e.preventDefault() // the character must not land in the input that is about to take focus
        ref.current.onConsoleKey()
        return
      }

      const key = e.key.toLowerCase()
      if (key === 'shift' || key === 'capslock') return // modifiers do not break a sequence
      keys = [...keys, key].slice(-KONAMI.length)
      if (keys.length === KONAMI.length && keys.every((k, i) => k === KONAMI[i])) {
        keys = []
        letters = ''
        ref.current.onKonami()
        return
      }

      if (/^[a-z]$/.test(key)) {
        letters = (letters + key).slice(-12)
        const fire = (word: string, run: () => void) => {
          if (!letters.endsWith(word)) return
          const now = Date.now()
          if (now - (lastFired[word] ?? -Infinity) < COOLDOWN_MS) return
          lastFired[word] = now
          run()
        }
        fire('messi', () => ref.current.onMessi())
        fire('siu', () => ref.current.onSiu())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
