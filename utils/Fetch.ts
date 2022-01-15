import { Bot, Guild, UserDB as User } from "@types"
import { User as UserDB, Bot as BotDB, Server as GuildDB, Secret } from "@utils/Mongodb"

export async function getUserData(token: string, isPrivate = false): Promise<User|null> {
  let user = await UserDB.findOne({ acces_token: token })
  if(isPrivate) {
    return user
  } else {
    return;
  }
}

export async function getBotData(BotId: string): Promise<Bot|null> {
  let bot: Bot = await BotDB.findOne({id: BotId},{token: 0, _id: 0}) // types 확인 해주세요
  return bot
}

export async function getGuildData(GuildId: string): Promise<Guild|null> {
  let guild: Guild = await GuildDB.findOne({id: GuildId})
  return guild
}

export async function getSecretToken(): Promise<string|null> {
  let token = await Secret.findOne({
    _id: "token"
  })
  if(!token) return null // todo
  return token.token
}