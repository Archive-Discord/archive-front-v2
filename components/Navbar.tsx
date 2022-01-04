import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UserObject } from '@types'
import Link from 'next/link'

const NavBar: NextPage = () => {
  const [user, setUser] = useState<UserObject>()
  useEffect(() => {
  }, [])

  return (
    <>
    <nav className='sticky top-0 z-40 flex flex-wrap items-center px-2 py-2 backdrop-blur text-gray-100 border-b border-gray-900/10'>
        <div className='container flex flex-wrap justify-between mx-auto px-4'>
          <div className='flex items-center'>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 text-3xl font-bold">ARCHIVE</a>
            </Link>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">홈</a>
            </Link>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">서버 리스트</a>
            </Link>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">봇 리스트</a>
            </Link>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">개발자</a>
            </Link>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500 hover:underline hover:underline-offset-4">서포트 서버</a>
            </Link>
          </div>
          <div className='flex items-center'>
            <Link href='/'>
              <a className="rounded-lg px-3 py-2 text-gray-700 font-medium hover:text-sky-500">홈</a>
            </Link>
          </div>
        </div>
    </nav>
    </>
  )
}

export default NavBar
