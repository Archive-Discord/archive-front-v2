import Head from "next/head"

export default function HeadInfo({title, description, keyword, image }: HeadInfoProps){
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={description} />
                <meta name="keyword" content={keyword} />
                <meta property="og:image" content={image} /> 
                <meta property="og:title" content={title} /> 
                <meta property="og:description" content={description} /> 
            </Head>
        </>
    )
}

HeadInfo.defaultProps = {
    title: 'Archive - 아카이브',
    description:'안전한 디스코드 관련 목록들을 이곳에서 확인하세요!',
    keyword: '아카이브, Archive, 디스코드서버, 디스코드 서버목록, 디스코드 서버 리스트, 디스코드 서버찾기, 디스코드, 디스코드 봇, 디스코드 서버 홍보',
    og_image: '/favicon.ico'
}

interface HeadInfoProps {
	title: string
    description: string
    keyword: string
    image: string
}
 