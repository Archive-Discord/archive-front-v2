import { NextApiResponse ,NextApiRequest } from "next";
import ratelimit from "express-rate-limit";
import nextConnect from "next-connect"

let apiLimiter = ratelimit({
  windowMs: 60 * 1000 * 1, // 레이트 리밋 몇분 초기화 할건지
  max: 100, // 레이트 리밋 최대 횟수
  statusCode: 429, // 레이트 리밋 상태코드
  
})

let RequestHandler = () => nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {

  },
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {

  }
})

