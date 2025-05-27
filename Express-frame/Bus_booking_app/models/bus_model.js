const sequelize = require('../Utils/connection2')

const {Sequelize, DataTypes} = require('sequelize')


const bus_mod = sequelize.define('Buses',{
id:{
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull : false,
    autoIncrement: true
},

busNumber:{
    type:DataTypes.STRING
},
totalSeats:{
    type:DataTypes.INTEGER
},
availableSeats:{
    type:DataTypes.INTEGER
}
})

module.exports =bus_mod