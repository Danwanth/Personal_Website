import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { App } from './App'
import { devtoolsGreeting } from './lib/devtools'
import { AchievementsProvider } from './lib/achievements'
import { initRetro } from './lib/retro'

initRetro()
devtoolsGreeting()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AchievementsProvider>
      <App />
    </AchievementsProvider>
  </StrictMode>,
)
