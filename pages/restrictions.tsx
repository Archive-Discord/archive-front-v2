import { GetStaticProps, NextPage } from "next";
import dynamic from 'next/dynamic'
import styles from "@styles/Server.module.css"

import { EndPoints } from "@utils/Constants";
import HeadInfo from "@components/HeadInfo";

const Markdown = dynamic(() => import('@components/MarkDown'))
interface RestrictionsProps {
    contents: string
}

const Restrictions: NextPage<RestrictionsProps> = ({ contents }) => {
    return (
        <>
        <HeadInfo title="아카이브 심사 규정"/>
        <div className={styles.container}>
            <h1></h1>
            <div className="py-3 px-7 text-black rounded my-4">
                <Markdown markdown={contents}/>
            </div>
        </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<RestrictionsProps> = async () => {
    const res = await fetch(EndPoints.Github.API + "/repos/archive-discord/archive-docs/contents/content/ko/tutorials/battlebot/how-to-setting-greeting-my-server.md")
    return {
        props: {
            contents: Buffer.from(((await res.json())).content, 'base64').toString('utf-8')
        }
    }
}

export default Restrictions;