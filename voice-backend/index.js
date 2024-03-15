require('dotenv').config();
const express = require('express')
const app = express()
const userRouter = require('./routes/userRoutes')
// const postRouter = require('./routes/postRoutes')
// const profileRouter = require('./routes/profileRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const compression = require('compression')
const cors = require('cors')
const connection = require('./db')


connection()
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json())
app.use(compression())

app.use('/api/users',userRouter)

app.listen(5000,()=>{
    console.log('listening')
})