import { NextApiResponse ,NextApiRequest } from "next";
import ratelimit from "express-rate-limit";
import nextConnect from "next-connect"
import { limitType } from "@types";

let baseLimiter = ratelimit({
  windowMs: 60 * 1000 * 10, // 레이트 리밋 몇분 초기화 할건지
  max: 1000, // 레이트 리밋 최대 횟수
  statusCode: 429, // 레이트 리밋 상태코드
  keyGenerator: (req) => req.headers['x-forwarded-for'] as string,
  handler: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(429).json({ status: 429, message: "요청이 너무 많습니다!" });
  }
})

let loginLimiter = ratelimit({
  windowMs: 60 * 1000 * 1, // 레이트 리밋 몇분 초기화 할건지
  max: 10, // 레이트 리밋 최대 횟수
  statusCode: 429, // 레이트 리밋 상태코드
  keyGenerator: (req: NextApiRequest) => req.headers['x-forwarded-for'] as string,
  handler: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(429).json({ status: 429, message: "로그인 많이 시도하였습니다." });
  }
})

let RequestHandler = (type?: limitType) => nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).json({ status: 404, message: "요청을 찾을수 없습니다." });
  },

  onError: (err: Error, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(err)
    res.status(500).send({ status: 500, message: '알수없는 오류가 발생했습니다.', data: {error: err.message} })
  }
}).use(getType(type))

function getType(type: limitType) {
  switch (type) {
    case 'loginLimiter':
      return loginLimiter
    default:
      return baseLimiter
  }
}
export default RequestHandler
