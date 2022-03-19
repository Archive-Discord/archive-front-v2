import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from '@utils/gtag'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
            <link rel="icon" href="https://archiver.me/favicon.ico" />
            <meta name="description" content={"안전한 디스코드 관련 목록들을 이곳에서 확인하세요!"} />
            <meta name="keyword" content={"아카이브, Archive, 디스코드서버, 디스코드 서버목록, 디스코드 서버 리스트, 디스코드 서버찾기, 디스코드, 디스코드 봇, 디스코드 서버 홍보"} />
            <meta property="og:site_name" content="아카이브"/>
            <meta property="og:image" content={"https://archiver.me/favicon.ico"} /> 
            <meta property="og:title" content={"Archive - 아카이브"} /> 
            <meta property="og:description" content={"안전한 디스코드 관련 목록들을 이곳에서 확인하세요!"} />
            <meta property="og:title" content={"Archive - 아카이브"}/>
            {/** fontawesome CDN */}
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2701426579223876" crossOrigin="anonymous"></script>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              `,}}
            />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}