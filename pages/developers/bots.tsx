import Layout from '@components/developers/developersLayouts'
import HeadInfo from '@components/HeadInfo'
import Markdown from '@components/MarkDown'
import type { NextPage } from 'next'

const StartPge = `
# 아카이브 BOT API

### 서버 수 업데이트 하기

\`POST /bots/{id}/server\`

### RateLimit

\`3회/분\`

### 요청

##### Headers
| Header | Description |
|:---:|:---:|
| \`Authorization\` | \`Bearer TOKEN\` |

토큰은 https://archiver.me/bots/{id}/edit 에서 발급받으실 수 있습니다

#### Body
\`\`\`
{
  "servers": 10
}
\`\`\`
---

### 예시 요청

\`\`\`
fetch(\`https://api.archiver.me/bots/928523914890608671/server\`, {
    method: 'POST',
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX....",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        servers: 10
    })
})
\`\`\`

### 예시 응답

\`\`\`
{"data":true,"message":"성공적으로 서버수를 업데이트 했습니다."}
\`\`\`

`


const Home: NextPage = () => {
  return (
      <>
      <HeadInfo title='봇 개발자 - 아카이브'/>
      <Layout>
          <Markdown markdown={StartPge}/>
      </Layout>
      </>
      
  )
}

export default Home
