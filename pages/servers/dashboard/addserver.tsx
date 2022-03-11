import ServerList from '@components/addserver/serverlist'
import HeadInfo from '@components/HeadInfo'
import Paginator from '@components/Paginator'
import ServerCard from '@components/ServerCard'
import { guildProfileLink, isValidURL } from '@utils/Tools'
import { CategoryType, DiscordUserGuild } from '@types'
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

# 서버소개

- 저희 서버는 게임을 주로 다루고 있습니다!

## 특징

- 저희 서버만의 특징은 ~~가 있습니다!`

const Home: NextPage = () => {
  const [server, setServer] = useState<DiscordUserGuild>()
  const [category, setCategory] = useState<string[]>()
  const [website, setWebsite] = useState<string>()
  const [description, setDescription] = useState<string>(defaltDescripton)
  const [sortDescription, setSortDescription] = useState<string>()
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

  const SelectCallbackServer = (server: DiscordUserGuild) => {
    setServer(server)
  }
  const selectCategory = (category: CategoryType[]) => {
    let categoryList: string[] = []
    category.forEach((x) => {
      categoryList.push(x.name)
    })
    setCategory(categoryList)
  }

  const submitServer = async() => {
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

    await axios.post('/servers/submit', {
      id: server.id,
      categoios: category,
      description: description,
      sortDescription: sortDescription,
      website: website
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
      <HeadInfo title='서버추가 - 아카이브'/>
      <div className="flex flex-col justify-center items-center flex-wrap min-h-[50vh]">
          <span className='my-10 text-3xl'>서버 추가하기</span>
          {server ? (<>
            <div className='flex flex-row flex-wrap items-center justify-center w-full border p-4 rounded-2xl lg:w-[55vw] max-w-[95vw] mb-10'>
                <div className='flex justify-between items-center w-full flex-wrap'>
                    <div className='flex flex-wrap flex-col'>
                        <span className='text-2xl text-sky-500'>서버이름*</span>
                        <span className='text-sm'>선택하신 서버의 이름 입니다.</span>
                    </div>
                    <div className='flex flex-wrap flex-row items-center flex-end lg:mt-0 mt-2'>
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
                        <span className='text-2xl text-sky-500'>간단한 설명*</span>
                        <span className='text-sm'>간단한 서버의 설명을 입력해주세요 (최대 50자)</span>
                    </div>
                    <input onChange={(e) => (setSortDescription(e.target.value))} placeholder='간단한 설명' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>카테고리*</span>
                        <span className='text-sm'>서버와 관련된 카테고리를 선택해주세요</span>
                    </div>
                    <div className='w-full mt-2 lg:mt-0'>
                      <DropDown label='카테고리' selectCallback={selectCategory} items={categorios}/>
                    </div>
                </div>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>웹 사이트</span>
                        <span className='text-sm'>서버와 관련된 웹사이트를 입력합니다</span>
                    </div>
                    <input onChange={(e) => (setWebsite(e.target.value))} placeholder='웹 사이트' maxLength={50} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <div className='flex justify-between items-center w-full flex-row flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>설명*</span>
                        <span className='text-sm'>서버에 대한 설명을 자세하게 입력해 주세요 (마크다운)</span>
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
                    <Link href={'/privacy'}><a className='text-sky-500'>개인정보처리방침</a></Link>과<Link href={"/terms"}><a className='text-sky-500'>이용약관</a></Link>에 동의합니다.
                  </label>
                </div>
            </div>
            <button onClick={() => (submitServer())} className='border rounded-2xl w-full lg:w-[55vw] max-w-[95vw] h-16 text-2xl font-bold mb-8'>신청하기</button>
          </>) : (<>
            <div className='flex flex-row flex-wrap items-center justify-center mt-5'>
                <ServerList callbackServer={SelectCallbackServer}/>
            </div>
          </>)}
      </div>
    </div>
  )
}

export default Home
