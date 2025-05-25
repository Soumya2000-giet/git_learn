const db = require('../utils/connection')

const Student = require('../models/student_model')



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

const add_student =async  (req, res)=>{
    const {name , email, age} = req.body

    //const query = 'insert into Students (name, email, age) values(?,?,?)'


    try{
        const student = await Student.create({
            name :name,
            email : email,
            age:age
        })
         correctResponse(res,student)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into students table"})
    }

    // db.execute(query,[name,email,age],(err, result)=>{
    //     if(err){
    //         console.log(err)
    //         db.end()
    //         err_response(res, {StatusCode : 500,message : "unable to insert data into students table"})
    //     }
    //     correctResponse(res,result)
    // })
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

const update_student = async (req,res)=>{
    const {name, email,age}  = req.body

    const {id} =req.params

    try{
         const student = await Student.findByPk(id)

         if(!student){
             err_response(res, {StatusCode : 500,message : `unable to find student with id ${id}`})
         }
         student.name = name
         student.email = email
         student.age = age 
         const result = await student.save()
          correctResponse(res,result)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to update students table "})
    }
   

    // const query = 'update Students set name =? ,email =? , age = ? where id = ?'


    // db.execute(query,[name, email, age, id],(err, result)=>{
    //     if (err){
    //     console.log(err)
    //     db.end()
    //     err_response(res, {StatusCode : 500,message : "unable to update data of students table"})
    //     }
    //     correctResponse(res,result)
    // })
    
}


const delete_student = async(req, res)=>{
    const {id} = req.params
try{
    const result = await Student.destroy({
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
    err_response(res, {StatusCode : 500,message : "unable to delete data fromstudents table"})
}


    // const query = 'delete from Students where id = ?'

    // db.execute(query , [id],(err, result)=>{
    //     if(err){
    //     console.log(err)
    //     db.end()
    //     err_response(res,{StatusCode : 500,message : "unable delete students from students table"})
    //     }
    //     correctResponse(res,result)
        
        
    // })
}


module.exports = {
    get_student,
    add_student,
    retrive_student,
    update_student,
    delete_student

}