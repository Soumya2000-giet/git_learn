const sequelize = require('../Utils/connection2')

const {Sequelize, DataTypes} = require('sequelize')


const Booking_mod = sequelize.define('Bookings',{
id:{
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull : false,
    autoIncrement: true
},

seatNumber:{
    type:DataTypes.INTEGER
}
})

module.exports = Booking_mod