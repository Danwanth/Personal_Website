import { Work } from '../components/Work'
import { PageHeader } from '../components/PageHeader'
import { pageHeads } from '../data/site'
import { mountPage } from './mount'

function Page() {
  return (
    <>
      <PageHeader {...pageHeads.work} />
      <Work />
    </>
  )
}

mountPage(<Page />, { current: 'work' })
