import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";
import OAuth from "@utils/OAuth"
import { getUserData } from "@utils/Fetch";
const UserMe = Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  
  let auth = req.cookies.auth || req.headers.auth
  if(!auth)
    return res.status(401).json({ code: 401, message: "Unauthorized"})

  let userData = await OAuth.user(auth as string)

  if(!userData)
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  if(!userData.id)
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  
  return res.status(200).json({ code: 200, data: userData })
})

export default UserMe;