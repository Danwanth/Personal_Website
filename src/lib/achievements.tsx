import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { achievementList, type AchievementDef } from '../data/site'
import { readStorage, removeStorage, writeStorage } from './storage'

const KEY = 'dy:achievements'
export const BEST_KEY = 'dy:keepy-best'
export const RESET_EVENT = 'dy:reset'
const IDS = new Set(achievementList.map((a) => a.id))

export interface Toast {
  key: number
  /** Present for an achievement toast; absent for a plain message. */
  achievement?: AchievementDef
  text?: string
}

interface Ctx {
  list: AchievementDef[]
  unlocked: Set<string>
  total: number
  unlock: (id: string) => void
  notify: (text: string) => void
  dialogOpen: boolean
  openDialog: () => void
  closeDialog: () => void
  reset: () => void
  toasts: Toast[]
  dismissToast: (key: number) => void
}

const AchievementsContext = createContext<Ctx | null>(null)

function load(): Set<string> {
  try {
    const raw = readStorage(KEY)
    const arr: unknown = raw ? JSON.parse(raw) : []
    if (Array.isArray(arr)) return new Set(arr.filter((x): x is string => typeof x === 'string' && IDS.has(x)))
  } catch {
    /* corrupt value: start over */
  }
  return new Set()
}

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<string>>(load)
  // A ref is the synchronous source of truth so a double call (StrictMode, two
  // events in one tick) can never toast twice.
  const known = useRef<Set<string>>(unlocked)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const nextKey = useRef(1)

  const unlock = useCallback((id: string) => {
    const def = achievementList.find((a) => a.id === id)
    if (!def || known.current.has(id)) return
    const next = new Set(known.current).add(id)
    known.current = next
    writeStorage(KEY, JSON.stringify([...next]))
    setUnlocked(next)
    setToasts((q) => [...q, { key: nextKey.current++, achievement: def }])
  }, [])

  const notify = useCallback((text: string) => {
    setToasts((q) => [...q, { key: nextKey.current++, text }])
  }, [])

  const dismissToast = useCallback((key: number) => {
    setToasts((q) => q.filter((t) => t.key !== key))
  }, [])

  const reset = useCallback(() => {
    known.current = new Set()
    setUnlocked(new Set())
    removeStorage(KEY)
    removeStorage(BEST_KEY)
    window.dispatchEvent(new Event(RESET_EVENT))
  }, [])

  const openDialog = useCallback(() => setDialogOpen(true), [])
  const closeDialog = useCallback(() => setDialogOpen(false), [])

  // Keep several tabs roughly in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return
      const next = load()
      known.current = next
      setUnlocked(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      list: achievementList,
      unlocked,
      total: achievementList.length,
      unlock,
      notify,
      dialogOpen,
      openDialog,
      closeDialog,
      reset,
      toasts,
      dismissToast,
    }),
    [unlocked, unlock, notify, dialogOpen, openDialog, closeDialog, reset, toasts, dismissToast],
  )

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  )
}

export function useAchievements(): Ctx {
  const ctx = useContext(AchievementsContext)
  if (!ctx) throw new Error('useAchievements must be used inside <AchievementsProvider>')
  return ctx
}
