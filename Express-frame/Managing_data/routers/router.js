const express = require('express')
const student_control = require('../controllers/studentcontroller')

const stud_router = express.Router()

stud_router.post('/add',student_control.add_student)

stud_router.put('/update/:id',student_control.update_student)

stud_router.delete('/delete/:id',student_control.delete_student)

module.exports = stud_router    


