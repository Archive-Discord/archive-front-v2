import Layout from '@components/developers/developersLayouts'
import HeadInfo from '@components/HeadInfo'
import Markdown from '@components/MarkDown'
import type { NextPage } from 'next'

const StartPge = `

# 작성중 입니다
`



const Home: NextPage = () => {
  return (
      <>
      <HeadInfo title='서버 개발자'/>
      <Layout>
          <Markdown markdown={StartPge}/>
      </Layout>
      </>
      
  )
}

export default Home
