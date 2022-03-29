import ErrorPage from '@components/ErrorPage'
import HeadInfo from '@components/HeadInfo'
import Markdown from '@components/MarkDown'
import DropDown, { DropDwonItem } from '@components/MultiDropDown'
import Paginator from '@components/Paginator'
import ServerCard from '@components/ServerCard'
import Toast from '@components/Toast'
import { Bot, CategoryType, ServerList } from '@types'
import { isValidURL, userAvaterLink, userAvaterLinkAsPending } from '@utils/Tools'
import axios, { AxiosError } from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../../styles/Home.module.css'
import useCopyClipboard from 'react-use-clipboard'
import Link from 'next/link'


const categorios: DropDwonItem[] = [
    {
      id: 1,
      name: '게임'
    },{
      id: 2,
      name: '마인크래프트'
    },{
      id: 3,
      name: '배틀그라운드'
    },{
      id: 4,
      name: '오버워치'
    },{
      id: 5,
      name: '개발'
    },{
      id: 6,
      name: '봇'
    },{
      id: 7,
      name: "그림"
    },{
      id: 8,
      name: "음악"
    }
  ]
interface editProps {
    bot: Bot
    error?: boolean;
    message?: string;
    statusCode?: number;
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  
    let bot = (await fetch(`${process.env.API_DOMAIN}/bots/${encodeURI(context.params.id as string)}/owner`, {
        headers: {
            'Authorization': `Bearer ${context.req.cookies['Authorization']}`
        }
    })
    .then(res => res.json())) as any;
    if(bot.status !== 200) {
      return {    
          props: {
              bot: null,
              error: true,
              message: bot.message,
              statusCode: bot.status,
              id: context.params.id
          }
      };
    }
    return {
      props: {
        bot: bot.data,
        error: false,
        message: bot.message,
        statusCode: bot.status,
        id: context.params.id
      }
    };
  };
