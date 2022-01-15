import { User } from '@types'
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

export function serialize<T>(data: T): T {
	return JSON.parse(JSON.stringify(data))
}

/**
 * @param user 유저 오브젝트 값
 * @returns 유저 프로필 링크
 */
export const userAvaterLink = (user: User): string => {
    if(!user.avatar) return `${EndPoints.Discord.CDN}/embed/avatars/${Number(user.discriminator) % 5}.png`
    return `${EndPoints.Discord.CDN}/avatars/${user._id}/${user.avatar}`
}
