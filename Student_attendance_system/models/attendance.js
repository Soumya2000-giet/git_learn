const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')
const Student = require("./student_model");

const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("present", "absent"),
    allowNull: false
  }
}, {
  timestamps: false
});

// Relation: Attendance belongs to Student
Attendance.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(Attendance, { foreignKey: "studentId" });

module.exports = Attendance;

//module.exports = Student;
