import { NextApiRequest, NextApiResponse } from "next"

const redirect = async function (_req: NextApiRequest ,res: NextApiResponse) {
  res.redirect('/api/v1/auth/login')
}

export default redirect