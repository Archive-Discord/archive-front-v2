import Loading from "@components/Loadning";
import { DiscordUserGuild } from "@types";
import { formatNumber, guildProfileLink } from "@utils/Tools";
import axios, { AxiosError } from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ServerListProps {
  callbackServer: (server: DiscordUserGuild) => void;
}

const ServerList: NextPage<ServerListProps> = ({ callbackServer }) => {
  const [servers, setServers] = useState<DiscordUserGuild[]>([]);
  const [selectServer, setSelectServer] = useState<DiscordUserGuild>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    axios
      .get("/servers/@me")
      .then(data => {
        setServers(data.data.data);
        setLoading(false);
      })
      .catch((e: AxiosError) => {
        setError(true);
        setMessage(e.response.data.message);
      });
  }, []);

  useEffect(() => {
    callbackServer(selectServer);
  }, [selectServer]);

  const SelectServerHandler = (server: DiscordUserGuild) => {
    setSelectServer(server);
  };

  const inviteBot = (server: DiscordUserGuild) => {
    window.open(`https://discord.com/api/oauth2/authorize?client_id=951861483170578502&permissions=8&scope=bot%20applications.commands&guild_id=${server.id}&disable_guild_select=true`, "초대하기", "width=450, height=800")
  }

  return (
    <>
      {loading ? (
        <>
        <Loading/>
        </>
      ) : (
        <>
          {servers.length === 0 ? (<>
            <div className="text-center mx-auto">
              <h1 className="text-xl font-bold">추가 가능한 서버가 없습니다!</h1>
            </div>
          </>) : (<>
            {servers
            .sort((a, b) => (a.bot === b.bot ? 0 : a.bot ? -1 : 1))
            .map(server => (
              <>
                <div
                  className="flex flex-col min-w-[23rem] max-w-[23rem] mx-auto bg-white shadow-xl mx-2 mb-20 min-h-[17rem] max-h-[17rem] rounded-2xl transform hover:scale-105 transition duration-100 ease-in cursor-pointer"
                  style={{ fontFamily: "nanumsquare" }}
                >
                  <img
                    className="w-32 mx-auto rounded-full -mt-8 border-8 border-white"
                    src={guildProfileLink(server)}
                    alt=""
                  />
                  <p className="px-6 font-semibold text-2xl mt-2 truncate">
                    {server.name}
                  </p>
                  {server.bot ? (
                    <>
                      <p className="mb-2 px-6 h-11 text-left text-sm font-medium text-ellipsis overflow-hidden mt-5">
                        서버를 추가하시려면 아래 추가하기 버튼을 눌러주세요
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mb-2 px-6 h-11 text-left text-sm font-medium text-ellipsis overflow-hidden mt-5">
                        서버를 추가하시려면 아래 초대하기 버튼을 눌러주세요
                      </p>
                    </>
                  )}
                  <hr className="mt-auto" />
                  {server.bot ? (
                    <>
                      <button
                        onClick={() => SelectServerHandler(server)}
                        className="flex p-4 text-green-500 hover:text-white rounded-b-2xl text-sm font-bold hover:bg-green-500"
                      >
                        <div className="w-full text-center">
                          <a>추가하기</a>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => (inviteBot(server))} className="flex p-4 text-sky-500 hover:text-white rounded-b-2xl text-sm font-bold hover:bg-sky-500">
                        <div className="w-full text-center">
                          <a>초대하기</a>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </>
            ))}
          </>)}
        </>
      )}
    </>
  );
};
export default ServerList;
