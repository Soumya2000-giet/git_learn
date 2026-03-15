const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')



const department = sequelize.define('department',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false
    }

})

module.exports = department
