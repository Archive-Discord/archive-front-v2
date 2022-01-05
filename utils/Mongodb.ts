import mongoose, { Schema, model } from "mongoose";

mongoose.connect("mongodb://localhost/archive")

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
  server: String
})

const ServerSchema = new Schema({
  _id: Number, // 서버 아이디 
  score: Number, // 서버점수
  timestamp: Number, // 서버 등록일
})

const UserSchema = new Schema({
  _id: String, //유저 ID
  access_token: Array, // 유저 디스코드 엑세스 토큰
  refresh_token: String, // 유저 디스코드 리프레시 토큰
  expires_in: String, // 토큰만료일
})

export const Bot = mongoose.models.bot || model("bot", BotSchema)
export const Server = mongoose.models.guild || model("guild", ServerSchema)
export const User = mongoose.models.users || model("users", UserSchema)

