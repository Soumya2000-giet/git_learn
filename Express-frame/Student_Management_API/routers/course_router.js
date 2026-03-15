const express = require('express')

const course_router = express.Router()

const course_controller = require('../controllers/coursecontroller')


course_router.post('/addcourse',course_controller.add_course)

course_router.get('/addStudentCourse',course_controller.addStudentCourse)


module.exports = course_router


