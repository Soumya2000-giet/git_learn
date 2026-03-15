const sequelize = require('../Utils/connection2')

const {Sequelize, DataTypes} = require('sequelize')


const Payment_mod = sequelize.define('Payments',{
id:{
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull : false,
    autoIncrement: true
},

amountPaid:{
    type:DataTypes.FLOAT
},
paymentStatus:{
    type:DataTypes.STRING
}
})

module.exports =Payment_mod