import GoogleAds from '@components/GoogleAds'
import HeadInfo from '@components/HeadInfo'
import { Bot, ServerList } from '@types'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Server.module.css'
import SearchBox from '@components/SearchBox'
import dynamic from 'next/dynamic'
import ErrorPage from '@components/ErrorPage'
import { userAvaterLink } from '@utils/Tools'
import DateFormet from '@utils/Date'
import { isBuffer } from 'util'

const BotCard = dynamic(() => import('@components/BotCard'), { ssr: true })
const ServerCard = dynamic(() => import('@components/ServerCard'), { ssr: true })

interface UserPageProps {
  user: User
  error: boolean;
  message: string;
  statusCode: number;
}
interface User {
  servers: ServerList[];
  bots: Bot[];
  id: string;
  archive_flags: number;
  username: string;
  discriminator: string;
  avatar: string;
  new: boolean;
  published_date: Date;
}
export const getServerSideProps: GetServerSideProps = async(ctx) => {
  let user = (await fetch(`${process.env.API_DOMAIN}/users/${encodeURI(ctx.params.id as string)}`).then(res => res.json())) as any;
  if(user.status !== 200) {
      return {
        props: {
            user: null,
            message: user.message,
            error: true,
            statusCode: user.status
        }
      }
  }
  return {
    props: {
        user: user.data,
        message: user.message,
        error: false,
        statusCode: user.status
    }
  };
};

const userDescription = (user: User) => {
  if(user.servers.length === 0 && user.bots.length >= 1) {
    return `${user.bots.map(x => x.name).join(', ')} 봇을 제작합니다.`
  } else if(user.bots.length === 0 && user.servers.length >= 1) {
    return `${user.servers.map(x => x.name).join(', ')} 서버를 운영중입니다`
  } else if(user.servers.length >= 1 && user.bots.length >= 1) {
    return `${user.servers.map(x => x.name).join(', ')} 서버를 운영하고 ${user.bots.map(x => x.name).join(', ')} 봇을 제작합니다`
  } else {
    return `${user.username}님의 아카이브 프로필 입니다`
  }
}

const UserPage: NextPage<UserPageProps> = ({user, error, message, statusCode}) => {
  if(error) return <ErrorPage message={message} statusCode={statusCode}/>
  return (
      <>
        <HeadInfo title={user.username + " 프로필 - 아카이브"} image={userAvaterLink(user)} description={userDescription(user)}/>
        <div className={styles.container}>
        <div className='flex lg:flex-row lg:justify-between lg:flex-nowarp flex-col items-center justify-center flex-warp mx-4'>
          <div className='flex lg:flex-row flex-col items-center'>
              <img className='lg:w-40 w-36 rounded-3xl' src={userAvaterLink(user)}/>
              <div className='flex flex-col lg:items-start items-center'>
                  {user.new ? (null) : (<>
                      <span className='lg:ml-6 text-xl font-bold truncate lg:mt-0 mt-2 text-red-400'><i className="fas fa-exclamation-triangle mr-2"/>정보 갱신불가</span>
                  </>)}
                  <span className='lg:ml-6 text-3xl font-bold truncate lg:mt-0 mt-1'>{user.username}<span className='text-gray text-lg'>#{user.discriminator}</span></span>
                  <span className='flex flex-row lg:ml-6 text-lg font-semibold lg:mt-2 mx-auto'>
                      <span className='mx-2'><i className="fas fa-calendar-alt mr-1"/>{DateFormet(user.published_date).fromNow(true)}전 가입</span>
                  </span>
              </div>
          </div>
        </div>
          <div className="max-w-7xl mx-auto">
              <GoogleAds size='short'/>
          </div>
          <div className='mx-4'>
            <span className='text-3xl'>소유중인 서버</span>
            <hr className='my-2'/>
            <div className='my-14 min-h-[20vh] flex flex-row flex-wrap items-center justify-center'>
              {user.servers.length === 0 ? (<>
                <span className='text-2xl'>소유한 서버가 없습니다</span>
              </>) : (<>
                {user.servers.map((server, index) => (<>
                  <ServerCard key={index} guild={server}/>
                </>))}
              </>)
              }
            </div>
          </div>
          <div className='mx-4'>
            <span className='text-3xl'>소유중인 봇</span>
            <hr className='my-2'/>
            <div className='my-14 min-h-[20vh] flex flex-row flex-wrap items-center justify-center'>
              {user.bots.length === 0 ? (<>
                  <span className='text-2xl'>소유한 봇이 없습니다</span>
              </>):(<>
                {user.bots.map((bot, index) => (<>
                  <BotCard bot={bot} key={index}/>
                </>))}
              </>)}
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
              <GoogleAds size='short'/>
          </div>
        </div>
      </>
  )
}

export default UserPage;
