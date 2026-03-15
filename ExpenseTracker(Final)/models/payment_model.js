const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')


const payment = sequelize.define('payment',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },

    orderId :{
        type:DataTypes.STRING,
        allowNull:false,
    },

    orderAmount : {
        type:DataTypes.STRING,
        allowNull:false,
    },

    orderCurrency :{
        type:DataTypes.STRING,
        allowNull:false,

    },

    paymentStatus :{
        type:DataTypes.STRING,
        allowNull:false,

    }


})

module.exports = payment