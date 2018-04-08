// src/server.ts
// 환경변수를 가져와주는 모듈
import { config } from 'dotenv'
import { Request, Response, NextFunction, Application } from 'express'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet' // 보안을 위한 모듈
import * as logger from 'morgan' // 로깅을 위한 모듈
import * as passport from 'passport'
import chalk from 'chalk' // 로그 하이라이트 모듈

// 아래와 같이 상대경로('./routes') 대신에 절대경로('routes')를 사용하려면
// 환경변수를 설정해야합니다.
import { v1 } from 'routes'
import 'passport/local-signup'
import 'passport/local-signin'
import 'passport/jwt'

config()

// typescript에서는 이런 식으로 변수: 타입 = 값 형태로 타입을 지정합니다.
const app: Application = express()

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/v1', v1) // 이제 /로 들어오는 모든 요청은 api route에서 처리합니다.

// 에러 핸들링
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(`${chalk.red('[Warn]')} ${err}`)
  res.status(500).send('error happend!')
})

export default app
