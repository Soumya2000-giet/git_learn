const db = require('../utils/connection')

const {err_response, correctResponse} = require('../utils/response_handler')

const get_student = (req,res)=>{
    const  query = 'select * from Students';

    db.execute(query,(err,result)=>{
        if(err){
            console.log(err)
            db.end()
            err_response(res, {StatusCode : 500,message : "unable to fetch students"})
        }

        correctResponse(res,result)
})
}

const add_student = (req, res)=>{
    const {name , email, age} = req.body

    const query = 'insert into Students (name, email, age) values(?,?,?)'

    db.execute(query,[name,email,age],(err, result)=>{
        if(err){
            console.log(err)
            db.end()
            err_response(res, {StatusCode : 500,message : "unable to insert data into students table"})
        }
        correctResponse(res,result)
    })
}

const retrive_student = (req, res)=>{
    const {id} = req.params

    const query = 'select * from Students where id =?'

    db.execute(query,[id],(err, result)=>{
        if(err){
            console.log(err)
            db.end()
            err_response(res, {StatusCode : 500,message : "unable to fetch data from students table "})

        }
        correctResponse(res,result)
    })
}

const update_student = (req,res)=>{
    const {name, email,age}  = req.body

    const {id} =req.params

    const query = 'update Students set name =? ,email =? , age = ? where id = ?'


    db.execute(query,[name, email, age, id],(err, result)=>{
        if (err){
        console.log(err)
        db.end()
        err_response(res, {StatusCode : 500,message : "unable to update data of students table"})
        }
        correctResponse(res,result)
    })
    
}


const delete_student = (req, res)=>{
    const {id} = req.params
    const query = 'delete from Students where id = ?'

    db.execute(query , [id],(err, result)=>{
        if(err){
        console.log(err)
        db.end()
        err_response(res,{StatusCode : 500,message : "unable delete students from students table"})
        }
        correctResponse(res,result)
        
        
    })
}


module.exports = {
    get_student,
    add_student,
    retrive_student,
    update_student,
    delete_student

}