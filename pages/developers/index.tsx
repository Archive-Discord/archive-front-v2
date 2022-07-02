import Layout from '@components/developers/developersLayouts'
import HeadInfo from '@components/HeadInfo'
import Markdown from '@components/MarkDown'
import type { NextPage } from 'next'

const StartPge = `
# 아카이브 API

### BASE URL
\`https://api.archiver.me/\`

---

### RateLimit

| Header | Description |
|:---:|:---:|
| \`X-RateLimit-Limit\` | 사용 가능한 요청 횟수 |
| \`X-RateLimit-Remaining\` | 남은 요청 가능 횟수 |
| \`X-RateLimit-Reset\` | 요청 가능 횟수를 초기화 시간 |

---
`



const Home: NextPage = () => {
  return (
      <>
      <HeadInfo title='개발자'/>
      <Layout>
          <Markdown markdown={StartPge}/>
      </Layout>
      </>
      
  )
}

export default Home
