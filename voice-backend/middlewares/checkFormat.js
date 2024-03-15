const checkUserRegistration = (req,res,next) =>{
    if(!req.body.username || !req.body.password || !req.body.email){
        return res.status(403).json({error:true,message:'enter all field'})
    }
    next()
}

const checkUserLogin = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(403).json({ error: true, message: 'enter all field' })
    }
    next()
}
module.exports = {
    checkUserRegistration , checkUserLogin
}