import { NextApiRequest, NextApiResponse } from "next";
import Handler from "@utils/RequestHandler";
import OAuth from "@utils/OAuth";
import { User as UserDB } from "@utils/Mongodb";
import { serialize } from 'cookie'

export default Handler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let { code } = req.query;

  if(!code)
    return res.redirect("/api/v1/auth/login")

  let token = await OAuth.getToken({
    grant_type: 'authorization_code',
    code: code as string,
  })
  let userData = await OAuth.user(token.access_token)
  var userDB = await UserDB.findOne({_id: userData.id})
  if(!userDB) {
    var user = new UserDB({
      _id: userData.id,
      acces_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
    }) 
    
    user.save((err: Error) => {
      if(err) return res.status(401).json({ code: 401, message: "Unauthorized" });
    })
  } else {
    await UserDB.updateOne({_id: userData.id}, {$set: { expires_in: token.expires_in, refresh_token: token.refresh_token}, $push: {access_token: { $each : [token.access_token]}}})
  }
  if(!token.access_token) return res.status(401).json({ code: 401, message: "Unauthorized" });
  res.setHeader('Set-Cookie', serialize('auth', token.access_token, { path: '/'}))
  //res.setHeader('Set-Cookie', serialize('auth', token.access_token, { path: '/', domain: '.archiver.me'}))
  return res.redirect('/redirect')
})
