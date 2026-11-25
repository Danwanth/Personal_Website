import { useSyncExternalStore } from 'react'
import { writeStorage } from './storage'

export type Theme = 'light' | 'dark'

const EVENT = 'dy:themechange'

// The inline script in index.html / 404.html has already put (or not put) the
// `dark` class on <html> before React mounts, so the DOM is the source of truth.
export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  writeStorage('dy:theme', theme)
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)
}
