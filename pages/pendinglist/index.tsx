import HeadInfo from "@components/HeadInfo";
import styles from "@styles/Home.module.css";
import PendingCard from "@components/pendinglist/itemCard";
import { submitList } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import ErrorPage from "@components/ErrorPage";

interface submitProps {
    list: submitList[];
    error?: boolean;
    message?: string;
    statusCode?: number;
}
export const getServerSideProps: GetServerSideProps = async context => {
  let submitlist = await fetch(
    `${process.env.API_DOMAIN}/submit/submitlist`, {
        headers: {
            "Authorization": "Bearer " + context.req.cookies['Authorization']
        }
    }).then(res => res.json()) as any;
  if(submitlist.status !== 200) {
    return {
        props: {
            list: null,
            error: true,
            message: submitlist.message,
            statusCode: submitlist.status
        },
    };
  }
  return {
    props: {
        message: submitlist.message,
        error: false,
        list: submitlist.data,
        statusCode: submitlist.status
    },
  };
};
const Home: NextPage<submitProps> = ({ list, error, message, statusCode }) => {
  if(error) return <ErrorPage statusCode={statusCode} message={message} />
  return (
    <>
      <HeadInfo title="심사목록 - 아카이브" />
      <div className={styles.container + " flex items-center flex-col"} style={{marginTop: "9rem"}}>
        <span className="text-3xl">심사 대기중인 목록</span>
        <div className='flex flex-row flex-wrap items-center justify-center mt-5 min-h-[90vh]'>
            <PendingCard items={list}/>
        </div>
      </div>
    </>
  );
};

export default Home;
