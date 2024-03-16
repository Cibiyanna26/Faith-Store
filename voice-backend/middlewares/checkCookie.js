const jwt = require('jsonwebtoken')

const authUserCookie = async (req, res, next) => {
    const cookie = req.cookies;
    const secret = process.env.JWT_SECRET
    try {
        const decoded = jwt.verify(cookie.token, secret)
        if(decoded.role !== 'student'){
            return res.status(401).json({error:true,message:'only student are allowed to this page'})
        }
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({ error: true, message: err.message })
    }
}


const authAdminCookie = async (req, res, next) => {
    const cookie = req.cookies;
    const secret = process.env.JWT_SECRET
    try {
        const decoded = jwt.verify(cookie.token, secret)
        req.user = decoded;
        if (decoded.role !== 'admin') {
            return res.status(401).json({ error: true, message: 'only admin are allowed to this page' })
        }
        next()
    } catch (err) {
        return res.status(401).json({ error: true, message: err.message })
    }
}

module.exports = {
    authUserCookie, authAdminCookie
} 