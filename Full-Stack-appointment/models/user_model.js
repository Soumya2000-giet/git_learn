const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const User = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    phone:{
        type:DataTypes.INTEGER,
        unique:true
    }

   
})

module.exports = User

