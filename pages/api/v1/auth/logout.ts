import { serialize } from 'cookie'
import RequestHandler from '@utils/RequestHandler'

const Logout = RequestHandler().get(async (req, res) => {
	res.setHeader('set-cookie', serialize('auth', '', { maxAge: -1, path: '/', domain: `.${process.env.DOMAIN}`}))
	res.redirect('/')
})
export default Logout