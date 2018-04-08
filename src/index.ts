import app from './server'
import * as db from 'models/db'

const port = process.env.PORT || 3001

db.connect('fork') // fork라는 디비를 사용
app.listen(port, () => console.log('listening...'))
