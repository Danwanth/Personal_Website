import { useSyncExternalStore } from 'react'
import { removeStorage, writeStorage } from './storage'

const EVENT = 'dy:retrochange'

// Press Start 2P is only ever fetched through this dynamic import: the first
// time retro mode is on (including a page load with retro already saved).
let fontLoad: Promise<unknown> | undefined
export function loadRetroFont(): Promise<unknown> {
  fontLoad ??= import('@fontsource/press-start-2p/latin-400.css').catch(() => undefined)
  return fontLoad
}

export function isRetro(): boolean {
  return document.documentElement.hasAttribute('data-retro')
}

export function setRetro(on: boolean): void {
  document.documentElement.toggleAttribute('data-retro', on)
  if (on) {
    writeStorage('dy:retro', '1')
    void loadRetroFont()
  } else {
    removeStorage('dy:retro')
  }
  window.dispatchEvent(new Event(EVENT))
}

/** Toggle retro mode. Returns the new state. */
export function toggleRetro(): boolean {
  setRetro(!isRetro())
  return isRetro()
}

/** Call once at startup: the inline script has already set the attribute. */
export function initRetro(): void {
  if (isRetro()) void loadRetroFont()
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

export function useRetro(): boolean {
  return useSyncExternalStore(subscribe, isRetro, () => false)
}
