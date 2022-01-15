import { serialize } from 'cookie'
import RequestHandler from '@utils/RequestHandler'
import { NextApiRequest, NextApiResponse } from 'next'

const Logout = RequestHandler().get(async (_req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('set-cookie', serialize('auth', '', { maxAge: -1, path: '/', domain: `.${process.env.DOMAIN}`}))
	res.redirect('/')
})
export default Logout