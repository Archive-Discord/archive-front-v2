import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '@types'
import { EndPoints, NavBarList } from '@utils/Constants'
import { checkUserFlag, userAvaterLink } from '@utils/Tools'
import Link from 'next/link'
import Dropdown from '@components/UserDropDown'

const NavBar: NextPage = () => {
  const [user, setUser] = useState<User>()
  const [flags, setFlags] = useState<number>()
  const [navBarOpen, setNavBarOpen] = useState<boolean>()
  const OnclickNavBarOpen = () => {
    if (navBarOpen) {
      setNavBarOpen(false)
    } else {
      setNavBarOpen(true)
    }
  }

  const ClickLogin = () => {
    localStorage.redirectTo = window.location.href
    window.location.href = `${EndPoints.Archive.API}/auth/discord`
  }
  useEffect(() => {
		axios.get('/users/@me').then(data => {
			if(data.status !== 200) return setUser(null)
      setFlags(data.data.data.archive_flags)
			return setUser(JSON.parse(localStorage.userData = JSON.stringify(data.data.data.user)))
		}).catch((e) => (
      setUser(null)
    ))

  }, [])

  return (
    <>
      <nav className="fixed top-0 z-40 flex flex-wrap items-center px-5 py-2 backdrop-blur text-gray-100 border-b border-gray-900/10 w-full">
        <div className='container flex flex-wrap justify-between mx-auto px-4 items-center'>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href='/'>
            <a className='flex items-center'>
            <img className="px-3 py-1 h-10" src='/logo_sm.png'/><span className='text-gray-700 text-xl font-semibold logo'>ARCHIVE</span>
            </a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-700 items-center" onClick={() => (OnclickNavBarOpen())}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>메뉴</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={
              "w-full block flex-grow lg:flex lg:items-center lg:w-auto" +
              (navBarOpen ? " flex" : " hidden")
            }>
          <div className="w-full text-sm lg:flex lg:justify-between lg:flex-wrap lg:items-center">
            <div>
              {NavBarList.map(({name, href}) => (
                <Link href={href} key={name}>
                  <a className="block mt-4 lg:inline-block lg:mt-0 rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">
                    {name}
                  </a>
                </Link>
              ))}
              {user ? (<>
              {
                checkUserFlag(flags, 'reviewer') ? (<>
                  <Link href={'/pendinglist'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">
                      리뷰 대기목록
                    </a>
                  </Link>
                </>) : (null)
              }
              </>) : (null)}
            </div>
            <div>
          {user ? (
                <>
                  <div className='mt-4 lg:mt-0 lg:ml-0 lb:mb-0 flex text text-gray-700 items-center font-semibold ml-2 mb-2 lg:mb-0'>
                    <img className='w-8 h-8 rounded-full mr-1.5' src={userAvaterLink(user)}/>{user.username}<Dropdown user={user}/>
                  </div>
                </>
              ):(
                <>
                  <a onClick={()=> (ClickLogin())} className="block mt-4 lg:inline-block lg:mt-0 rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">
                    로그인
                  </a>
                </>
              )}
          </div>
            
          </div>
        </div>
        </div>
      </nav>
    </>
  )
}
export default NavBar