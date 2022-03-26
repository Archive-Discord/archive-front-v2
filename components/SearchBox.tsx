import { SearchResult } from "@pages/search";
import { guildProfileLink, userAvaterLinkAsPending } from "@utils/Tools";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import TypeAnimation from 'react-type-animation';

const category = [
    "게임", 2000, "", 500, "개발", 2000, "", 500, "배틀그라운드", 2000, "", 500, "봇", 2000, "", 500, "그림"
]

interface SearchBoxResultProps {
    bots?: SearchResult[]
    servers?: SearchResult[]
    error?: string
    loading?: boolean
}

const SearchBox = () => {
    const ref = useRef();
    const router = useRouter()
    const [keyword, setKeyword] = useState<string>();
    const [searchServers, setSearchServers] = useState<SearchResult[]>();
    const [searchBots, setSearchBots] = useState<SearchResult[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>()
    const [show, setShow] = useState<boolean>(false);
    useOutsideClick(ref, outsideClickHandler);
    function outsideClickHandler () {
        setShow(false)
    }
    useEffect(() => {
        if(!keyword) return setError('검색어를 입력해주세요');;
        if(keyword.length < 2) return setError('2글자 이상 입력해주세요');
        setLoading(true)
        setShow(true)
        axios.get(`/search?query=${encodeURI(keyword)}`)
            .then(res => {
                setLoading(false)
                setError(null)
                setSearchServers(res.data.data.servers);
                setSearchBots(res.data.data.bots);
            })
            .catch((err: AxiosError) => {
                setLoading(false)
                setError(err.response.data.message)
            })
    }, [keyword])

    const keypressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if(!keyword || keyword === "없음") return
            router.push(`/search?query=${keyword ? keyword : ""}`) 
        }
        if(e.key === "Escape") {
            setShow(false)
        }   
    }
  return (
    <>
    <div className="min-h-[40vh] lg:max-w-[55vw] max-w-[90vw] flex flex-col justify-center mx-auto" style={{zIndex: "999999"}}>
        <div className="flex flex-col items-center ">
            <span className="text-3xl"><span className="text-5xl font-bold">아카이브</span>, 안전한 디스코드 <TypeAnimation cursor={true} sequence={category} wrapper="span" repeat={Infinity}/>목록을...</span>
        </div>
        <div className="relative mt-4" ref={ref}>
            <input onKeyPress={keypressHandler} placeholder="검색어를 입력해주세요" onClick={() => (setShow(true))} className="relative w-full bg-white lg:h-[3.5rem] h-[4rem] border border-gray-300 rounded-full shadow-sm p-3 pl-5 text-left cursor-default focus:outline-none focus:ring-1 h-12 focus:ring-sky-500 focus:border-indigo-500 sm:text-sm" value={keyword} onChange={(e) => (setKeyword(e.target.value))}/>
            <button onClick={() => (router.push(`/search?query=${keyword ? keyword : ""}`))} className="absolute lg:right-4 lg:top-4 right-5 top-5"><span><i className="fas fa-search"></i></span></button>
            {show ? (<>
                {searchServers || searchBots? (<>
                    <SearchBoxResult bots={searchBots} servers={searchServers} error={error} loading={loading}/>
                </>) :( null )}
            </>) : (null)}
        </div>
    </div>
    </>      
  )
}

const SearchBoxResult: NextPage<SearchBoxResultProps> = ({bots, servers, error, loading}) => {
    return (
        <>
            <div className="absolute w-full mt-1 border p-2 rounded-md min-h-[30vh] flex flex-wrap overflow-y-auto bg-white max-h-[30vh]">
                {
                    loading ? (<>
                        <span className="lg:text-xl">검색중...</span>
                    </>) : (<>
                        {error ? 
                            (<span className="lg:text-xl">{error}</span>) :
                            (<>
                                <div className="lg:w-1/2 p-1 w-full">
                                    <span><i className="fas fa-robot mr-1"></i> 봇</span>
                                    <div className="flex flex-col mt-1 w-full">
                                        {!bots || bots.length === 0 ? (<span className="text-gray-500 my-auto">검색 결과가 없습니다.</span>) : 
                                        (<>
                                            {bots?.map((bot, index) => (<>
                                                <BotCardResult bot={bot} key={index}/>
                                            </>))}
                                        </>)}
                                    </div>
                                </div>
                                <div className="lg:w-1/2 p-1 w-full">
                                    <span><i className="fas fa-server mr-1"></i>서버</span>
                                    <div className="flex flex-col mt-1 w-full">
                                        {!servers || servers.length === 0 ? (<span className="text-gray-500 my-auto">검색 결과가 없습니다.</span>) :
                                        (<>
                                            {servers?.map((server, index) => (
                                                <>
                                                    <ServerCardResult server={server} key={index}/>
                                                </>
                                            ))}
                                        </>)}
                                    </div>
                                </div>
                        </>)}
                    </>)
                }
            </div>
        </>
    )
}

const ServerCardResult: NextPage<ServerCardResultProps> = ({server}) => {
    return (<>
        <Link href={`/servers/${server.id}`}>
            <a className="w-full flex items-center border p-1 rounded-md hover:bg-gray-100 my-1">
                <img src={guildProfileLink(server)} className="w-8 h-8 rounded-xl ml-2"/>
                <div className="flex flex-col ml-2">
                    <span className="font-bold text-xl">{server.name}</span>
                    <span className="text-base text-gray-500">{server.sortDescription}</span>
                </div>
            </a>
        </Link>
    </>)
}

const BotCardResult: NextPage<BotCardResultProps> = ({bot}) => {
    return (<>
        <Link href={`/bots/${bot.id}`}>
            <a className="w-full flex items-center border p-1 rounded-md hover:bg-gray-100 my-1">
                <img src={userAvaterLinkAsPending(bot)} className="w-8 h-8 rounded-xl ml-2"/>
                <div className="flex flex-col ml-2">
                    <span className="font-bold text-xl">{bot.name}</span>
                    <span className="text-base text-gray-500">{bot.sortDescription}</span>
                </div>
            </a>
        </Link>
    </>)
}

interface ServerCardResultProps {
    server: SearchResult
}

interface BotCardResultProps {
    bot: SearchResult
}
export default SearchBox
