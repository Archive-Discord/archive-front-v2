import OAuth from 'oauth-discord';
//import { Scope } from './Constants';
export default new OAuth({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.CALLBACK_URL,
  version: 'v9'
})