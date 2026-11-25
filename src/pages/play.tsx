import { Play } from '../components/Play'
import { PageHeader } from '../components/PageHeader'
import { pageHeads } from '../data/site'
import { mountPage } from './mount'

function Page() {
  return (
    <>
      <PageHeader {...pageHeads.play} />
      <Play />
    </>
  )
}

mountPage(<Page />, { current: 'play' })
