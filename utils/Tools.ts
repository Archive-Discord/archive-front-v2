export const redirectTo = (router, to) => {
	router.push(to || '/')
	return
} 