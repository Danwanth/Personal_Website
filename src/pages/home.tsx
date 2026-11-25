import { mountPage } from './mount'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'

function Home() {
  return (
    <>
      <Hero />
      <Contact />
    </>
  )
}

mountPage(<Home />, { current: 'home' })
