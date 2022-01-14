import mongoose, { Schema, model } from "mongoose";
import mongooseLong from "mongoose-long"
mongooseLong(mongoose);

mongoose.connect(process.env.MONGODB_URL)

export const db = mongoose.connection

const BotSchema = new Schema({
  _id: Number,
  owners: Array,
  description: String,
  category: Array,
  prefix: String,
  homepage: String,
  sortdescription: String,
  invite: String,
  supportserver: String,
  flags: Number,
  like: Number,
  token: String,
  server: String,
  id: String, // 아카이브 고유 아이디
  BotId: String // 봇 고유 아이디
})

const ServerSchema = new Schema({
  _id: Number, // 서버 아이디 
  score: Number, // 서버점수
  timestamp: Number, // 서버 등록일
  category: Array, // 카테고리
  description: String // 설명
})

const UserSchema = new Schema({
  _id: String, //유저 ID
  access_token: Array, // 유저 디스코드 엑세스 토큰
  refresh_token: String, // 유저 디스코드 리프레시 토큰
  expires_in: String, // 토큰만료일
})

export const Bot = mongoose.models.bot || model("bot", BotSchema, "bot")
export const Server = mongoose.models.guild || model("guild", ServerSchema, "guild")
export const User = mongoose.models.users || model("users", UserSchema)

