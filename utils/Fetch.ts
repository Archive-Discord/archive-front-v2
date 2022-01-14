import { Bot, User } from "@types"
import { User as UserDB, Bot as BotDB } from "@utils/Mongodb"

export async function getUserData(token: string, isPrivate = false): Promise<User|null> {
  let user: User = await UserDB.findOne({ acces_token: token })
  if(isPrivate) {
    return user
  } else {
    return;
  }
}

export async function getBotData(id: string): Promise<Bot|null> {
  let bot: Bot = await BotDB.findOne({ _id: id})
  
  return bot
}