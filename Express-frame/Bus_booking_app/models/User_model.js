const sequelize = require('../Utils/connection2')

const {Sequelize, DataTypes} = require('sequelize')


const User_mod = sequelize.define('Users',{
id:{
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull : false,
    autoIncrement: true
},

name:{
    type:DataTypes.STRING
},
email:{
    type:DataTypes.STRING
}
})

module.exports =User_mod