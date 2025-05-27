const db = require('../Utils/connection2')

const user_mod = require('../models/User_model')

const {errResponse, correctResponse} = require('../utils/response_controller')



const add_user = async (req,res)=>{

    const {name, email} = req.body
    try{
    const result = await user_mod.create({
        name : name ,
        email : email
    })
    
    correctResponse(res,result)
    }
    catch(err){
        console.log(err)
        errResponse(res,{StatusCode : 500, mesaage : "error in inserting to users table"})
    }
   
}

const get_user = async(req,res)=>{

    try{
    const result = await user_mod.findAll()

    if(!result || result.length===0){
         return errResponse(res, {StatusCode : 500,message : `no users available`})
    }
    correctResponse(res,result)
}
catch(err){
    console.log(err)
    errResponse(res,{StatusCode : 500, mesaage : "error in fetching from  users table"})
}
    
}

module.exports = {
    add_user,
    get_user
}