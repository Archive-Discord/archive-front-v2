import RequestHandler from "@utils/RequestHandler"
import { NextApiRequest, NextApiResponse } from "next"

export default RequestHandler('loginLimiter').all((_req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(process.env.OAUTH_URL)
})