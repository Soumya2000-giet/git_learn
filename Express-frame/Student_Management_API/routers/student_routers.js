const express = require('express')

const s_router = express.Router()

const StudentController = require('../controllers/StudentController')


s_router.get('/getstudents',StudentController.get_student)

s_router.post('/addstudent',StudentController.add_student)

s_router.get('/retriveStudent/:id',StudentController.retrive_student)

s_router.put('/updatestudent/:id',StudentController.update_student)

s_router.delete('/deletestudent/:id',StudentController.delete_student)

s_router.post('/addStudentIdentity',StudentController.addStudentIdentity)

module.exports = s_router

