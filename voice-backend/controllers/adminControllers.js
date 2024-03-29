const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { generateJWT } = require('../utils/help.service')


const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const query = {
            $or: [
                { username: username }
                , { email: email }
            ],
            role:'admin'
            
        }
        const doc = await User.findOne(query)
        
        if (doc) {
            return res.status(401).json({ error: true, message: 'Admin Already Registered' })
        }
        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(password, salt)
        const users = new User({
            username,
            email,
            password: hassedPassword,
            role: 'admin'
        })
        await users.save()
    
        return res.status(200).json({ error: false, message: 'Successfully registered' })
    } catch (err) {

        return res.status(404).json({ error: true, message: 'network issue' })

    }
}

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ error: true, message: 'All fields are mandatory.' });
        }
        const existingUser = await User.findOne({ username , role:'admin' });
        if (!existingUser) {
            return res.status(401).json({ error: true, message: 'username doesn"t exist' });
        }
        if (existingUser.role === 'student') {
            return res.status(403).json({ error: true, message: 'Only admins are allowed to see this' })
        }

        const verified = await bcrypt.compare(password, existingUser.password)

        if (!verified) {
            return res
                .status(401)
                .json({ error: true, message: "Invalid password" });
        }
        const accessToken = generateJWT({ username, role: existingUser.role })
        const role = existingUser.role;
        return res.status(200).json({ error: false, message: 'Successfully Login', accessToken: accessToken })
    }
    catch (err) {
        return res.status(409).json({ error: true, message: err.message  });
    }
}

const authAdmin =(req,res) =>{
    return res.status(200).json({ error: false, message: 'admin authenticated' })
}

module.exports = {
    registerAdmin, loginAdmin, authAdmin
}


