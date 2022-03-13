import HeadInfo from "@components/HeadInfo";
import DateFormet from "@utils/Date";
import { Bot, ServerList } from "@types";
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
import { Keys } from "@utils/Constants";
import { useRouter } from "next/router";
import Toast from "@components/Toast";

interface BotProps {
  bot: Bot;
  error?: boolean;
  message?: string;
  statusCode?: number;
}
export const getServerSideProps = async context => {
  let bot = (await fetch(
    `${process.env.API_DOMAIN}/bots/${encodeURI(
      context.params.id as string
    )}`
  ).then(res => res.json())) as any;
  if (bot.status !== 200) {
    return {
      props: {
        bot: null,
        error: true,
        message: bot.message,
        statusCode: bot.status,
      },
    };
  }
  return {
    props: {
      bot: bot.data,
      error: false,
      message: bot.message,
      statusCode: bot.status,
    },
  };
};
const InviteServer: NextPage<BotProps> = ({ bot, error, statusCode, message }) => {
  const [login, setLogin] = useState<boolean>(true);
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

  const restCaptcha = () => {
    captchaRef.current.resetCaptcha();
  }

  const router = useRouter();
  const onVerify = (checktoken: string) => {
    axios.post(`/bots/${bot.id}/like`, {
        'captcha_token': checktoken
    }).then((res) => {
        Toast('봇에 좋아요를 추가했습니다!', 'success')
        Toast('잠시후 봇 페이지로 이동합니다', 'success')
        setTimeout(() => {
            router.push(`/bots/${bot.id}`)
          }, 2000)
    }).catch((e) => {
        Toast(e.response.data.message, 'error')
        restCaptcha();
    })
}

  if (error) return <ErrorPage statusCode={statusCode} message={message} />;
  if(!login) return <Login/>;
  return (
    <div className={styles.container}>
      <HeadInfo
        title={bot.name + " 좋아요 - 아카이브"}
        description={bot.sortDescription}
        image={userAvaterLinkAsPending(bot)}
      />
      <Link href={`/bots/${bot.id}`}>
        <a className="flex items-center hover:text-sky-500"><i className="w-4 fas fa-angle-left font-sky-500"/><span className="lg:text-2xl text-lg">{bot.name} 페이지로 돌아가기</span></a>
      </Link>
      <div className="flex items-center justify-center space-y-5 flex-col w-full min-h-[80vh]">
        <div className="w-full max-w-7xl my-2 mx-auto">
            <GoogleAds size='short'/>
        </div>
        <img className="items-center w-40 rounded-2xl" src={userAvaterLinkAsPending(bot)}/>
        <div className="flex flex-row">
            <div className="mx-2 border space-x-2 rounded-2xl px-2 py-1">
                <span><i className="fas fa-server mr-1"/>서버 수</span>
                <span>{formatNumber(bot.servers)}개</span>
            </div>
            <div className="mx-2 border space-x-2 rounded-2xl px-2 py-1">
                <span><i className="fas fa-thumbs-up mr-1"/>좋아요</span>
                <span>{formatNumber(bot.like)}개</span>
            </div>
        </div>
        <span className="lg:text-xl">인증완료시 좋아요를 누릅니다</span>
        <HCaptcha
            sitekey={Keys.Captcha.CLIENT}
            onVerify={onVerify}
            ref={captchaRef}
        />
        <div className="w-full max-w-7xl my-2 mx-auto">
            <GoogleAds size='short'/>
        </div>    
      </div>
    </div>
  );
};

export default InviteServer;
