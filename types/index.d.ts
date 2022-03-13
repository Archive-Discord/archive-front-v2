export type ApiRequestType = "servers" | "bots"

export interface User {
	id: string
	username?: string
	discriminator?: string
	avatar?: string
	bot?: boolean
	flags?: number
}

export interface BotUserPending {
	id: string
	name?: string
	discriminator?: string
	icon?: string
	bot?: boolean
	flags?: number
}

export interface CategoryType {
	id: number,
	name: string,
}
export interface Guild {
	id: string
	owners: string[]
	sortDescription: string
	description: string
	score: number
	invite?: string
	flags: number
	category: Category[]
	timestamp: number
}

export interface Bot {
  id: string
  name: string
  owners: User[],
  description: string,
  categories: string[],
  prefix: string,
  website?: string,
  sortDescription: string,
  invite: string,
  support?: string,
  flags: number,
  like: number,
  token: string,
  new: boolean
  servers: number
  icon: string
  created_at: Date
}

export interface Comment {
	id:string;
	server_id: string;
	user_id: string;
	comment: string;
	user: DiscordUser
	published_date: Date;
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

export interface ServerList {
	id: string;
	sortDescription?: string;
	description?: string;
	icon: string;
	like?: number;
	name?: string;
	bot?: boolean;
	categories?: string[];
	members?: number;
	flags?: number;
	create_date?: Date;
	published_date?: Date;
	owners?: User[];
}

export interface Server {
	id: string;
	description: string;
	sortDescription: string;
	icon?: string;
	like: number;
	name: string;
	bot: boolean;
	members: number;
	flags: number;
	owners: User[];
}

export interface DiscordUserGuild {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: number;
	permissions_new: number;
	bot: boolean;
	features: string[];
}

export interface submitList {
	id: string;
	name: string;
	description: string;
	icon: string;
	type: submitCategory;
  	update: boolean;
	published_date: Date;
}

type submitCategory = "bot" | "server"
