import HeadInfo from "@components/HeadInfo";
import Paginator from "@components/Paginator";
import BotCard from "@components/BotCard";
import { Bot, ServerList } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import listpage from "../../styles/listPage.module.css";
import GoogleAds from "@components/GoogleAds";

interface BotsProps {
  bot: {
    bot: Bot[];
    totalPage: number;
  };
  page: number;
}
export const getServerSideProps: GetServerSideProps<BotsProps> = async context => {
  if (!context.query.page) context.query.page = "1";
  let bot = (await fetch(
    `${process.env.API_DOMAIN}/bots?page=${context.query.page}`
  ).then(res => res.json())) as any;
  return {
    props: {
      bot: bot.data,
      page: Number(context.query.page),
    },
  };
};
const Home: NextPage<BotsProps> = ({ bot, page }) => {
  return (
    <>
      <HeadInfo title="봇 목록" />
      <div className={styles.container} style={{ marginTop: "6rem" }}>
      <div className="max-w-7xl mx-auto my-14">
        <GoogleAds size='short'/>
      </div>
        <div className={styles.lists}>
          {bot.bot
            .slice(0, 12)
            .sort((a, b) => b.like - a.like)
            .map((item, index) => (
              <>
                <BotCard bot={item} key={index} />
              </>
            ))}
        </div>
        <div className="flex justify-center mb-10">
          <Paginator
            currentPage={page}
            totalPage={Math.ceil(bot.totalPage / 12)}
            pathname="/bots"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-14">
        <GoogleAds size='short'/>
      </div>
      <div className={listpage.overlay + " transform hover:-translate-y-2 transition duration-200 animate-bounce ease-in cursor-pointer"}>
          <div className={listpage.overlaybg}/>
          <Link href={`/bots/dashboard/addbot`}>
            <a className="flex w-full h-full">
            <svg className="m-auto" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="32px" height="32px" viewBox="0 0 45.402 45.402"
                    xmlSpace="preserve"
                    fill="rgb(148 163 184)"
            >
                <g>
                    <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
                        c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
                        c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
                        c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
                </g>
                </svg>
            </a>
          </Link>
      </div>
    </>
  );
};

export default Home;
