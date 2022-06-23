import HeadInfo from "@components/HeadInfo";
import DateFormet from "@utils/Date";
import { Bot, Server, ServerList } from "@types";
import { formatNumber, guildProfileLink, userAvaterLink, userAvaterLinkAsPending } from "@utils/Tools";
import type { GetServerSideProps, NextPage } from "next";
import styles from "../../../styles/Server.module.css";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Markdown from "@components/MarkDown";
import GoogleAds from "@components/GoogleAds";
import Comments from "@components/Comments";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import ErrorPage from "@components/ErrorPage";
import axios, { AxiosError } from "axios";
import Login from "@components/Login";
import { useRouter } from "next/router";
import Toast from "@components/Toast";

type reportType =  "guide_line" | "personal_information" | "advertising" | "illegal_information" | "discord_tos" | "other";
interface reportTypesObj {
    name : string,
    value : reportType
}
const reportTypes: reportTypesObj[] = [
    {
        name: "가이드 라인 위반 (예: 핵 판매, 성인콘텐츠 판매 등)",
        value: "guide_line"
    },
    {
        name: "개인정보침해 (예: 개인정보 유출, 개인정보 이용 등)",
        value: "personal_information"
    },
    {
        name: "광고성 정보",
        value: "advertising"
    },
    {
        name: "불법적인 정보 유출",
        value: "illegal_information"
    },
    {
        name: "디스코드 ToS 위반",
        value: "discord_tos"
    },
    {
        name: "기타",
        value: "other"
    }
]

interface ServerProps {
  server: Server;
  error?: boolean;
  message?: string;
  statusCode?: number;
}
export const getServerSideProps = async context => {
  let server = (await fetch(
    `${process.env.API_DOMAIN}/servers/${encodeURI(
      context.params.id as string
    )}`
  ).then(res => res.json())) as any;
  if (server.status !== 200) {
    return {
      props: {
        server: null,
        error: true,
        message: server.message,
        statusCode: server.status,
      },
    };
  }
  return {
    props: {
      server: server.data,
      error: false,
      message: server.message,
      statusCode: server.status,
    },
  };
};
const ReportBot: NextPage<ServerProps> = ({ server, error, statusCode, message }) => {
  const [login, setLogin] = useState<boolean>(true);
  const [reportType, setReportType] = useState<reportTypesObj>();
  const [reportReason, setReportReason] = useState<string>();
  const router = useRouter();
  const captchaRef = useRef(null);
  useEffect(() => {
    axios
      .get("/users/@me")
      .then(data => {
        setLogin(true);
      })
      .catch((e: AxiosError) => {
        setLogin(false);
      });
  }, []);

  const reportTypeSeleceted = (type: reportTypesObj) => {
    setReportType(type);
  }

  const reportHandler = async () => {
    if(!reportType) return Toast('신고 방식을 선택해주세요', 'error')
    if(!reportReason) return Toast('신고 사유를 입력해주세요', 'error')
    axios.post(`/servers/${server.id}/report`, {
      report_type: reportType.value,
      reason: reportReason
    })
    .then(data => {
      Toast(data.data.message, 'success')
      Toast('잠시후 서버 페이지로 이동합니다', 'success')
      setTimeout(() => {
          router.push(`/servers/${server.id}`)
        }, 2000)
    })
    .catch((e: AxiosError) => {
      Toast(e.response.data.message, 'error')
    })
  }

  if (error) return <ErrorPage statusCode={statusCode} message={message} />;
  if(!login) return <Login/>;
  return (
    <div className={styles.container}>
      <HeadInfo
        title={server.name + " 신고 - 아카이브"}
        description={server.sortDescription}
        image={userAvaterLinkAsPending(server)}
      />
      <Link href={`/servers/${server.id}`}>
        <a className="flex items-center hover:text-sky-500"><i className="w-4 fas fa-angle-left font-sky-500"/><span className="lg:text-2xl text-lg">{server.name} 페이지로 돌아가기</span></a>
      </Link>
      <div className="flex items-center justify-center space-y-5 flex-col w-full min-h-[80vh]">
        <div className="w-full max-w-7xl my-2 mx-auto">
            <GoogleAds size='short'/>
        </div>
        <div className="flex flex-col items-start w-full max-w-7xl">
            <span className="text-2xl">신고하기</span>
            <div className="flex flex-col mt-2 ">
                {reportTypes.map((type, index) => (
                    <>
                        <div className="form-check" key={index}>
                        <input onChange={() => (reportTypeSeleceted(type))} checked={reportType ? (reportType.value === type.value ? true : false) : (false) } className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id={type.value}/>
                        <label className="form-check-label inline-block text-gray-800" htmlFor={type.value}>
                            {type.name}
                        </label>
                        </div>
                    </>
                ))}
            </div>
            <div className="flex mt-5 w-full flex-col">
                {reportType ? (<>
                    {
                        reportType.value === "discord_tos" ? (
                        <>
                            <div className="bg-red-100 rounded-2xl py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                                <span>디스코드 ToS 위반으로 신고하시는 거 같아요! <a className="text-sky-500 font-bold" rel="noreferrer" href="https://support.discord.com/hc/ko/requests/new" target={"_blank"}> 디스코드 신고</a>에도 직접 신고하여 주세요! </span>
                            </div>
                        </>) :(null)
                        
                    }
                    {
                        reportType.value === "personal_information" ? (
                        <>
                            <div className="bg-red-100 rounded-2xl py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                                <span>개인정보침해로 신고하시는 거 같아요! 필요에 따라<a className="text-sky-500 font-bold" rel="noreferrer" href="https://privacy.kisa.or.kr/main.do" target={"_blank"}> 개인정보침해신고센터</a>에도 신고하여 주세요! </span>
                            </div>
                        </>) :(null)
                        
                    }

                <div className='flex justify-between items-center w-full flex-row flex-wrap mt-6'>
                    <div className='flex flex-wrap flex-col w-full'>
                        <span className='text-2xl'>신고사유</span>
                        <span className='text-sm'>신고하시는 사유를 상세하게 적어주세요.</span>
                        <span className="text-sm">이미지 첨부가 필요한 경우에는 서포트 서버에서 티켓을 만들어주시거나. 디스코드에서 이미지 업로드 후 링크를 첨부해 주세요.</span>
                    </div>
                    <textarea onChange={(e) => (setReportReason(e.target.value))} value={reportReason} placeholder='사유' className='mt-2 w-full p-4 h-[40vh] border rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500'/>
                </div>
                <button onClick={() => (reportHandler())} className='focus:outline-none hover:ring-sky-500 hover:border-sky-500 hover:ring-1 hover:ring-sky-500 border rounded-2xl w-full h-16 text-2xl mb-8 mt-10'>신고하기</button>
                </>) :(null)
              }
            </div>
        </div>
        <div className="w-full max-w-7xl my-2 mx-auto">
            <GoogleAds size='short'/>
        </div>    
      </div>
    </div>
  );
};

export default ReportBot;
