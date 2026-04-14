const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')


const User = sequelize.define('user',{
      id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    username :{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email :{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password : {
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    phone: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    
})

module.exports = User