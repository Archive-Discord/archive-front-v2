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
	acces_token: string
	refresh_token: string
	expires_in: String
}
export interface Guild {
	_id: string
	score: number
	timestamp: number
}

export interface Bot {
  _id: Number // 미사용
  id: string // 아카이브 전용 아이디
  BotId: string // 봇 아이디
  owners: string[],
  description: string,
  category: Category[],
  prefix: string,
  homepage: string,
  sortdescription: string,
  invite: string,
  supportserver: string,
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
