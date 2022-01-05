/**
 * @param router useRouter `router` 오브젝트
 * @param to 리다이렉트할 주소 
 * @returns 리다이렉트
 */
export const redirectTo = (router, to: string) => {
	router.push(to || '/')
	return
} 