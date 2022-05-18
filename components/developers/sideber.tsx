import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideBar: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-white dark:bg-battlebot-dark h-full text-black transition-all duration-300 border border-solid border-y-0 sidebar text-black dark:border-none">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow h-full">
          <ul className="flex flex-col py-4 space-y-1 h-full">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide dark:text-white text-black uppercase">
                  시작하기
                </div>
              </div>
            </li>
            <li>
              <Link href={`/developers`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-sky-500 dark:hover:border-gray-800 pr-6 dark:text-white ${router.asPath === "/developers" ? "border-sky-500" : null}`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-home" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    홈
                  </span>
                </a>
              </Link>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide dark:text-white text-black uppercase">
                엔드포인트
                </div>
              </div>
            </li>
            <li>
              <Link href={`/developers/servers`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-sky-500 dark:hover:border-gray-800 pr-6 dark:text-white ${router.asPath.startsWith("/developers/servers") ? "border-sky-500" : null}`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-server" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    서버
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/developers/bots`}>
                <a className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-stone-100 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-sky-500 dark:hover:border-gray-800 pr-6 dark:text-white ${router.asPath.startsWith("/developers/bots") ? "border-sky-500" : null}`}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-robot" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    봇
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
