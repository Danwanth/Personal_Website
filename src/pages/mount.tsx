import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../index.css'
import { AchievementsUI } from '../components/AchievementsUI'
import { ContactBand } from '../components/ContactBand'
import { Eggs } from '../components/Eggs'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { VisitTracker } from '../components/VisitTracker'
import type { PageKey } from '../data/site'
import { AchievementsProvider } from '../lib/achievements'
import { devtoolsGreeting } from '../lib/devtools'
import { initRetro } from '../lib/retro'

// The one shared shell. Every page entry calls this with its own content;
// nothing else here is duplicated per page.
export function mountPage(page: ReactNode, opts: { current?: PageKey } = {}): void {
  initRetro()
  devtoolsGreeting()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AchievementsProvider>
        <Header current={opts.current} />
        <main id="main">{page}</main>
        <ContactBand />
        <Footer />
        <AchievementsUI />
        <Eggs />
        {opts.current && <VisitTracker page={opts.current} />}
      </AchievementsProvider>
    </StrictMode>,
  )
}
