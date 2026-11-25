import { setRetro, useRetro } from '../lib/retro'

// Only visible in retro mode. Fixed to the top-right; the retro CSS leaves a
// strip of space above the header so it never covers the theme toggle.
export function RetroExit() {
  const retro = useRetro()
  if (!retro) return null
  return (
    <button
      type="button"
      onClick={() => setRetro(false)}
      className="fixed right-2 top-2 z-[60] border border-ink bg-paper px-2 py-1 font-mono text-xs text-ink hover:bg-ink hover:text-paper"
    >
      Exit retro mode
    </button>
  )
}
