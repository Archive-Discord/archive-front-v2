import { ServerList, User } from '@types'
import { EndPoints } from '@utils/Constants'

/**
 * @param router useRouter `router` 오브젝트
 * @param to 리다이렉트할 주소 
 * @returns 리다이렉트
 */
export function redirectTo(router, to: string) {
	router.push(to || '/')
	return
}
/**
 * @param user 유저 오브젝트 값
 * @returns 유저 프로필 링크
 */
export const userAvaterLink = (user: User): string => {
    if(!user.avatar) return `${EndPoints.Discord.CDN}/embed/avatars/${Number(user.discriminator) % 5}.png`
    return `${EndPoints.Discord.CDN}/avatars/${user.id}/${user.avatar}`
}

export const guildProfileLink = (guild: ServerList): string => {
    if(!guild.icon) return `${EndPoints.Discord.CDN}/embed/avatars/${Math.floor(Math.random() * (5 - 1 + 1)) + 1}.png`
    return `${EndPoints.Discord.CDN}/icons/${guild.id}/${guild.icon}`
}

export function formatNumber(value: number):string  {
	if(!value) return '0'
	const suffixes = ['', '만', '억', '조','해']
	const suffixNum = Math.floor((''+value).length/4)
	let shortValue: string|number = parseFloat((suffixNum != 0 ? (value / Math.pow(10000, suffixNum)) : value).toPrecision(2))
	if (shortValue % 1 != 0) {
		shortValue = shortValue.toFixed(1)
	}
	if(suffixNum ===  1 && shortValue < 1) return Number(shortValue) * 10 + '천'
	else if(shortValue === 1000) return '1천'
	return shortValue+suffixes[suffixNum]
}