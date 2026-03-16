const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Expense = sequelize.define('expenses',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    amount:{
        type:DataTypes.INTEGER
    },
    desc:{
        type:DataTypes.STRING,
        
    },
    expense_type:{
        type:DataTypes.STRING,
       
    }

   
})

module.exports = Expense

