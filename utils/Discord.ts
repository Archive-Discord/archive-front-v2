import { EndPoints } from "@utils/Constants";
import { DiscordUser } from "@types"
import axios from "axios";
import { DiscordUserCache } from "@utils/Cache";

/**
 * @param id 유저 ID
 * @returns 요청 성공시 유저정보, 실패시 에러정보
 */
export async function getUserData(id: string): Promise<DiscordUser> {
    let cacheCheck = DiscordUserCache.has(id)
    if(cacheCheck) {
        return DiscordUserCache.get(id)
    } else {
        try {
            let UserFetch = await axios({
                method: "GET",
                url: `${EndPoints.Discord.API}/users/${id}`,
                headers: {
                    "Authorization": "Bot " + process.env.BOT_TOKEN
                }
            })
            let User: DiscordUser = UserFetch.data
            DiscordUserCache.set(id, User)
            return User
        } catch(err) {
            return err.response.data
        }
    }
}