import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { EndPoints } from '@utils/Constants'
import type { NextPage } from 'next'
import HeadInfo from './HeadInfo'

interface ErrorPageProps {
    statusCode: number,
    message: string
}

const ErrorPage: NextPage<ErrorPageProps> = ({statusCode, message}) => {
	return <>
        <HeadInfo title='아카이브 - 오류'/>
		<div className="flex h-[100vh] w-full items-center flex-row justify-center" style={{fontFamily: "nanumsquare"}}>
          <span className='text-4xl font-bold border-r-2 pr-8'>{statusCode}</span>
          <span className='text-2xl pl-8'>{message}</span>
		</div>
	</>
}

export default ErrorPage;