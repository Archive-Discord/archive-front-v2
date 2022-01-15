import { getSecretToken } from "@utils/Fetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { authorization } = req.headers

    if(authorization === "Bot " + getSecretToken()) {
      // todo
    }
  }
}

