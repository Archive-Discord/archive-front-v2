import type { NextPage } from 'next'
import HeadInfo from '@components/HeadInfo'

const ErrorPage = () => {
	return <>
        <HeadInfo title='아카이브 - 찾을 수 없는 페이지'/>
		<div className="flex h-[100vh] w-full items-center flex-row justify-center" style={{fontFamily: "nanumsquare"}}>
          <span className='text-4xl font-bold border-r-2 pr-8'>{404}</span>
          <span className='text-2xl pl-8'>찾을 수 없는 페이지 입니다</span>
		</div>
	</>
}

export default ErrorPage;