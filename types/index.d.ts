export interface UserObject {
	id: string
	avatar: string
	discriminator: string
	username: string
	flags: number
	bot: boolean
	system: boolean
    banner: string
    accentColor: number
    createdTimestamp: number
    displayAvatarURL: string
    tag: string
}