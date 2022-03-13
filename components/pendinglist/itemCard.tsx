import { submitList } from "@types";
import { guildProfileLink, userAvaterLink, userAvaterLinkAsPending } from "@utils/Tools";
import type { NextPage } from "next";
import Link from "next/link";

interface itemCardProps {
    items: submitList[]
}

const ItemList: NextPage<itemCardProps> = ({ items }) => {
  return (
    <>
       {items

            .sort((a, b) => {
              // @ts-ignore
              return new Date(a.published_date) - new Date(b.published_date)
            })
            .map(item => (
              <>
                <div
                  className="flex flex-col min-w-[23rem] max-w-[23rem] mx-auto bg-white shadow-xl mx-2 mb-20 min-h-[18rem] max-h-[18rem] rounded-2xl transform hover:scale-105 transition duration-100 ease-in cursor-pointer"
                  style={{ fontFamily: "nanumsquare" }}
                  key={item.id}
                >
                  <img
                    className="w-32 mx-auto rounded-full -mt-8 border-8 border-white"
                    src={(item.type === "server") ? guildProfileLink(item) : userAvaterLinkAsPending(item)}
                    alt=""
                  />
                  <span className="mx-4 py-1 px-5 border rounded-md w-fit -mt-10">{item.type === "server" ? "서버" : "봇"}</span>
                  <p className="px-6 font-semibold text-2xl mt-2 truncate mt-7">
                    {item.name}
                  </p>
                  <p className="mb-2 px-6 h-11 text-left text-sm font-medium text-ellipsis overflow-hidden mt-5">
                    {item.description}
                  </p>
                  <hr className="mt-auto" />
                    <Link href={`/pendinglist/${item.type}/${item.id}`}>
                        <a
                            className="flex p-4 text-green-500 hover:text-white rounded-b-2xl text-sm font-bold hover:bg-green-500"
                        >
                            <div className="w-full text-center">
                            <a>확인하기</a>
                            </div>
                        </a>
                    </Link>
                </div>
              </>
            ))}
    </>
  );
};
export default ItemList;
