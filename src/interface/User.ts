import * as mongoose from 'mongoose'

export type IUser = {
  _id: string
  email: string
  password?: string
  username: string
  // mongoose version key
  // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongodb
  __v?: number
}

export type UserDocument = mongoose.Document & IUser
