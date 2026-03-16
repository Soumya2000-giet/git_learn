const jwt = require('jsonwebtoken')

const user_mod = require('../models/user_model')


const user_auth = async(req, res , next)=>{
    try{
    const token = req.header('Authorization')
    console.log(`token is :${token}`)

    const user = jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')

    console.log(user.id)

    const User = await user_mod.findByPk(user.id)

    if (!user){
        throw new Error('user not available')
    }

    req.user = User

    next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({message : err , status : false})
    }
}

module.exports = {
    user_auth
}