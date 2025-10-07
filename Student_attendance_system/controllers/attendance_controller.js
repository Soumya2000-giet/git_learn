
const { fn, col, literal } = require('sequelize');

const sequelize= require('../utils/connection.js')




const stud_model = require('../models/student_model')


const attendance_model = require('../models/attendance')


const {err_response, correctResponse} = require('../utils/response_handler')



const addattendance = async (req, res)=>{
    const date = req.params.date

    const {attendance} = req.body


    const t = await sequelize.transaction()


    try{

    //await attendance_model.destroy({ where: { date }, transaction: t });

    const studentRecords = {};
    console.log(date)
    console.log(attendance)
    for (const name of Object.keys(attendance)){

        let student = await stud_model.findOne({ where: { name } });


        if(!student){
            student = await stud_model.create({name :name},{transaction : t})
        }

        studentRecords[name] = student.id
    }

    const rows = Object.keys(attendance).map(name=>({
        date,
        status:attendance[name],
        studentId:studentRecords[name]
    }))


   console.log(rows)

    const result = await attendance_model.bulkCreate(rows,{transaction : t})

    await t.commit()

    correctResponse(res,result)
    
    }

catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into attendance table"})
    }

    
}


const get_attendance = async (req, res)=>{

    const date = req.params.date
    try{
    const attendances = await attendance_model.findAll({
        where : {date},
        include :[{model :stud_model, attributes: ['name'] }]
    })

    if (attendances.length === 0){
        console.log("inside attendance if condition")
        return correctResponse(res,null)
    }

    //console.log(attendances)
    const result = {}

    attendances.forEach(a=>{result[a.Student.name]=a.status})

    console.log(result)

    correctResponse(res,result)


}

catch(err){

     console.log(err)
     err_response(res, {StatusCode : 500,message : "unable to fetch data from attendance table"})
}
}


const get_attendance_summery = async(req, res)=>{
    try{
        const date_row = await attendance_model.findAll({
            attributes : [[fn('DISTINCT',col('date')),'date']]
        })
        console.log(date_row)

        const total_days = date_row.length


        const stud_att = await attendance_model.findAll({
            attributes : [[fn('SUM',literal(`CASE WHEN status ='present' then 1 else 0 end`)),'present']],
            group : ['studentId'],
            include : [{model : stud_model , attributes :['name']}]
        })

        console.log(stud_att)

        const summery = {}

        stud_att.forEach(row =>{
            const name = row.Student.name 
            const present = parseInt(row.get('present'),10)
            const percentage = total_days ? ((present/ total_days)*100).toFixed(2) :'0.00';
            summery[name] ={present , total : total_days , percentage}
        })
         
        console.log(summery)
         correctResponse(res,summery)
    }
    catch(err){
         console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to get attendance summery"})
    }
}



module.exports =  {
    addattendance,
    get_attendance,
    get_attendance_summery
}