import GoogleAds from '@components/GoogleAds'
import HeadInfo from '@components/HeadInfo'
import ServerCard from '@components/ServerCard'
import BotCard from '@components/BotCard'
import { Bot, ServerList } from '@types'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface HomeProps {
  server: {
    server: ServerList[];
    totalPage: number;
  },
  bot: {
    bot: Bot[];
    totalPage: number;
  }
}
export const getStaticProps: GetStaticProps = async() => {
  let server = (await fetch(`${process.env.API_DOMAIN}/servers`).then(res => res.json())) as any;
  let bots = (await fetch(`${process.env.API_DOMAIN}/bots`).then(res => res.json())) as any;
  return {
    props: {
      server: server.data,
      bot: bots.data
    },
    revalidate: 600
  };
};
const Home: NextPage<HomeProps> = ({server, bot}) => {
  return (
    <div className={styles.container}>
      <HeadInfo/>
      <div className="max-w-7xl mx-auto">
        <GoogleAds size='short'/>
      </div>
      <div className={styles.title}>
        <span className='text-4xl'>서버 리스트</span>
        <span className='text-xl'>좋아요를 많이 받은 서버들의 순위입니다</span>
      </div>
      <div className={styles.lists}>
        {server.server
          .slice(0, 8)
          .sort((a,b) => b.like - a.like)
          .map((item, index) => (<>
            <ServerCard guild={item} key={index}/>
        </>))}
      </div>
      <Link href={'/servers'}>
        <a className="flex justify-center text-xl">서버 더보기</a>
      </Link>
      <div className="max-w-7xl mx-auto">
        <GoogleAds size='short'/>
      </div>
      <div className={styles.title}>
        <span className='text-4xl'>봇 리스트</span>
        <span className='text-xl'>좋아요를 많이 받은 봇들의 순위입니다</span>
      </div>
      <div className={styles.lists}>
        {bot.bot
          .slice(0, 8)
          .sort((a,b) => b.like - a.like)
          .map((item, index) => (<>
            <BotCard bot={item} key={index}/>
        </>))}
      </div>
      <Link href={'/bots'}>
        <a className="flex justify-center text-xl">봇 더보기</a>
      </Link>
      <div className="max-w-7xl mx-auto">
        <GoogleAds size='short'/>
      </div>
    </div>
  )
}

export default Home
