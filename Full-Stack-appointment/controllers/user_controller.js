const db = require('../utils/connection')

const User = require('../models/user_model')


const {err_response, correctResponse} = require('../utils/response_handler')


const addUser = async (req,res)=>{

    const {username, email ,phone} = req.body

try {
    const result = await User.create({
        username : username,
        email : email,
        phone : phone
    })
    correctResponse(res,result)
}


 catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into users table"})
    }
}

const getUser = async(req, res)=>{
    try{
        const result = await User.findAll()

        correctResponse(res,result)
    }

    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to fetch from users table"})
    }
}

const deleteUser = async(req, res)=>{
    const {id }= req.params
        
    try{
        const result = await User.destroy({
        where : {
            id : id
        },
    })
    if(!result){
        err_response(res, {StatusCode : 500,message : `unable to find student with id ${id}`})
    }
     correctResponse(res,result)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to delete data from users table"})
    }
}

const editUser = async (req,res)=>{
    const {username, email,phone}  = req.body

    const {id} =req.params

    try{
         const user = await User.findByPk(id)

         if(!user){
             err_response(res, {StatusCode : 500,message : `unable to find user with id ${id}`})
         }
         user.username = username
         user.email = email
         user.phone = phone
         const result = await user.save()
          correctResponse(res,result)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to update user table "})
    }
   

   
    
}

module.exports ={
    addUser,
    getUser,
    deleteUser,
    editUser
}

