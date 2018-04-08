import User from 'models/User'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request } from 'express'

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
      session: false,
    },
    async (req: Request, email: string, password: string, next: any) => {
      try {
        const user = await User.findOne({ email })
        if (user) {
          const { password } = req.body
          const isValidPassword = user.validatePassword(password)

          return isValidPassword
            ? next(null, user.toObject())
            : next('wrong password', false)
        }

        return next('wrong email', false)
      } catch (error) {
        return next(error, false)
      }
    },
  ),
)
