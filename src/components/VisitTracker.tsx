import { useEffect } from 'react'
import { pages, type PageKey } from '../data/site'
import { RESET_EVENT, VISITED_KEY, useAchievements } from '../lib/achievements'
import { readStorage, writeStorage } from '../lib/storage'

function readVisited(): string[] {
  try {
    const arr: unknown = JSON.parse(readStorage(VISITED_KEY) ?? '[]')
    if (Array.isArray(arr)) return arr.filter((x): x is string => typeof x === 'string')
  } catch {
    /* corrupt value: start over */
  }
  return []
}

// Records the page in localStorage `dy:visited`; once all six pages have been
// seen, unlocks the `tour` achievement. Renders nothing. Not mounted on the 404.
export function VisitTracker({ page }: { page: PageKey }) {
  const { unlock } = useAchievements()

  useEffect(() => {
    const record = () => {
      const visited = new Set(readVisited())
      visited.add(page)
      writeStorage(VISITED_KEY, JSON.stringify([...visited]))
      if (pages.every((p) => visited.has(p.key))) unlock('tour')
    }
    record()
    // "Reset" clears the visited list too; the page you are on counts again.
    window.addEventListener(RESET_EVENT, record)
    return () => window.removeEventListener(RESET_EVENT, record)
  }, [page, unlock])

  return null
}
