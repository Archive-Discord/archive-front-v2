import HeadInfo from '@components/HeadInfo'
import DateFormet from '@utils/Date'
import { Bot, ServerList } from '@types'
import { formatNumber, guildProfileLink, userAvaterLink, userAvaterLinkAsPending } from '@utils/Tools'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '../../../styles/Server.module.css'
import DenyModal, { denyModalcallBackType } from '@components/pendinglist/denyModal'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import Markdown from '@components/MarkDown'
import GoogleAds from '@components/GoogleAds'
import Comments from '@components/Comments'
import ErrorPage from '@components/ErrorPage'
import axios, { AxiosError } from 'axios'
import Toast from '@components/Toast'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

interface botProps {
    bot: Bot,
    error?: boolean;
    message?: string;
    statusCode?: number;
    id: string;
}
export const getServerSideProps: GetServerSideProps = async(context) => {
  
  let bot = (await fetch(`${process.env.API_DOMAIN}/bots/${encodeURI(context.params.id as string)}`)
  .then(res => res.json())) as any;
  if(bot.status !== 200) {
    return {    
        props: {
            bot: null,
            error: true,
            message: bot.message,
            statusCode: bot.status,
            id: context.params.id
        },
    };
  }
  return {
    props: {
      bot: bot.data,
      error: false,
      message: bot.message,
      statusCode: bot.status,
      id: context.params.id
    },
  };
};
const PendingBot: NextPage<botProps> = ({bot, error, statusCode, message, id}) => {

  const openInviite = (link: string) => {
    window.open(link, "초대하기", "width=450, height=800")
  }

  if(error) return <ErrorPage statusCode={statusCode} message={message}/>
  return (
    <div className={styles.container}>
      <HeadInfo title={'아카이브 - ' + bot.name} description={bot.sortDescription} image={userAvaterLinkAsPending(bot)}/>
      <div className='flex lg:flex-row lg:justify-between lg:flex-nowarp flex-col items-center justify-center flex-warp mx-4'>
        <div className='flex lg:flex-row flex-col items-center'>
            <img className='lg:w-40 w-36 rounded-3xl' src={userAvaterLinkAsPending(bot)}/>
            <div className='flex flex-col lg:items-start items-center'>
                {bot.new ? (null) : (<>
                    <span className='lg:ml-6 text-xl font-bold truncate lg:mt-0 mt-2 text-red-400'><i className="fas fa-exclamation-triangle mr-2"/>정보 갱신불가</span>
                </>)}
                <span className='lg:ml-6 text-3xl font-bold truncate lg:mt-0 mt-1'>{bot.name}</span>
                <span className='flex flex-row lg:ml-6 text-lg font-semibold lg:mt-2 mx-auto'>
                    <span className='mr-1'><i className="fas fa-server mr-1"/>{formatNumber(bot.servers)}개</span>
                    <span className='mx-2'><i className="fas fa-calendar-alt mr-1"/>{DateFormet(bot.created_at).fromNow(true)}전 생성</span>
                </span>
            </div>
        </div>
        <div className='flex flex-row items-center text-xl lg:mt-0 mt-5'>
            <button onClick={() => (openInviite(bot.invite))} className='border bg-sky-500 px-5 rounded-xl text-white py-2 mx-1 hover:bg-sky-400 transform hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'>초대하기</button>
            <Link href={`/bots/${bot.id}/like`}>
                <a className='border px-5 rounded-xl py-2 mx-1 hover:bg-stone-200 hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'><i className="fas fa-caret-up mr-2"/>좋아요 ({formatNumber(bot.like)})</a>
            </Link>
        </div>
      </div>
      <div className="max-w-7xl my-2 mx-auto">
        <GoogleAds size='short'/>
      </div>
      <div className='flex justify-between w-full border-b mt-10'>
        <div>
            <button className='py-2 relative border-b border-sky-400 text-3xl'>
                소개
            </button>
        </div>
        <div className='flex items-center mr-2'>
            <Menu as="div" className="ml-3 relative">
                <div>
                    <Menu.Button>
                        <i className="fas fa-info border px-4 py-2 rounded-xl py-2 mx-1 hover:bg-stone-200"/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <>
                            <Link href={`/bots/${bot.id}/report`}>
                                <a>
                                    <div className='flex items-center px-4 py-2'>
                                    <a className={classNames(active ? 'bg-gray-100' : '', 'block text-rose-600 hover:text-sky-500 hover:underline hover:underline-offset-4')}>
                                        신고
                                    </a>
                                    </div>
                                </a>
                            </Link>
                            </>
                        )}
                        </Menu.Item>

                    </Menu.Items>
                </Transition>
                </Menu>
        </div>
      </div>
      <div className='lg:flex lg:flex-row-reverse'>
          <div className='mb-1 w-full lg:w-1/4'>
              <div className='py-3 px-7 text-black rounded my-4'>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold mb-2'>정보</span>
                    <div className='flex flex-row justify-between p-1'>
                        <span><i className="fas fa-server mr-1"/>서버 수</span>
                        <span>{formatNumber(bot.servers)}개</span>
                    </div>
                    <div className='flex flex-row justify-between p-1'>
                        <span><i className="fas fa-calendar-alt mr-1"/>서버 생성일</span>
                        <span>{DateFormet(bot.created_at).fromNow(true)}전 생성</span>
                    </div>
                    <div className='flex flex-row justify-between p-1'>
                        <span><i className="fas fa-thumbs-up mr-1"/>좋아요</span>
                        <span>{formatNumber(bot.like)}개</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>카테고리</span>
                    <div className='flex flex-row flex-wrap'>
                        {bot.categories.map((name, index) => (
                            <div key={index} className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                <span className='text-base p-1 px-2'>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>관리자</span>
                    {bot.owners.map((owner, index) => (
                        <Link key={index} href={`/users/${owner.id}`}>
                            <a className='flex flex-row items-center p-2 rounded-3xl my-1 hover:bg-stone-200'>
                                <img className='w-10 rounded-full' src={userAvaterLink(owner)}/>
                                <span className='text-lg ml-2'>{owner.username}<span className='text-gray text-sm'>#{owner.discriminator}</span></span>
                            </a>
                        </Link>
                    ))}
                </div>
                {bot.website && bot.support ? (
                    <>
                    <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>관련링크</span>
                    <div className='flex flex-row flex-wrap'>
                        {bot.support ? (<>
                            <a href={bot.support} rel="noreferrer" target="_blank" className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                <span className='text-base p-1 px-2'>서포트 서버</span>
                            </a>
                        </>) : (null)}
                        {bot.website ? (<>
                            <a href={bot.website} rel="noreferrer" target="_blank" className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                <span className='text-base p-1 px-2'>홈페이지</span>
                            </a>
                        </>) : (null)}
                    </div>
                </div>
                    </>
                ) : (null)}
              </div>
          </div>
          <div className='w-full lg:pr-5 lg:w-3/4'>
              <div className='py-3 px-7 text-black rounded my-4'>
                <Markdown markdown={bot.description}/>
              </div>
              <div className="max-w-7xl my-2 mx-auto">
                <GoogleAds size='short'/>
              </div>
              <div className='flex justify-between w-full border-b mt-10'>
                <div>
                    <button className='py-2 relative border-b border-sky-400 text-3xl'>
                        리뷰
                    </button>
                </div>
               </div>
               <div className='py-3 px-7 text-black rounded my-4'>
                    <Comments type='bots' id={bot.id}/>
                </div>
          </div>
      </div>
    </div>
  )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default PendingBot;