const db = require('../utils/connection')

const Course = require('../models/courses')

const Student = require('../models/student_model')



const {err_response, correctResponse} = require('../utils/response_handler')


const add_course = async (req,res)=>{
    const {name} = req.body

    try{
        const course = await Course.create({
            'name':name
        })
        correctResponse(res,course)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into course table"})
    }
}


const addStudentCourse =async (req,res)=>{
    const {studentID,courseID} = req.body

    try{
        const student = await Student.findByPk(studentID)

        const course = await Course.findAll({
            where :{
                id : courseID
            }
        })

        await student.addCourse(course)

        const updateStudent = await Student.findByPk(studentID,{include:Course})
        correctResponse(res,updateStudent)

    }
    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to fetch student courses"})
    }
}

module.exports = {
    add_course,
    addStudentCourse
}