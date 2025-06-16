const student = require('./student_model.js')


const courses = require('./courses.js')

const student_courses =  require('./Student_course.js')

const identitycard = require('./identity_card.js')


student.hasOne(identitycard)

identitycard.belongsTo(student)

student.belongsToMany(courses, { through: student_courses })

courses.belongsToMany(student, { through: student_courses })

module.exports = {
    student,
    identitycard,
    courses,
    student_courses
}


