import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { AchievementsUI } from './components/AchievementsUI'
import { NotFound } from './components/NotFound'
import { RetroExit } from './components/RetroExit'
import { AchievementsProvider } from './lib/achievements'
import { initRetro } from './lib/retro'

initRetro()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AchievementsProvider>
      <NotFound />
      <AchievementsUI />
      <RetroExit />
    </AchievementsProvider>
  </StrictMode>,
)
