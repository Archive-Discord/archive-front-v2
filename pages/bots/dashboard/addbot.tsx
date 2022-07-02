import ServerList from '@components/addserver/serverlist'
import HeadInfo from '@components/HeadInfo'
import Paginator from '@components/Paginator'
import BotFind from '@components/addbot/findbot'
import { guildProfileLink, isValidURL, userAvaterLink } from '@utils/Tools'
import { CategoryType, DiscordUserGuild, User } from '@types'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../../../styles/Home.module.css'
import DropDown, { DropDwonItem } from '@components/MultiDropDown'
import Toast from '@components/Toast'
import Markdown from '@components/MarkDown'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import ItemList from '@components/pendinglist/itemCard'
import Login from '@components/Login'

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

const defaltDescripton = 
`이 글을 지우고 원하시는 설명을 입력하셔도 됩니다.

# 봇소개

- 저희 봇은 게임을 주로 다루고 있습니다!

## 특징

- 저희 봇만의 특징은 ~~가 있습니다!`

const Addbot: NextPage = () => {
  const [bot, setBot] = useState<User>()
  const [category, setCategory] = useState<string[]>()
  const [website, setWebsite] = useState<string>()
  const [supprot, setSupprot] = useState<string>()
  const [description, setDescription] = useState<string>(defaltDescripton)
  const [sortDescription, setSortDescription] = useState<string>()
  const [prefix, setPrefix] = useState<string>("접두사")
  const [invite, setInvite] = useState<string>()
  const [login, setLogin] = useState<boolean>(true)
  const [agreement, setAgreement] = useState<boolean>(false)
  const router = useRouter()
  
  useEffect(() => {
    axios
      .get("/users/@me")
      .then(data => {
        setLogin(true)
      })
      .catch((e: AxiosError) => {
        setLogin(false)
      });
  }, [])

  const SelectCallbackBot = (bot: User) => {
    setBot(bot)
  }
  const selectCategory = (category: CategoryType[]) => {
    let categoryList: string[] = []
    category.forEach((x) => {
      categoryList.push(x.name)
    })
    setCategory(categoryList)
  }

  const submitBot = async() => {
    if(website) {
      if(!isValidURL(website)) {
        return Toast('올바른 링크를 입력해주세요', 'error') 
      }
    }
    if(!sortDescription) {
      return Toast('간단한 설명을 입력해주세요', 'error') 
    }
    if(!agreement) {
      return Toast('이용약관에 동의해주세요', 'error') 
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

    await axios.post('/bots/submit', {
      id: bot.id,
      categoios: category,
      description: description,
      sortDescription: sortDescription,
      website: website,
      support: supprot,
      invite: invite,
      prefix: prefix
    }).then((data) => {
      Toast('성공적으로 신청이 완료되었습니다! \n 승인까지 최대 3일이 걸릴 수 있습니다', 'success')
      Toast('잠시후 메인페이지로 이동됩니다', 'success')
      setTimeout(() => {
        router.push('/')
      }, 2000)
    })
    .catch((e: AxiosError) => {
      Toast(e.response.data.message, 'error')
    })
  }


  if(!login) return <Login/>
  return (
    <div className={styles.container} style={{marginTop: "5rem"}}>
      <HeadInfo title='봇 추가'/>
      <div className="flex flex-col justify-center items-center flex-wrap min-h-[50vh]">
          <span className='my-10 text-3xl'>봇 추가하기</span>
          {bot ? (<>
            <div className="bg-red-100 rounded-2xl py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full lg:w-[55vw] max-w-[95vw]" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
            <span>{prefix}정보 명령어에 신청자님의 아이디가 나오도록 표시해주세요</span>
          </div>
            <div className='flex flex-row flex-wrap items-center justify-center w-full border p-4 rounded-2xl lg:w-[55vw] max-w-[95vw] mb-10'>
                <div className='flex justify-between items-center w-full flex-wrap'>
                    <div className='flex flex-wrap flex-col'>
                        <span className='text-2xl text-sky-500'>봇 이름*</span>
                        <span className='text-sm'>입력하신 봇의 이름 입니다.</span>
                    </div>
                    <div className='flex flex-wrap flex-row items-center flex-end lg:mt-0 mt-2'>
                        <div>
                            <img className='w-14 h-14 mr-4 rounded-2xl border border-2' src={userAvaterLink(bot)}/>
                        </div>
                        <div className='flex flex-wrap flex-col flex-end'>
                            <span className='text-xl'>{bot.username}</span>
                            <span className='text-sm'>({bot.id})</span>
                        </div>
                    </div>
                </div>
                <hr className='my-6 w-full'/>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>간단한 설명*</span>
                        <span className='text-sm'>간단한 봇의 설명을 입력해주세요 (최대 50자)</span>
                    </div>
                    <input onChange={(e) => (setSortDescription(e.target.value))} placeholder='간단한 설명' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>카테고리*</span>
                        <span className='text-sm'>봇과 관련된 카테고리를 선택해주세요</span>
                    </div>
                    <div className='w-full mt-2 lg:mt-0'>
                      <DropDown label='카테고리' selectCallback={selectCategory} items={categorios}/>
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
                      <input onChange={(e) => (setSupprot(e.target.value))} placeholder='WtGq7D7BZm' maxLength={50} className='w-full mt-2 lg:mt-0 p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                    </div>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>웹 사이트</span>
                        <span className='text-sm'>봇과 관련된 웹사이트를 입력합니다</span>
                    </div>
                    <input onChange={(e) => (setWebsite(e.target.value))} placeholder='https://archiver.me/' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
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
                <div className='flex justify-start items-center w-full flex-row mt-6 text-lg p-4' id='agreement'>
                <input onChange={(e) => (setAgreement(e.target.checked))} className="form-check-input appearance-none h-4 w-4 border border-gray rounded-sm bg-white checked:bg-sky-500 checked:border-sky-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckprivacy"/>
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckprivacy">
                    <Link href={'/privacy'}><a target="_blank" className='text-sky-500'>개인정보처리방침</a></Link>과<Link href={"/terms"}><a target="_blank" className='text-sky-500'>이용약관</a></Link>에 동의합니다.
                  </label>
                </div>
            </div>
            <button onClick={() => (submitBot())} className='focus:outline-none hover:ring-sky-500 hover:border-sky-500 hover:ring-1 hover:ring-sky-500 border rounded-2xl w-full lg:w-[55vw] max-w-[95vw] h-16 text-2xl font-bold mb-8'>신청하기</button>
          </>) : (<>
            <div className='flex flex-row flex-wrap items-center justify-center mt-5'>
                <BotFind callbackBot={SelectCallbackBot}/>
            </div>
          </>)}
      </div>
    </div>
  )
}

export default Addbot
