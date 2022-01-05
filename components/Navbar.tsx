import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '@types'
import { NavBarList } from '@utils/Constants'
import { userAvaterLink } from '@utils/Discord'
import Link from 'next/link'
import Dropdown from '@components/UserDropDown'
import { useRouter } from 'next/router'
import { redirectTo } from '@utils/Tools'

const NavBar: NextPage = () => {
  const [user, setUser] = useState<User>()
  const [navBarOpen, setNavBarOpen] = useState<boolean>()
  const router = useRouter()
  const OnclickNavBarOpen = () => {
    if (navBarOpen) {
      setNavBarOpen(false)
    } else {
      setNavBarOpen(true)
    }
  }

  const ClickLogin = () => {
    localStorage.redirectTo = window.location.href
    redirectTo(router, '/api/v1/auth/login')
  }
  useEffect(() => {
		if(localStorage.userData) {
			return setUser(JSON.parse(localStorage.userData) || null)
		}
		axios.get('/api/v1/users/@me').then(data => {
			if(data.status !== 200) return setUser(null)
			return setUser(JSON.parse(localStorage.userData = JSON.stringify({
				_id: data.data.data.id,
				username: data.data.data.username,
				discriminator: data.data.data.discriminator,
        avatar: data.data.data.avatar
			})))
		}).catch((e) => (
      setUser(null)
    ))

  }, [])

  return (
    <>
      <nav className="sticky top-0 z-40 flex flex-wrap items-center px-5 py-2 backdrop-blur text-gray-100 border-b border-gray-900/10">
        <div className='container flex flex-wrap justify-between mx-auto px-4 items-center'>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href='/'>
            <a className="logo rounded-lg px-3 py-2 text-gray-700 text-2xl font-semibold">ARCHIVE</a>
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
            </div>
            <div>
          {user ? (
                <>
                  <div className='mt-4 lg:mt-0 lg:ml-0 lb:mb-0 flex text text-gray-700 items-center font-semibold ml-2 mb-2 lg:mb-0'>
                    <img className='w-8 h-8 rounded-full mr-1.5' src={userAvaterLink(user)}/>{user.username}<Dropdown/>
                  </div>
                </>
              ):(
                <>
                  <Link href='/api/v1/auth/login'>
                    <a onClick={()=> (ClickLogin())} className="block mt-4 lg:inline-block lg:mt-0 rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">
                      로그인
                    </a>
                  </Link>
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