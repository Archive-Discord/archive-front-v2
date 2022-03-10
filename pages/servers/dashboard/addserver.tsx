import ServerList from '@components/addserver/serverlist'
import HeadInfo from '@components/HeadInfo'
import Paginator from '@components/Paginator'
import ServerCard from '@components/ServerCard'
import { guildProfileLink } from '@utils/Tools'
import { DiscordUserGuild } from '@types'
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import styles from '../../../styles/Home.module.css'



const Home: NextPage = () => {
  const [server, setServer] = useState<DiscordUserGuild>()
  const SelectCallbackServer = (server: DiscordUserGuild) => {
    setServer(server)
  }
  return (
    <div className={styles.container} style={{marginTop: "5rem"}}>
      <HeadInfo title='서버추가 - 아카이브'/>
      <div className="flex flex-col justify-center items-center flex-wrap min-h-[50vh]">
          <span className='my-10 text-3xl'>서버 추가하기</span>
          {server ? (<>
            <div className='flex flex-row flex-wrap items-center justify-center w-full border p-4 rounded-2xl lg:w-[55vw] max-w-[95vw]'>
                <div className='flex justify-between items-center w-full flex-wrap'>
                    <div className='flex flex-wrap flex-col'>
                        <span className='text-2xl text-sky-500'>서버이름</span>
                        <span className='text-sm'>선택하신 서버의 이름 입니다.</span>
                    </div>
                    <div className='flex flex-wrap flex-row flex-end lg:mt-0 mt-2'>
                        <div>
                            <img className='w-14 h-14 mr-4 rounded-2xl border border-2' src={guildProfileLink(server)}/>
                        </div>
                        <div className='flex flex-wrap flex-col flex-end'>
                            <span className='text-xl'>{server.name}</span>
                            <span className='text-sm'>({server.id})</span>
                        </div>
                    </div>
                </div>
                <hr className='my-6 w-full'/>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>간단한 설명</span>
                        <span className='text-sm'>간단한 서버의 설명을 입력해주세요 (최대 50자)</span>
                    </div>
                    <input className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row my-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>간단한 설명</span>
                        <span className='text-sm'>간단한 서버의 설명을 입력해주세요 (최대 50자)</span>
                    </div>
                    <input className='w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
            </div>
          </>) : (<>
            <div className='flex flex-row flex-wrap items-center justify-center'>
                <ServerList callbackServer={SelectCallbackServer}/>
            </div>
          </>)}
      </div>
    </div>
  )
}

export default Home
