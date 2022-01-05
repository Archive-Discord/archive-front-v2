import { NextApiRequest, NextApiResponse } from "next"

let login = async function(_req: NextApiRequest, res: NextApiResponse) {
  res.redirect(process.env.OAUTH_URL)
}

export default login