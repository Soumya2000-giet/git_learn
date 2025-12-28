const db = require('../utils/connection')

const user_mod = require('../models/user_model')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

const { GoogleGenAI } = require('@google/genai')

dotenv.config();



const {err_response, correctResponse} = require('../utils/response_handler')


const airesponse = async (req, res) =>{

  try{

    const { input_text } = req.body;
    console.log(`requested text is ${input_text}`)

    const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

    const response_ai = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input_text,
  });
    console.log(response_ai.text);
let cleanedText = response_ai.text;

cleanedText = cleanedText
  .replace(/\*\*/g, "")
  .replace(/,\s*\d+/g, "")
  .trim();

correctResponse(res, cleanedText);


  }

  catch(err){
     console.log(`${err}`)
     return res.status(400).json({err : `error in generating ai response ${err}`});
  }
}


const adduser = async (req, res)=>{
  try{
    const {username , email, password} = req.body
    
    if (!username || !email || !password) {
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
            password : hash
        })
        correctResponse(res, result)
    })
        
    }
    catch(err){
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
    airesponse
}