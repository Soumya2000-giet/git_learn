const student = require('./student_model.js')

const identitycard = require('./identity_card.js')


student.hasOne(identitycard)

identitycard.belongsTo(student)


module.exports = {
    student,
    identitycard
}


