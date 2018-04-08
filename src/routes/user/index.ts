import { Router } from 'express'
import * as passport from 'passport'

import { validateBody } from 'middlewares/validateBody'
import { getToken } from 'middlewares/getToken'

const router: Router = Router()

router.use(validateBody)

router.post(
  '/signin',
  passport.authenticate('local-signin', { session: false }),
  getToken,
)

router.post(
  '/signup',
  passport.authenticate('local-signup', { session: false }),
  getToken,
)

export default router
