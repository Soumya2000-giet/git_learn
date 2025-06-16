const db = require('../utils/connection')

const course = require('../models/courses')



const {err_response, correctResponse} = require('../utils/response_handler')


const add_course = async (req,res)=>{
    const {name} = req.body

    try{
        const Course = await course.create({
            'name':name
        })
        correctResponse(res,Course)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into course table"})
    }
}

module.exports = {
    add_course
}