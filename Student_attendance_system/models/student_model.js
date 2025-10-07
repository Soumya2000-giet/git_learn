const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Student = sequelize.define('Students',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false 
    }
},
{
  timestamps: false
}
)

module.exports = Student

