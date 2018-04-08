import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string()
      .min(1)
      .max(12)
      .regex(/^[a-z0-9가-힇]+$/i),
    password: Joi.string()
      .min(8)
      .max(64)
      .regex(/^[ -~]+$/i),
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    return next(result.error)
  }

  return next()
}
