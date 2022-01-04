import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).json({ code: 404, data: '요청한 데이터를 찾지 못했습니다'})
}