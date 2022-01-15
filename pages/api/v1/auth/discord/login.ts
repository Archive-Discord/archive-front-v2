import { NextApiRequest, NextApiResponse } from "next"
import Handler from "@utils/RequestHandler"

const login = Handler('loginLimiter').get(async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.redirect(process.env.OAUTH_URL)
})

export default login;