require('dotenv').config();
const express = require('express')
const app = express()
const userRouter = require('./routes/userRoutes')
// const postRouter = require('./routes/postRoutes')
const adminProductRouter = require('./routes/adminproductRoutes')
const userPurchaseRoutes = require('./routes/userPurchaseRoutes')
// const profileRouter = require('./routes/profileRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const compression = require('compression')
const cors = require('cors')
const connection = require('./db')


connection()
app.use(cookieParser())
const corsOptions = {
    origin: ['http://localhost:3000','https://webathon-backend.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json())
app.use(compression())

app.use('/api/users',userRouter)
app.use('/api/purchase',userPurchaseRoutes)
app.use('/api/admin/product',adminProductRouter)


app.listen(5000,()=>{
    console.log('listening')
})