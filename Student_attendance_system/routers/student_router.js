const express = require('express')

const student_router = express.Router()

const att_controller = require('../controllers/attendance_controller')

student_router.post('/markattendance/:date',att_controller.addattendance)


student_router.get('/getattendance/:date',att_controller.get_attendance)


student_router.get('/getattendancesummery',att_controller.get_attendance_summery)



module.exports = student_router


