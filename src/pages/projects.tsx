import { Projects } from '../components/Projects'
import { PageHeader } from '../components/PageHeader'
import { pageHeads } from '../data/site'
import { mountPage } from './mount'

function Page() {
  return (
    <>
      <PageHeader {...pageHeads.projects} />
      <Projects />
    </>
  )
}

mountPage(<Page />, { current: 'projects' })
