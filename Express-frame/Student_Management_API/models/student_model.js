const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Student = sequelize.define('students',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    }
})

module.exports = Student