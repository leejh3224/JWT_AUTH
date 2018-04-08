import * as mongoose from 'mongoose'

export const connect = (db: string) => {
  // <T>을 통해 type 검사를 off할 수 있습니다. (type assertion)
  // mongoose의 Promise가 native js Promise를 사용하게 됩니다.
  ;(<any>mongoose).Promise = global.Promise

  return mongoose
    .connect(`mongodb://localhost:27017/${db}`)
    .then(() => console.log('db is ready'), err => console.log(err))
}

// api testing을 위한 함수
export const disconnect = () => {
  mongoose.connection.close()
}
