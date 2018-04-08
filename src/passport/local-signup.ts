import User from 'models/User'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local' // passport-local 전략
import { Request } from 'express'

passport.use(
  'local-signup', // 각 전략마다 이름을 지어줄 수 있습니다. 만약 생략한다면 local이라는 이름을 사용하게 됩니다.
  new LocalStrategy(
    {
      usernameField: 'email', // 우리는 username 대신에 email을 사용합니다.
      passReqToCallback: true, // req 객체를 callback 함수에 넘깁니다.
      session: false, // 세션은 따로 사용하지 않습니다.
    },
    async (req: Request, email: string, password: string, next: any) => {
      try {
        // 먼저 이미 가입된 유저가 있는지 확인합니다.
        const user = await User.findOne({ email })

        // 이미 가입된 유저가 있다면 다음 미들웨어에 요청을 넘깁니다.
        if (user) {
          // next 함수는 첫 인자로 에러, 두 번째 인자로 유저를 받습니다.
          return next('user exists!', false)
        }

        // 요청 객체의 body에서 username을 가져옵니다.
        const { username } = req.body
        const newUser = new User()
        newUser.email = email
        newUser.username = username
        // methods는 이런 식으로 document 단위에서 사용할 수 있습니다.
        newUser.password = newUser.generateHash(password)

        await newUser.save()

        // 중요: jsonwebtoken은 payload로 js object만 받기 때문에
        // mongoose 도큐먼트의 toOject 함수를 통해 object로 바꿔줍니다.
        return next(null, newUser.toObject())
      } catch (error) {
        return next(error, false)
      }
    },
  ),
)
