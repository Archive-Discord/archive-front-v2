import HeadInfo from '@components/HeadInfo'
import DateFormet from '@utils/Date'
import { ServerList } from '@types'
import { formatNumber, guildProfileLink, userAvaterLink } from '@utils/Tools'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '../../../styles/Server.module.css'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import Markdown from '@components/MarkDown'
import GoogleAds from '@components/GoogleAds'
import Comments from '@components/Comments'
import ErrorPage from '@components/ErrorPage'

interface ServerProps {
    server: ServerList,
    error?: boolean;
    message?: string;
    statusCode?: number;
}
export const getServerSideProps: GetServerSideProps<ServerProps> = async(context) => {
  
  let server = (await fetch(
    `${process.env.API_DOMAIN}/servers/${encodeURI(context.params.id as string)}`
  )
  .then(res => res.json())) as any;
  if(server.status !== 200) {
    return {
        props: {
            server: null,
            error: true,
            message: server.message,
            statusCode: server.status
        },
    };
  }
  return {
    props: {
        server: server.data,
        error: false,
        message: server.message,
        statusCode: server.status
    },
  };
};
const Home: NextPage<ServerProps> = ({server, error, statusCode, message}) => {
  if(error) return <ErrorPage statusCode={statusCode} message={message}/>
  return (
    <div className={styles.container}>
      <HeadInfo title={server.name + ' - 아카이브'} description={server.sortDescription} image={guildProfileLink(server)}/>
      <div className='flex lg:flex-row lg:justify-between lg:flex-nowarp flex-col items-center justify-center flex-warp mx-4'>
        <div className='flex lg:flex-row flex-col items-center'>
            <img className='lg:w-40 w-36 rounded-3xl' src={guildProfileLink(server)}/>
            <div className='flex flex-col lg:items-start items-center'>
                {server.bot ? (null) : (<>
                    <span className='lg:ml-6 text-xl font-bold truncate lg:mt-0 mt-2 text-red-400'><i className="fas fa-exclamation-triangle mr-2"/>정보 갱신불가</span>
                </>)}
                <span className='lg:ml-6 text-3xl font-bold truncate lg:mt-0 mt-1'>{server.name}</span>
                <span className='flex flex-row lg:ml-6 text-lg font-semibold lg:mt-2 mx-auto'>
                    <span className='mr-1'><i className="fas fa-users mr-1"/>{formatNumber(server.members)}명</span>
                    <span className='mx-2'><i className="fas fa-calendar-alt mr-1"/>{DateFormet(server.create_date).fromNow(true)}전 생성</span>
                </span>
            </div>
        </div>
        <div className='flex flex-row items-center text-xl lg:mt-0 mt-5'>
            <Link href={`/servers/${server.id}/invite`}>
                <a className='border bg-sky-500 px-5 rounded-xl text-white py-2 mx-1 hover:bg-sky-400 transform hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'>입장하기</a>
            </Link>
            <Link href={`/servers/${server.id}/like`}>
                <a className='border px-5 rounded-xl py-2 mx-1 hover:bg-stone-200 hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'><i className="fas fa-caret-up mr-2"/>좋아요 ({formatNumber(server.like)})</a>
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
                            <Link href={`/servers/${server.id}/report`}>
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
                        <span><i className="fas fa-users mr-1"/>멤버 수</span>
                        <span>{formatNumber(server.members)}명</span>
                    </div>
                    <div className='flex flex-row justify-between p-1'>
                        <span><i className="fas fa-calendar-alt mr-1"/>서버 생성일</span>
                        <span>{DateFormet(server.create_date).fromNow(true)}전 생성</span>
                    </div>
                    <div className='flex flex-row justify-between p-1'>
                        <span><i className="fas fa-thumbs-up mr-1"/>좋아요</span>
                        <span>{formatNumber(server.like)}개</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>카테고리</span>
                    <div className='flex flex-row flex-wrap'>
                        {server.categories.map((name, index) => (
                            <Link key={index} href={`/search?query=${name}`}>
                                <a className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                    <span className='text-base p-1 px-2'>{name}</span>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>관리자</span>
                    {server.owners.map((owner, index) => (
                        <Link key={index} href={`/users/${owner.id}`}>
                            <a className='flex flex-row items-center p-2 rounded-3xl my-1 hover:bg-stone-200'>
                                <img className='w-10 rounded-full' src={userAvaterLink(owner)}/>
                                <span className='text-lg ml-2'>{owner.username}<span className='text-gray text-sm'>#{owner.discriminator}</span></span>
                            </a>
                        </Link>
                    ))}
                </div>
                {server.website || server.support ? (
                    <>
                    <div className='flex flex-col'>
                    <span className='text-xl font-bold my-2'>관련링크</span>
                    <div className='flex flex-row flex-wrap'>
                        {server.support ? (<>
                            <a href={server.support} rel="noreferrer" target="_blank" className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                <span className='text-base p-1 px-2'>서포트 서버</span>
                            </a>
                        </>) : (null)}
                        {server.website ? (<>
                            <a href={server.website} rel="noreferrer" target="_blank" className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
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
                <Markdown markdown={server.description}/>
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
                    <Comments type='servers' id={server.id}/>
                </div>
          </div>
      </div>
    </div>
  )
}

export default Home
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