const Home: NextPage<editProps> = ({ bot, error, message, statusCode }) => {
  if(error) return <ErrorPage statusCode={statusCode} message={message} />
  const [description, setDescription] = useState(bot.description)
  const [website, setWebsite] = useState(bot.website)
  const [supprot, setSupprot] = useState(bot.support)
  const [invite, setInvite] = useState(bot.invite)
  const [prefix, setPrefix] = useState(bot.prefix)
  const [sortDescription, setSortDescription] = useState(bot.sortDescription)
  const [token, setToken] = useState(bot.token)
  const [category, setCategory] = useState<string[]>(bot.categories)
  const [tokenCopy, setTokenCopy] = useCopyClipboard(token, {
    successDuration: 2000
  })
  const router = useRouter()

  const selectCategory = (category: CategoryType[]) => {
    let categoryList: string[] = []
    category.forEach((x) => {
      categoryList.push(x.name)
    })
    setCategory(categoryList)
  }

  const UpdateBot = async() => {
    if(website) {
      if(!isValidURL(website)) {
        return Toast('올바른 링크를 입력해주세요', 'error') 
      }
    }
    if(!sortDescription) {
      return Toast('간단한 설명을 입력해주세요', 'error') 
    }
    if(category.length === 0) {
      return Toast('카테고리를 선택해주세요', 'error') 
    }
    if(!description) {
      return Toast('설명을 입력해주세요', 'error')
    }
    if(!prefix) {
      return Toast('접두사를 입력해주세요', 'error')
    }
    if(!invite) {
      return Toast('초대링크를 입력해주세요', 'error')
    }

    await axios.post(`/bots/${bot.id}/edit`, {
      id: bot.id,
      categoios: category,
      description: description,
      sortDescription: sortDescription,
      website: website,
      support: supprot,
      invite: invite,
      prefix: prefix
    }).then((data) => {
      Toast('업데이트가 완료되었습니다', 'success')
      Toast('잠시후 봇 페이지로 이동됩니다', 'success')
      setTimeout(() => {
        router.push(`/bots/${bot.id}`)
      }, 2000)
    })
    .catch((e: AxiosError) => {
      Toast(e.response.data.message, 'error')
    })
  }
  const refreshToken = () => {
      axios.post(`/bots/${bot.id}/refreshToken`, {
          token: token
      }, {
          headers: {
                'Authorization': `Bearer ${token}`
          }
      }
      ).then((data) => {
        setToken(data.data.data)
        Toast('성공적으로 새로운 토큰이 발급되었습니다!', 'success')
      }).catch((e: AxiosError) => {
        Toast(e.response.data.message, 'error')
      })
  }
  return (
    <div className={styles.container} style={{marginTop: "4rem"}}>
      <HeadInfo title={`${bot.name} 봇 관리 - 아카이브`}/>
      <div className="flex flex-col justify-center items-center flex-wrap min-h-[50vh]">
          <span className='my-10 text-3xl'>봇 관리하기</span>
            <div className='flex flex-row flex-wrap items-center justify-center w-full border p-4 rounded-2xl lg:w-[55vw] max-w-[95vw] mb-10'>
                <div className='flex justify-between items-center w-full flex-wrap mb-2'>
                    <Link href={`/bots/${bot.id}`}>
                        <a className="hover:text-sky-500"><i className="w-4 fas fa-angle-left font-sky-500"/><span className="lg:text-xl text-lg">{bot.name} 페이지로 돌아가기</span></a>
                    </Link>
                    <span/>
                </div>
                <div className='flex justify-between items-center w-full flex-wrap'>
                    <div className='flex flex-wrap flex-col'>
                        <span className='text-2xl text-sky-500'>봇 이름*</span>
                        <span className='text-sm'>봇의 이름 입니다.</span>
                    </div>
                    <div className='flex flex-wrap flex-row items-center flex-end lg:mt-0 mt-2'>
                        <div>
                            <img className='w-14 h-14 mr-4 rounded-2xl border border-2' src={userAvaterLinkAsPending(bot)}/>
                        </div>
                        <div className='flex flex-wrap flex-col flex-end'>
                            <span className='text-xl'>{bot.name}</span>
                            <span className='text-sm'>({bot.id})</span>
                        </div>
                    </div>
                </div>
                <hr className='my-6 w-full'/>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>토큰</span>
                        <span className='text-sm'>봇 서버 수 업데이트를 위한 토큰입니다</span>
                    </div>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='flex items-center mt-2 lg:mt-0 p-3 h-10 border rounded-md'>{token ? "**********" : "토큰이 없습니다 아래 재발급 버튼을 눌러 발급해주세요"}</span>
                        <div className='flex flex-wrap flex-row w-full mt-1'>
                            <button className={`py-0.5 border rounded-md px-2 mr-1 cursor-default focus:outline-none focus:ring-0 hover:border-sky-500 ${tokenCopy ? "bg-sky-500 text-white" : null}`} onClick={setTokenCopy}>{tokenCopy ? "복사됨" : "복사"}</button>
                            <button className='py-0.5 border rounded-md px-2 mx-1 cursor-default focus:outline-none focus:ring-0 hover:border-sky-500' onClick={() => (refreshToken())}>재발급</button>
                        </div>
                    </div>
                </div>
                <hr className='my-6 w-full'/>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>간단한 설명*</span>
                        <span className='text-sm'>간단한 봇의 설명을 입력해주세요 (최대 50자)</span>
                    </div>
                    <input value={sortDescription} onChange={(e) => (setSortDescription(e.target.value))} placeholder='간단한 설명' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>카테고리*</span>
                        <span className='text-sm'>봇과 관련된 카테고리를 선택해주세요</span>
                    </div>
                    <div className='w-full mt-2 lg:mt-0'>
                      <DropDown label='카테고리' selectCallback={selectCategory} items={categorios} isSelecte={categorios.filter((x) => {
                          return bot.categories.includes(x.name)
                      })}/>
                    </div>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>접두사*</span>
                        <span className='text-sm'>봇의 명령어를 사용하기 위한 접두사를 입력해 주세요 (최대 3글자)</span>
                    </div>
                    <input value={prefix} onChange={(e) => (setPrefix(e.target.value))} placeholder='/' maxLength={3} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>초대링크*</span>
                        <span className='text-sm'>봇을 초대하기 위한 초대 링크를 입력해 주세요</span>
                    </div>
                    <input value={invite} onChange={(e) => (setInvite(e.target.value))} placeholder='https://discord.com/api/oauth2/authorize?client_id=951861483170578502&permissions=8&scope=bot%20applications.commands' className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>서포트 서버</span>
                        <span className='text-sm'>서포트 서버 주소를 입력합니다</span>
                    </div>
                    <div className='flex items-center w-full'>
                      <span>discord.gg/</span>
                      <input value={supprot} onChange={(e) => (setSupprot(e.target.value))} placeholder='WtGq7D7BZm' maxLength={50} className='w-full mt-2 lg:mt-0 p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                    </div>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>웹 사이트</span>
                        <span className='text-sm'>봇과 관련된 웹사이트를 입력합니다</span>
                    </div>
                    <input value={website} onChange={(e) => (setWebsite(e.target.value))} placeholder='https://archiver.me/' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>설명*</span>
                        <span className='text-sm'>봇에 대한 설명을 자세하게 입력해 주세요 (마크다운)</span>
                    </div>
                    <textarea onChange={(e) => (setDescription(e.target.value))} value={description} placeholder='설명' className='mt-2 w-full p-4 h-[40vh] border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>설명 미리보기</span>
                    </div>
                    <div className='w-full mt-2 p-4'>
                      <Markdown markdown={description}/>
                    </div>
                </div>
            </div>
            <div className='border p-4 rounded-2xl w-full lg:w-[55vw] max-w-[95vw] mb-6'>
                  <div className='flex flex-wrap w-full justify-between'>
                    <div className='flex flex-col'>
                      <span className='text-2xl text-sky-500'>관리자 (추가예정)</span>
                      <span className='text-sm'>관리자를 추가하거나 삭제합니다</span>
                    </div>
                    <div>
                      <button className='w-full flex p-3 h-10 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 items-center border'><i className="fas fa-plus"/></button>
                    </div>
                  </div>
                  <div>
                    {bot.owners.map((owner, index) => (
                          <Link key={index} href={`/users/${owner.id}`}>
                              <a target="_blank" className='flex flex-row items-center p-2 rounded-2xl my-1 hover:bg-gray-100 border'>
                                  <img className='w-10 rounded-full' src={userAvaterLink(owner)}/>
                                  <span className='text-lg ml-2'>{owner.username}<span className='text-gray text-sm'>#{owner.discriminator}</span></span>
                              </a>
                          </Link>
                      ))}
                  </div>
            </div>
            <button onClick={() => (UpdateBot())} className='focus:outline-none hover:ring-sky-500 hover:border-sky-500 hover:ring-1 hover:ring-sky-500 border rounded-2xl w-full lg:w-[55vw] max-w-[95vw] h-16 text-2xl font-bold mb-8'>저장하기</button>
            </div>
    </div>
  )
}

export default Home
