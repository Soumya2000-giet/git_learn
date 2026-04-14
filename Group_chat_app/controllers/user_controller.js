const db = require('../utils/connection')

 const uuid = require('uuid');

const { v4: uuidv4 } = require('uuid');

const user_mod = require('../models/user_model')

const forgot_p_tl = require('../models/forgot_passowrd')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

 const dotenv = require('dotenv')

// const { GoogleGenAI } = require('@google/genai')






const Sib = require('sib-api-v3-sdk')

const client = Sib.ApiClient.instance


const apiKey = client.authentications['api-key']

apiKey.apiKey = process.env.API_KEY



const {err_response, correctResponse} = require('../utils/response_handler')

const forgotPassword = async (req, res) =>{
    
  try{

    const {email} = req.body

    


    const user_exist = await user_mod.findOne({
   where: {
        email: email,
      }
    })

  if(!user_exist){
    return err_response(res, {
          StatusCode: 404,
          message: "User doesn't exists",
        });
    }

    const id = uuidv4();

    const f_res = await forgot_p_tl.create({
      id : id,
      isactive : true,
      userId : user_exist.id
    })

    const transEmailApi = new Sib.TransactionalEmailsApi()


    const sender = {

      email : 'soumyaranjanpradhan734@gmail.com'
    }

    const receivers = [
      {
        email : email
      }
    ]

    const result = await transEmailApi.sendTransacEmail({
      sender,
      to : receivers,
      Subject :'Reset password',
      // textContent : ``
      htmlcontent : `<a href="http://localhost:3000/user/password/resetPassword/${id}">Reset password</a>`
    })

    console.log(result)
    correctResponse(res, result)

  }
  catch(err){
     console.log(`${err}`)
     return res.status(400).json({err : `error in sending email ${err}`});

  }
}


const resetPassword = async(req, res) =>{

try{

  const {id} = req.params


  const request_data = await forgot_p_tl.findOne({where :{id}})


  if (!request_data){

    return err_response(res, {
          StatusCode: 404,
          message: "request link doesn't exists",
        });

  }

  await request_data.update({ isactive: false})


  res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/user/password/updatePassword/${id}" method="post">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input></br>
                                         <label for="re_newpassword">Re-enter New password</label>
                                        <input name="re_newpassword" type="password" required></input></br>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
  res.end()

  
}
catch(err){
  console.log(`${err}`)
     return res.status(400).json({err : `error in resetting password ${err}`});

}

}

const updatePassword = async (req, res)=>{
  try{
    const {id} = req.params

    const {newpassword ,re_newpassword } = req.body

    if (newpassword != re_newpassword){
      // throw new Error("both the passwords are not matching")

      return err_response(res, {
          StatusCode: 404,
          message: "both the passwords are not matching",
        });
    }

    const request_data = await forgot_p_tl.findOne({where :{id}})

    if (!request_data){
      //  throw new Error("request id does n't exists")

       return err_response(res, {
          StatusCode: 404,
          message: "request id does n't exists",
        });

    }

    const User_data = await user_mod.findOne({where : {
      id : request_data.userId
    }})

    if (!User_data){
      // throw new Error("User not available")

      return err_response(res, {
          StatusCode: 404,
          message: "User not available",
        });
      
    }

    bcrypt.hash(newpassword,10 , async (err ,hash)=>{
      const result = await User_data.update({
            password : hash
        })
        // correctResponse(res, result)

         correctResponse(res, {
    message: "Password updated successfully"
  });
    })


  }
  catch(err){
     console.log(`${err}`)
     return res.status(400).json({err : `error in updating password ${err}`});
  }
}


const adduser = async (req, res)=>{
  try{
    const {username , email, password, phone} = req.body
    
    if (!username || !email || !password || !phone) {
      return res.status(400).json({err : "all aparmeters are required"});
    }


    
    const existingUser = await user_mod.findOne({
      where: {
        email: email,
      },
    });
    console.log(existingUser)
    if (existingUser) {
       return res.status(400).json({err : "user already exist"});
    }

    bcrypt.hash(password,10 , async (err ,hash)=>{
      const result = await user_mod.create({
            username : username,
            email : email,
            phone : phone,
            password : hash
        })
        correctResponse(res, result)
    })
        
    }
    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to add data into user table"})
    }
}


function generateAcessToken(id){
  return jwt.sign({id},'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
}

const validateuser = async (req, res)=>{
  const {email , password} = req.body
try{
const user_exist = await user_mod.findOne({
   where: {
        email: email,
      }
})

if(!user_exist){
   return err_response(res, {
        StatusCode: 404,
        message: "User not found",
      });
}

bcrypt.compare(password, user_exist.password , (err,result)=>{

  if(err){
    throw new Error("something went wrong")
  }
  if(result === true){
     return  res.status(200).json({
    data: user_exist,
    status: true,
    token : generateAcessToken(user_exist.id)
  })
  }
  else{
    err_response(res, {StatusCode : 500,message : "password is incorrect"})
  }
})

}
catch(err){
  err_response(res, {StatusCode : 500,message : "unable to login into users table"})
}
}




module.exports= {
    adduser,
    validateuser,
    forgotPassword,
    resetPassword,
    updatePassword
}