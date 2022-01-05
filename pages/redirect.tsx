import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { redirectTo } from '@utils/Tools'

const Redirect = () => {
	const router = useRouter()
	useEffect(() => {
        const to = localStorage.redirectTo || '/'
        redirectTo(router, to)
	})
	return (<>
		<div className="w-50 h-screen flex items-center justify-center flex-col">
            <Link href={'/'}>
                <a className='text-2x1'>리다이렉트되지 않는다면 클릭해주세요</a>
            </Link>
            <svg className="animate-spin mt-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
            <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
		</div>
	</>)
}

export default Redirect