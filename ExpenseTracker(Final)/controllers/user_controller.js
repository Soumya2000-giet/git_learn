const db = require('../utils/connection')

const user_mod = require('../models/user_model')


const {err_response, correctResponse} = require('../utils/response_handler')


const adduser = async (req, res)=>{
    const {username , email, password} = req.body

    try{


        if (!username || !email || !password) {
      return err_response(res, {
        StatusCode: 400,
        message: "All fields (username, email, password) are required",
      });
    }

    const existingUser = await user_mod.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return err_response(res, {
        StatusCode: 409,
        message: "User already exists",
      });
    }
        const result = user_mod.create({
            username : username,
            email : email,
            password : password
        })

        correctResponse(res, result)
    }
    catch(err){
        err_response(res, {StatusCode : 500,message : "unable to add data into user table"})
    }
}

const validateuser = async (req, res)=>{
  const {email , password} = req.body
try{
const user_exist = await user_mod.findOne({
   where: {
        email: email,
      }
})
console.log(user_exist)
if(!user_exist){
  return err_response(res, {
        StatusCode: 404,
        message: "User not found",
      });
}
if(user_exist.password != password){
  return err_response(res, {
        StatusCode: 401,
        message: "User not authorized",
      });
}

correctResponse(res, user_exist)

}
catch(err){
  err_response(res, {StatusCode : 500,message : "unable to login into users table"})
}
}

module.exports= {
    adduser,
    validateuser
}