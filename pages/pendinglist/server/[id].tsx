import HeadInfo from '@components/HeadInfo'
import DateFormet from '@utils/Date'
import { ServerList } from '@types'
import { formatNumber, guildProfileLink, userAvaterLink } from '@utils/Tools'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '../../../styles/Server.module.css'
import DenyModal, { denyModalcallBackType } from '@components/pendinglist/denyModal'
import { useState } from 'react'
import Link from 'next/link'
import Markdown from '@components/MarkDown'
import GoogleAds from '@components/GoogleAds'
import Comments from '@components/Comments'
import ErrorPage from '@components/ErrorPage'
import axios, { AxiosError } from 'axios'
import Toast from '@components/Toast'
import { useRouter } from 'next/router'

interface ServerProps {
    server: ServerList,
    error?: boolean;
    message?: string;
    statusCode?: number;
    id: string;
}
export const getServerSideProps: GetServerSideProps = async(context) => {
  
  let server = (await fetch(`${process.env.API_DOMAIN}/submit/submitlist/server/${encodeURI(context.params.id as string)}`, {
    headers: {
        "Authorization": "Bearer " + context.req.cookies['Authorization']
    }
  })
  .then(res => res.json())) as any;
  if(server.status !== 200) {
    return {    
        props: {
            server: null,
            error: true,
            message: server.message,
            statusCode: server.status,
            id: context.params.id
        },
    };
  }
  return {
    props: {
      server: server.data,
      error: false,
      message: server.message,
      statusCode: server.status,
      id: context.params.id
    },
  };
};
const PendingServer: NextPage<ServerProps> = ({server, error, statusCode, message, id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<string>();
  const router = useRouter()
  const acceptServer = async() => {
    await axios.patch(`/submit/submitlist/server/${id}/accept`)
     .then((res) => {
        Toast('심사를 성공적으로 승인했습니다.', 'success')
        Toast('잠시후 심사목록 페이지로 이동합니다.', 'success')
        setTimeout(() => {
            router.push('/pendinglist')
        }, 3000)
     }).catch((e: AxiosError) => {
        Toast(e.response.data.message, 'error')
     })
  }

  const denyServer = async() => {
    if(!reason) return Toast('거절 사유를 입력해주세요!', 'error')
    await axios.patch(`/submit/submitlist/server/${id}/deny`, {
        reason: reason
    })
     .then((res) => {
        Toast('심사를 성공적으로 거절했습니다.', 'success')
        Toast('잠시후 심사목록 페이지로 이동합니다.', 'success')
        setTimeout(() => {
            router.push('/pendinglist')
        }, 3000)
     }).catch((e: AxiosError) => {
        Toast(e.response.data.message, 'error')
     })
  }

  const denyModalShow = (status: boolean, type: denyModalcallBackType) => {
    setIsOpen(status)
    if(type === "CONFIRM") {
        denyServer()
    }
  }

  const reasonHanler = (reason: string) => {
    setReason(reason)
  }

  if(error) return <ErrorPage statusCode={statusCode} message={message}/>
  return (
    <div className={styles.container}>
      <HeadInfo title={server.name + " 심사 - 아카이브"} description={server.sortDescription} image={guildProfileLink(server)}/>
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
            <button onClick={() => (acceptServer())} className='border bg-sky-500 px-5 rounded-xl text-white py-2 mx-1 hover:bg-sky-600 transform hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'>승인하기</button>
            <button onClick={() => (setIsOpen(true))} className='border bg-red-500 px-5 rounded-xl text-white py-2 mx-1 hover:bg-red-700 hover:-translate-y-1 transition duration-100 ease-in cursor-pointer'>거절하기</button>
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
                            <div key={index} className='border flex flex-row flex-wrap items-center rounded-xl my-1 hover:bg-stone-200 mx-1'>
                                <span className='text-base p-1 px-2'>{name}</span>
                            </div>
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
      {isOpen ? (<DenyModal showCallback={denyModalShow} reasonCallback={reasonHanler} />): null}
    </div>
  )
}

export default PendingServer;

