import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OffThePitch } from './components/OffThePitch'
import { Play } from './components/Play'
import { Projects } from './components/Projects'
import { StartingXI } from './components/StartingXI'
import { Work } from './components/Work'

// Section order: 01 Intro, 02 Work, 03 Projects, 04 Starting XI, 05 Play,
// 06 Off the pitch, 07 Contact.
export function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Projects />
        <StartingXI />
        <Play />
        <OffThePitch />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
