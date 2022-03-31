import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {useRouter} from 'next/router'
import { EndPoints } from '@utils/Constants'
import Link from 'next/link'
import { User } from '@types'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface NavBarDropDownProps {
  user: User
}

const DropDown: React.FC<NavBarDropDownProps> = ({user}) => {
  const router = useRouter()

  const onClickLogout = () => {
    localStorage.removeItem('userData')
    window.location.href = `${EndPoints.Archive.API}/auth/logout`
  }
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button>
            <i className="fas fa-caret-down"/>
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
        <Menu.Items className="origin-top-right absolute lg:right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
              {({ active }) => (
                <>
                    <Link href={`/users/${user.id}`}>
                      <a className='flex items-center px-4 py-2'>
                      <i className="fas fa-user mr-2"/>
                        <a className={classNames(active ? 'bg-gray-100' : '', 'font-normal block text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4')}>
                          내 정보
                        </a>
                      </a>
                    </Link>
                    <button className='flex items-center px-4 py-2' onClick={()=>(onClickLogout())}>
                    <i className="fas fa-sign-out-alt mr-2"/>
                      <a className={classNames(active ? 'bg-gray-100' : '', 'font-normal block text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4')}>
                        로그아웃
                      </a>
                    </button>
                </>
              )}
            </Menu.Item>

        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDown