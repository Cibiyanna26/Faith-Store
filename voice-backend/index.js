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

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


const corsOptions = {
    origin: ['http://localhost:3000','https://webathon-xi.vercel.app/'],
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