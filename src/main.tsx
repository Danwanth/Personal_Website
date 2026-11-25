import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { App } from './App'
import { AchievementsProvider } from './lib/achievements'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AchievementsProvider>
      <App />
    </AchievementsProvider>
  </StrictMode>,
)
