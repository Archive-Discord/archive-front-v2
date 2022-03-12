import Loading from "@components/Loadning";
import Toast from "@components/Toast";
import { DiscordUserGuild, User } from "@types";
import { formatNumber, guildProfileLink } from "@utils/Tools";
import axios, { AxiosError } from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ServerListProps {
  callbackBot: (bot: User) => void;
}

const ServerList: NextPage<ServerListProps> = ({ callbackBot }) => {
  const [bot, setBot] = useState<User>();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    callbackBot(bot);
  }, [bot]);

  const findBotHandler = async () => {
    if(id.length < 18 || id.length > 20) {
      return Toast('올바른 봇의 아이디를 입력해주세요', 'error')
    }
    await axios.post('/bots/submit/find', {id})
      .then(res => {
        setBot(res.data.data)
      }).catch((e: AxiosError) => {
        Toast(e.response.data.message, 'error')
      })
  }


  return (
    <>
      <div className="min-h-[70vh]">
        <div>
        <div className='flex flex-row flex-wrap items-center justify-center w-full border p-4 rounded-2xl lg:w-[55vw] max-w-[95vw] mb-10'>
                <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl text-sky-500'>아이디</span>
                        <span className='text-sm'>봇의 아이디를 입력해주세요.</span>
                    </div>
                    <div className='flex flex-row w-full space-x-2 mt-2 lg:mt-0 '>
                        <input value={id} onChange={(e) => {
                          if(isNaN(Number(e.target.value))) return;
                          console.log(e.target.value)
                          setId(e.target.value)
                        }} placeholder='아이디 (숫자만 입력가능합니다)' maxLength={30} className='w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                        <button onClick={() => (findBotHandler())} className="p-4 h-10 border rounded-md w-20 flex items-center justify-center focus:outline-none hover:ring-sky-500 hover:border-sky-500 hover:ring-1 hover:ring-sky-500">검색</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
export default ServerList;
