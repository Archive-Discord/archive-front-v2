import GoogleAds from "@components/GoogleAds";
import HeadInfo from "@components/HeadInfo";
import ServerCard from "@components/ServerCard";
import BotCard from "@components/BotCard";
import { Bot, ServerList } from "@types";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Paginator from "@components/Paginator";

export interface SearchResult {
  id: string;
  name: string;
  icon: string;
  like: number;
  sortDescription: string;
  members?: number;
  servers?: number;
  type: "server" | "bot";
  update: boolean;
  discriminator?: string;
  invite?: string;
}

interface HomeProps {
  bots: SearchResult[];
  servers: SearchResult[];
  totalPage: number;
  query: string;
  page: number;
}
export const getServerSideProps: GetServerSideProps = async context => {
  // @ts-ignore
  if (!context.query.page) context.query.page = 1;
  if (!context.query.query) context.query.query = "없음";
  let searchResult = (await fetch(
    `${process.env.API_DOMAIN}/search?query=${encodeURI(
      context.query.query as string
    )}&page=${encodeURI(context.query.page as string)}`
  ).then(res => res.json())) as any;
  return {
    props: {
      bots: searchResult.data.bots,
      servers: searchResult.data.servers,
      totalPage: searchResult.data.totalPage,
      query: context.query.query,
      page: context.query.page,
    },
  };
};
const Search: NextPage<HomeProps> = ({
  bots,
  servers,
  totalPage,
  query,
  page,
}) => {
  return (
    <div className={styles.container}>
      <HeadInfo title={`${query} - 아카이브`} />
      <div className="max-w-7xl mx-auto">
        <GoogleAds size="short" />
      </div>
      <div className={styles.title}>
      <span className="text-4xl">"{query}" 서버 검색결과</span>
      </div>
      <div className={styles.lists}>
        {servers.length === 0 ? (
          <>
            <span className="lg:text-2xl my-auto">
              "{query}" 검색 결과가 없습니다.
            </span>
          </>
        ) : (
          <>
            {servers
              .slice(0, 8)
              .sort((a, b) => b.like - a.like)
              .map((item, index) => (
                <>
                  <ServerCard guild={item} key={index} />
                </>
              ))}
          </>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        <GoogleAds size="short" />
      </div>
      <div className={styles.title}>
        <span className="text-4xl">"{query}" 봇 검색결과</span>
      </div>
      <div className={styles.lists}>
        {bots.length === 0 ? (
          <span className="lg:text-2xl my-auto">
            "{query}" 검색 결과가 없습니다.
          </span>
        ) : (
          <>
            {bots
              .slice(0, 8)
              .sort((a, b) => b.like - a.like)
              .map((item, index) => (
                <>
                  <BotCard bot={item} key={index} />
                </>
              ))}
          </>
        )}
      </div>
      <div className="flex justify-center mb-10">
        {totalPage === 0 ? (
          <></>
        ) : (
          <Paginator
            totalPage={Math.ceil(totalPage / 12)}
            currentPage={page}
            search={query}
            pathname={"/search"}
          />
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        <GoogleAds size="short" />
      </div>
    </div>
  );
};

export default Search;
