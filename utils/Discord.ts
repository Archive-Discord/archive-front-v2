import { User } from '@types'
import { EndPoints } from '@utils/Constants'

/**
 * @param user 유저 오브젝트 값
 * @returns 유저 프로필 링크
 */
export const userAvaterLink = (user: User) => {
    if(!user.avatar) return `${EndPoints.Discord.CDN}/embed/avatars/${Number(user.discriminator) % 5}.png`
    return `${EndPoints.Discord.CDN}/avatars/${user._id}/${user.avatar}`
}