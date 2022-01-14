import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";
import { getBotData } from "@utils/Fetch";
import { DiscordUser } from "@types";
import { getUserData as getDiscordUser } from "@utils/Discord";
import { BotCache } from "@utils/Cache";

export default Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;
  let cacheCheck = BotCache.has(id)
  if(cacheCheck) {
    return res.status(200).json({code:200, data: BotCache.get(id)}) 
  } else {
    if(!id) 
    return res.status(405).json({code: 405, message: "봇 ID 값이 없습니다."})
  
    let botDB = await getBotData(id as string)
    if(!botDB) {
      return res.status(404).json({code: 404, message: "알수없는 봇 ID 입니다."})
    } else {
      let discordData: DiscordUser = await getDiscordUser(botDB.BotId)
      BotCache.set(id, {bot: botDB, user: discordData})
      return res.status(200).json({code:200, data: {
        bot: botDB,
        user: discordData
      }})
    }
  }
})

