import { StartingXI } from '../components/StartingXI'
import { PageHeader } from '../components/PageHeader'
import { pageHeads } from '../data/site'
import { mountPage } from './mount'

function Page() {
  return (
    <>
      <PageHeader {...pageHeads.skills} />
      <StartingXI />
    </>
  )
}

mountPage(<Page />, { current: 'skills' })
