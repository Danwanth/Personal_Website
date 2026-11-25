import { AroundTheSite } from '../components/AroundTheSite'
import { Hero } from '../components/Hero'
import { SelectedWork } from '../components/SelectedWork'
import { mountPage } from './mount'

function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AroundTheSite />
    </>
  )
}

mountPage(<Home />, { current: 'home' })
