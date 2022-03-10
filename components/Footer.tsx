import { useEffect, useState } from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
      return(
              <>
              <div className="border-t border-gray-200 pb-4 dark:border-white dark:bg-battlebot-black dark:text-white">
              <div
                className="
            container
            flex flex-col flex-wrap
            px-4
            py-10
            mx-auto
            md:items-center
            lg:items-start
            md:flex-row md:flex-nowrap
            
          "
              >
                <Link href='/'>
                    <a className='flex items-center my-auto mx-auto'>
                    <img className="px-3 py-1" src='/logo_sm.png'/>
                    </a>
                </Link>
                <div className="justify-between w-full mt-4 text-center lg:flex" style={{fontFamily: "nanumsquare"}}>
                  <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                    <h2 className="mb-2 font-bold tracking-widest text-xl text-gray-900 dark:text-white">
                      아카이브
                    </h2>
                    <ul className="mb-8 space-y-2 text-base list-none ">
                      <li>
                        <Link href={"/"}>
                          <a className="text-gray-600 hover:text-gray-800 dark:text-white">메인</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/archive"}>
                          <a className="text-gray-600 hover:text-gray-800 dark:text-white">소개</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"https://github.com/Archive-Discord"}>
                          <a className="text-gray-600 hover:text-gray-800 dark:text-white">깃허브</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                  <h2 className="mb-2 font-bold tracking-widest text-xl text-gray-900 dark:text-white">
                      이용약관
                    </h2>
                    <ul className="mb-8 space-y-2 text-base list-none">
                      <li>
                        <Link href={"/terms"}>
                          <a className="text-gray-600 hover:text-gray-800 dark:text-white">이용약관</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/privacy"}>
                          <a className="text-gray-600 hover:text-gray-800 dark:text-white">개인정보처리방침</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                    <h2 className="mb-2 font-bold tracking-widest text-xl text-gray-900 dark:text-white">
                    지원
                    </h2>
                    <ul className="mb-8 space-y-2 text-base list-none">
                    <li>
                        <Link href={"/commands"}>
                        <a className="text-gray-600 hover:text-gray-800 dark:text-white">디스코드</a>
                        </Link>
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </>
      )
  }
export default Footer