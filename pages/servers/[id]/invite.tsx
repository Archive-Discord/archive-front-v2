import HeadInfo from "@components/HeadInfo";
import DateFormet from "@utils/Date";
import { ServerList } from "@types";
import { formatNumber, guildProfileLink, userAvaterLink } from "@utils/Tools";
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

interface ServerProps {
  server: ServerList;
  error?: boolean;
  message?: string;
  statusCode?: number;
}
export const getServerSideProps: GetServerSideProps<
  ServerProps
> = async context => {
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
const InviteServer: NextPage<ServerProps> = ({ server, error, statusCode, message }) => {
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
    axios.post(`/servers/${server.id}/invite`, {
        'captcha_token': checktoken
    }).then((res) => {
        Toast('??????????????? ????????? ?????????????????????!', 'success')
        Toast('????????? ?????? ???????????? ???????????????', 'success')
        setTimeout(() => {
            router.push(`/servers/${server.id}`)
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
        title={server.name + " ????????????"}
        description={server.sortDescription}
        image={guildProfileLink(server)}
      />
      <Link href={`/servers/${server.id}`}>
        <a className="flex items-center hover:text-sky-500"><i className="w-4 fas fa-angle-left font-sky-500"/><span className="lg:text-2xl text-lg">{server.name} ???????????? ????????????</span></a>
      </Link>
      <div className="flex items-center justify-center space-y-5 flex-col w-full min-h-[80vh]">
        <div className="w-full max-w-7xl my-2 mx-auto">
            <GoogleAds size='short'/>
        </div>
        <img className="items-center w-40 rounded-2xl" src={guildProfileLink(server)}/>
        <div className="flex flex-row">
            <div className="mx-2 border space-x-2 rounded-2xl px-2 py-1">
                <span><i className="fas fa-users mr-1"/>?????? ???</span>
                <span>{formatNumber(server.members)}???</span>
            </div>
            <div className="mx-2 border space-x-2 rounded-2xl px-2 py-1">
                <span><i className="fas fa-thumbs-up mr-1"/>?????????</span>
                <span>{formatNumber(server.like)}???</span>
            </div>
        </div>
        <span className="lg:text-xl">??????????????? ???????????? ???????????????</span>
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
