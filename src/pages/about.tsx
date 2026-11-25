import { About } from '../components/About'
import { PageHeader } from '../components/PageHeader'
import { pageHeads } from '../data/site'
import { mountPage } from './mount'

function Page() {
  return (
    <>
      <PageHeader {...pageHeads.about} />
      <About />
    </>
  )
}

mountPage(<Page />, { current: 'about' })
