import { AroundTheSite } from '../components/AroundTheSite'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { SelectedWork } from '../components/SelectedWork'
import { mountPage } from './mount'

function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AroundTheSite />
      <Contact />
    </>
  )
}

mountPage(<Home />, { current: 'home' })
