import { setTheme, useTheme } from '../lib/theme'

// A text button, not a sun/moon icon. Shows the theme you will switch to.
export function ThemeToggle() {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="text-button"
    >
      {next === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
