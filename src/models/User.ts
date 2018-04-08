import { Schema, model } from 'mongoose'
import * as bcrypt from 'bcrypt' // 암호화 모듈

import { UserDocument } from 'interface/User'

// UserModel의 methods들에 대한 type definition
export interface UserModel extends UserDocument {
  generateHash: (password: string) => string
  validatePassword: (password: string) => boolean
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // email 필드가 id 역할을 하게 되므로 unique 속성을 주었습니다.
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // createdAt과 updatedAt 필드를 생성해줌
  { timestamps: true },
)

// 비밀번호를 hash로 저장합니다.
userSchema.methods.generateHash = function(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(16))
}

// hash와 비밀번호를 비교하는 함수
userSchema.methods.validatePassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

export default model<UserModel>('User', userSchema)
