import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";

export default Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;
  if(!id) 
    return res.status(405).json({code: 405, message: "봇 ID 값이 없습니다."})
})

