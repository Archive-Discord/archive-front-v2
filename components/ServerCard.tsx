import { ServerList } from '@types'
import { formatNumber, guildProfileLink } from '@utils/Tools'
import type { NextPage } from 'next'
import Link from 'next/link'
const ServerCard: NextPage<ServerListProps> = ({guild}) => {
  return (
      <div className="flex flex-col min-w-[23rem] max-w-[23rem] mx-auto bg-white shadow-xl mx-2 mb-20 min-h-[20rem] max-h-[20rem] rounded-2xl transform hover:scale-105	 transition duration-100 ease-in cursor-pointer" style={{fontFamily: "nanumsquare"}}> 
        <Link href={`/servers/${guild.id}`}>
          <a>
            <img className="w-32 mx-auto rounded-full -mt-8 border-8 border-white" src={guildProfileLink(guild)} alt=""/>
            <p className="px-6 font-semibold text-2xl mt-2 truncate">{guild.name}</p>
            <p className="mb-2 px-6 h-11 text-left text-sm font-medium text-ellipsis overflow-hidden mt-5">
              {guild.sortDescription}
            </p>
            <div className='flex flex-row px-6'>
              <div className='py-1 px-3 flex flex-row items-center'>
                <i className="fas fa-users mr-2"/>{formatNumber(guild.members)}명
              </div>
              <div className='ml-2 px-2 flex flex-row items-center'>
              <i className="fas fa-thumbs-up mr-2"/>{formatNumber(guild.like)}개
              </div>
            </div>
          </a>
        </Link>
        <hr className='mt-auto'/>
        <div className='flex '>
          <Link href={`/servers/${guild.id}`}>
            <div className="flex p-4 hover:bg-gray-100 hover:text-sky-500 hover:underline hover:underline-offset-4 w-full border-r">
              <div className="w-full text-center">
                  <a>
                    확인하기
                  </a>
              </div>
            </div>
          </Link>
          <Link href={`/servers/${guild.id}/invite`}>
            <div className="flex p-4 hover:bg-gray-100 hover:text-sky-500 hover:underline hover:underline-offset-4 w-full">
              <div className="w-full text-center">
                  <a>
                    입장하기  
                  </a>
              </div>
            </div>
          </Link>
        </div>
    </div>
  )
}

interface ServerListProps {
  guild: ServerList
}

export default ServerCard
