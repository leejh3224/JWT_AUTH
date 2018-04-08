import * as jwt from 'jsonwebtoken'

import { IUser } from 'interface/User'

const secret = <string>process.env.JWT_SECRET

export const generateToken = (payload: IUser): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      { expiresIn: '30 minutes' },
      (err: any, token: string) => {
        if (!err) {
          resolve(token)
        } else {
          reject(err)
        }
      },
    )
  })
}
