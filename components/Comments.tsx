import { useEffect, useState, useRef, useCallback, Fragment } from 'react'
import { EndPoints } from '@utils/Constants'
import { Comment, ApiRequestType, User } from '@types'
import { useInView } from "react-intersection-observer"
import { formatDate } from '@utils/Date'
import axios from 'axios'
import GoogleAds from './GoogleAds'
import { userAvaterLink } from '@utils/Tools'
import Link from 'next/link'
import Loading from './Loadning'

const Comments: React.FC<CommentsProps> = ({type, id}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false)
    const [isLast, setIsLast] = useState(false)
    const [user, setUser] = useState<User>()
    const [ref, inView] = useInView()

    const getItems = useCallback(async () => {
        setLoading(true)
        await axios.get(`${EndPoints.Archive.API}/${type}/${id}/comments?page=${page}`).then((res) => {
            if(res.data.data.totalPage === comments.length) {
                setIsLast(true)
            } else {
                setComments((curComments) => [...curComments, ...res.data.data.comments]);
            }
        })
        setLoading(false)
    }, [page])
	useEffect(() => {
      getItems()
    }, [getItems])
    
    useEffect(() => {
      if(isLast) return
      if (inView && !loading) {
        setPage(prevState => prevState + 1)
      }
    }, [inView, loading])

    useEffect(() => {
		if(localStorage.userData) {
			return setUser(JSON.parse(localStorage.userData) || null)
		}
		axios.get('/users/@me').then(data => {
			if(data.status !== 200) return setUser(null)
			return setUser(JSON.parse(localStorage.userData = JSON.stringify(data.data.data.user)))
		}).catch((e) => (
      setUser(null)
    ))

  }, [])
	return (
        <> 
        {user ? (<>
            <div className='flex flex-row' ref={ref}>
                <Link href={`/users/${user.id}`}>
                  <a><img className='lg:w-12 w-12' src={userAvaterLink(user)}/></a>
                </Link>
                <div className='flex flex-col w-full ml-4'>
                    <Link href={`/users/${user.id}`}>
                    <a className='lg:text-xl text-lg'>{user.username}</a>
                    </Link>
                    <textarea placeholder='리뷰를 남겨주세요!' className='p-4 border rounded-xl mt-2 bg-stone-100' style={{height: "130px"}}/>
                    <button className='w-24 rounded-xl mt-4 bg-stone-100 px-4 py-1 text-lg hover:bg-stone-200'>등록</button>
                </div>
            </div>
            <hr className='my-8'/>
        </>) : (null)}
            {comments
              .sort((a,b) => Number(b.published_date) - Number(a.published_date))
              .map((item, idx) => (
                <Fragment key={idx}>
                    {comments.length - 1 == idx ? (
                        <>
                            {loading ? (<>
                                <Loading/>
                            </>) : (<>
                                <div className='flex flex-row'>
                                    <Link href={`/users/${item.user.id}`}>
                                        <a><img className='lg:w-12 w-12' src={userAvaterLink(item.user)}/></a>
                                    </Link>
                                    <div className='flex flex-col w-full ml-4'>
                                        <div className='flex flex-row justify-between'> 
                                            <Link href={`/users/${item.user.id}`}>
                                                <a className='lg:text-xl text-lg flex items-center'>{item.user.username} 
                                                    <svg className='w-1 mx-2' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="50" cy="50" r="50"/>
                                                    </svg>
                                                    <span className='text-base items-end'>{formatDate(item.published_date)}</span>
                                                </a>
                                            </Link>
                                            {user && user.id === item.user.id ? (<>
                                                <button className='items-center mr-2 text-red-500'><i className="fas fa-trash"/></button>
                                            </>) : (null)}
                                        </div>
                                        <p className='p-4 border rounded-xl mt-2 bg-stone-100'>{item.comment}</p>
                                    </div>
                                </div>
                            </>)}
                            <GoogleAds size='short'/>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-row'>
                                <Link href={`/users/${item.user.id}`}>
                                    <a><img className='lg:w-12 w-12' src={userAvaterLink(item.user)}/></a>
                                </Link>
                                <div className='flex flex-col w-full ml-4'>
                                    <div className='flex flex-row justify-between'> 
                                        <Link href={`/users/${item.user.id}`}>
                                            <a className='lg:text-xl text-lg flex items-center'>{item.user.username} 
                                                <svg className='w-1 mx-2' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="50" cy="50" r="50"/>
                                                </svg>
                                                <span className='text-base items-end'>{formatDate(item.published_date)}</span>
                                            </a>
                                        </Link>
                                        {user && user.id === item.user.id ? (<>
                                            <button className='items-center mr-2 text-red-500'><i className="fas fa-trash"/></button>
                                        </>) : (null)}
                                    </div>
                                    <p className='p-4 border rounded-xl mt-2 bg-stone-100'>{item.comment}</p>
                                </div>
                            </div>
                            <hr className='my-8'/>
                        </>
                    )}
                </Fragment>
            ))}
        </>
    )
}
interface CommentsProps {
    type: ApiRequestType;
    id: string;
}

export default Comments;