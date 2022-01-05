import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UserObject } from '@types'
import { NavBarList } from '@utils/Constants'
import Link from 'next/link'

const NavBar: NextPage = () => {
  const [user, setUser] = useState<UserObject>()
  const [navBarOpen, setNavBarOpen] = useState<boolean>()

  const OnclickNavBarOpen = () => {
    if (navBarOpen) {
      setNavBarOpen(false)
    } else {
      setNavBarOpen(true)
    }
  }
  useEffect(() => {
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
          <div className="w-full text-sm lg:flex lg:justify-between lg:flex-wrap">
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
                </>
              ):(
                <>
                  <Link href='/login'>
                    <a className="block mt-4 lg:inline-block lg:mt-0 rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">
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
