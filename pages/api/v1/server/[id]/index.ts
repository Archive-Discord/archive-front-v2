import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";
import { getGuildData } from "@utils/Fetch";
import { ServerCache } from "@utils/Cache";

export default Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id as string // string[] 제거 목적으로 사용
  
  let cacheCheck = ServerCache.has(id)
  if(cacheCheck) {
    return res.status(200).json({code:200, data: ServerCache.get(id)}) 
  } else {
    if(!id) 
    return res.status(405).json({code: 405, message: "봇 ID 값이 없습니다."})
  
    let guildDB = await getGuildData(id as string)
    if(!guildDB) {
      return res.status(404).json({code: 404, message: "알수없는 서버 ID 입니다."})
    } else {
      ServerCache.set(id, guildDB)
      return res.status(200).json({code:200, data: guildDB})
    }
  }
})

