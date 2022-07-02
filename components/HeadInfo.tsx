import Head from "next/head"

export default function HeadInfo({title, description, keyword, image }: HeadInfoProps){
    return (
        <>
            <Head>
                <title>{title  + " - 아카이브"}</title>
                <link rel="canonical" href="http://archiver.me/"/>
                <link rel='search' type='application/opensearchdescription+xml' title={title} href='/opensearch.xml' />
                <link rel="icon" href="https://archiver.me/favicon.ico" />
                <meta name="description" content={description} />
                <meta name="keyword" content={keyword} />
                {/* Open Graph */}
                <meta property="og:site_name" content="아카이브"/>
                <meta property="og:image" content={image} /> 
                <meta property="og:title" content={title  + " - 아카이브"} /> 
                <meta property="og:description" content={description} />
                {/* Twitter */}
                <meta name='twitter:card' content={image} />
                <meta name='twitter:site' content='https://archiver.me' />
                <meta name='twitter:title' content={title + " - 아카이브"} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:image' content={image} />
            </Head>
        </>
    )
}

HeadInfo.defaultProps = {
    title: 'Archive',
    description:'안전한 디스코드 관련 목록들을 이곳에서 확인하세요!',
    keyword: '아카이브, Archive, 디스코드서버, 디스코드 서버목록, 디스코드 서버 리스트, 디스코드 서버찾기, 디스코드, 디스코드 봇, 디스코드 서버 홍보',
    image: 'https://archiver.me/favicon.ico'
}

interface HeadInfoProps {
	title?: string
    description?: string
    keyword?: string
    image?: string
}
 