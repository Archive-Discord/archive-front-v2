import HeadInfo from '@components/HeadInfo'
import Paginator from '@components/Paginator'
import ServerCard from '@components/ServerCard'
import { ServerList } from '@types'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '../../../styles/Home.module.css'



const Home: NextPage = () => {
  return (
    <div className={styles.container} style={{marginTop: "9rem"}}>
      <HeadInfo title='서버관리 - 아카이브'/>
      <div className={styles.lists}>
        
      </div>
    </div>
  )
}

export default Home
