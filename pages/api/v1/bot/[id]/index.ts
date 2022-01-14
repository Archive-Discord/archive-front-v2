import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";
import { getBotData } from "@utils/Fetch";

export default Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;
  if(!id) 
    return res.status(405).json({code: 405, message: "봇 ID 값이 없습니다."})
  
  let bot = await getBotData(id as string)

  if(!bot)
    return res.status(404).json({code: 404, message: "알수없는 봇 id 입니다."})
  else return res.status(200).json({code:200, data: bot})
})

