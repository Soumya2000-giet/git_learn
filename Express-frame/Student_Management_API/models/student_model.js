const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Student = sequelize.define('students',{
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey : TextTrackCue,
        autoIncrement:true
    }
})

module.exports = Student