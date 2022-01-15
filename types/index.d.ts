export type Category = "봇" | "관리" | "개발" | "게임" | "마인크래프트" | "배틀그라운드" | "오버워치"

export interface User {
	_id: string
	username: string
	discriminator: string
	avatar: string
	bot: boolean
	flags: number
}

export interface UserDB {
	_id: string
	access_token: string[]
	refresh_token: string
	expires_in: String
}

export interface SubmitDB {
	_id: number
	user: UserDB
	bot?: Bot
	server?: Guild
}
export interface BotCache {
	bot: Bot
	user: DiscordUser
}

export interface Secrets {
	_id: string
	token: string
}
export interface Guild {
	_id: string
	owners: string[]
	sortdescriptor: string
	description: string
	score: number
	invite?: string
	flags: number
	category: Category[]
	timestamp: number
}

export interface Bot {
  _id: Number 
  id: string // 아카이브 전용 아이디
  BotId: string // 봇 아이디
  owners: string[],
  description: string,
  category: Category[],
  prefix: string,
  homepage?: string,
  sortdescription: string,
  invite: string,
  supportserver?: string,
  flags: number,
  like: number,
  token: string,
  server: string
}

export interface DiscordUser {
	id: string
	username: string
	discriminator: string
	avatar: string
	bot: boolean
	flags: number
	banner: string
	public_flags: number
	accent_color: number
}

export type limitType = 'loginLimiter' | 'createLimiter'