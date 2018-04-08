import { Router, Request, Response } from 'express'
import * as passport from 'passport'

// 유저 라우트를 불러옵니다.
import userService from './user'

// api version
export const v1: Router = Router()

// 이제 /v1/user 요청은 유저 라우트에서 처리합니다.
v1.use('/user', userService)

// jwt 인증을 요구하는 private 라우트
v1.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res.send('secret message')
  },
)
