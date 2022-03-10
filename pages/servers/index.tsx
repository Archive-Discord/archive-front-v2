import HeadInfo from '@components/HeadInfo'
import Paginator from '@components/Paginator'
import ServerCard from '@components/ServerCard'
import { ServerList } from '@types'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '../../styles/Home.module.css'

interface HomeProps {
    server: {
        server: ServerList[];
        totalPage: number;
    },
    page: number;
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async(context) => {
  if(!context.query.page) context.query.page = "1";
  let server = (await fetch(
    `${process.env.API_DOMAIN}/servers?page=${context.query.page}`
  ).then(res => res.json())) as any;
  return {
    props: {
      server: server.data,
      page: Number(context.query.page)
    },
  };
};
const Home: NextPage<HomeProps> = ({server, page}) => {
  return (
    <div className={styles.container}>
      <HeadInfo/>
      <div className={styles.lists}>
        {server.server
          .slice(0, 12)
          .sort((a,b) => b.like - a.like)
          .map((item, index) => (<>
            <ServerCard guild={item} key={index}/>
        </>))}
      </div>
      <div className='flex justify-center mb-10'>
      <Paginator currentPage={page} totalPage={Math.ceil(server.totalPage / 12)} pathname="/servers"/>
      </div>
    </div>
  )
}

export default Home
