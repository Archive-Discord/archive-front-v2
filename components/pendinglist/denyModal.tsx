import { NextPage } from "next";
import { useEffect, useState } from "react";
export type denyModalcallBackType = "CANCEL" | "CONFIRM"
interface denyModalProps {
    showCallback: (status: boolean, type: denyModalcallBackType) => void;
    reasonCallback: (reason: string) => void;
}

const denyModal: NextPage<denyModalProps> = ({showCallback, reasonCallback}) => {
    const [reason, setReason] = useState<string>();
    useEffect(() => {
        reasonCallback(reason)
    }, [reason])

  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                거절
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {showCallback(false, 'CANCEL')}}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-2 flex flex-col">
                <span className="text-lg">거절을 진행하기 위해 거절 사유를 자세하게 입력해주세요</span>
              <input placeholder="거절사유" className="text-base border rounded-md p-3 leading-relaxed text-gray-500 cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500" onChange={(e) => setReason(e.target.value)}/>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                type="button"
                onClick={() => showCallback(false, 'CONFIRM')}
                className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                거절하기
              </button>
              <button
                type="button"
                onClick={() => showCallback(false, 'CANCEL')}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

    </>
  );
};

export default denyModal;
