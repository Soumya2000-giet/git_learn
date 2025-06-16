const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')



const StudentCourse = sequelize.define('studentcourse',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    }
})


module.exports = StudentCourse