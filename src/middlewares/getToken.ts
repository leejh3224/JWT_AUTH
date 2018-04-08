import { Request, Response, NextFunction } from 'express'

import { IUser } from 'interface/User'
import { generateToken } from 'lib/generateToken'

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as IUser

  delete user.password
  delete user.__v

  const payload = user

  try {
    const token = await generateToken(payload)

    return res.json({
      token,
    })
  } catch (error) {
    return next(error)
  }
}
