import { Request } from 'express'
import User from 'models/User'
import * as passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { IUser } from 'interface/User'

const secret = process.env.JWT_SECRET

// jwt 토큰에는 iat(언제 발급되었는가), exp(만료시간 정보) 필드가 있습니다.
// User 타입에 추가로 두 가지 필드를 추가해줍니다.
interface tokenPayload extends IUser {
  iat: string
  exp: string
}

passport.use(
  new JwtStrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더의 Bearer 뒷 부분에서 토큰을 추출합니다.
      passReqToCallback: true,
    },
    async (req: Request, payload: tokenPayload, next: any) => {
      try {
        const user = await User.findById(payload._id) // 토큰의 payload의 _id정보를 통해 유저의 존재 유무를 파악합니다.
        return user ? next(null, user) : next('user not found', false)
      } catch (error) {
        return next(error, false)
      }
    },
  ),
)
