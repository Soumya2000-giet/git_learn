const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Course = sequelize.define('courses',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING 
    }
})

module.exports = Course

