const db = require('../Utils/connection2')

const {errResponse, correctResponse} = require('../utils/response_controller')



const add_user = (req,res)=>{

    const {name, email} = req.body
    const query = 'insert into users (name,email) values(?,?)'

    db.execute(query,[name, email], (err,result)=>{
        if (err){
        console.log(err)
        
        db.end()
        return errResponse(res,{StatusCode : 500, mesaage : "error in inserting to userss table"})
        
        }
       
        return correctResponse(res,result)
    })
}

const get_user = (req,res)=>{
    const query = 'select * from users'

    db.execute(query,(err,result)=>{
        if(err){
            console.log(err)
          
            db.end()
            return errResponse(res,{StatusCode : 500, message : "error in inserting to userss table"})
            
        }
        console.log("successfully fetched students")
        return correctResponse(res,result)

    })
}

module.exports = {
    add_user,
    get_user
}