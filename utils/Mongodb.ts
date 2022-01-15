import { Bot as BotInterface, Guild, Secrets, SubmitDB, UserDB } from "@types";
import mongoose, { Schema, model, Model } from "mongoose";
import mongooseLong from "mongoose-long"
mongooseLong(mongoose);

mongoose.connect(process.env.MONGODB_URL)

export const db = mongoose.connection

const BotSchema = new Schema<BotInterface, Model<BotInterface>>({
  _id: {type: String, required: true},
  owners: {type: [String], required: true},
  description: {type: String, required: true},
  category: {type: [String], required: true},
  prefix: {type: String, required: true},
  homepage: String,
  sortdescription: {type: String, required: true},
  invite: {type: String, required: true},
  supportserver: String,
  flags: {type: Number, required: true},
  like: {type: Number, required: true},
  token: {type: String, required: true},
  server: {type: String, required: true},
  id: {type: String, required: true}, // 아카이브 고유 아이디
  BotId: {type: String, required: true} // 봇 고유 아이디
})

const ServerSchema = new Schema<Guild, Model<Guild>>({
  _id: {type: String, required: true}, // 서버 아이디
  owners: {type: [String], required: true}, // 서버 주인
  sortdescriptor: {type: String, required: true},
  description: {type: String, required: true}, // 서버 설명
  score: {type: Number, required: true}, // 서버점수
  flags: {type: Number, required: true}, // 서버 플래그
  invite: {type: String, required: true}, // 서버 초대코드
  category: {type: [String], required: true}, // 카테고리
  timestamp: {type: Number, required: true}, // 서버 등록일
})

const SecretSchema = new Schema<Secrets, Model<Secrets>>({
  _id: {type: String, required: true},
  token: String,
})

const UserSchema = new Schema<UserDB, Model<UserDB>>({
  _id: {type: String, required: true}, //유저 ID
  access_token: {type: [String], required: true}, // 유저 디스코드 엑세스 토큰
  refresh_token: {type: String, required: true}, // 유저 디스코드 리프레시 토큰
  expires_in: {type: String, required: true}, // 토큰만료일
})

const SubmitSchema = new Schema<SubmitDB, Model<SubmitDB>>({
  _id: Number,
  user: UserSchema,
  bot: BotSchema,
  server: ServerSchema
})

export const Bot: Model<BotInterface> = mongoose.models.bot || model("bot", BotSchema, "bot")
export const Server: Model<Guild> = mongoose.models.guild || model("guild", ServerSchema, "guild")
export const User: Model<UserDB> = mongoose.models.users || model("users", UserSchema)
export const Submit: Model<SubmitDB> = mongoose.models.submit || model("submit", SubmitSchema, "submit")
export const Secret: Model<Secrets> = mongoose.models.secret || model("secret", SecretSchema, "secret")
