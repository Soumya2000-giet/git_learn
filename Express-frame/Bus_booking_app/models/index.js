const sequelize = require('../Utils/connection2')

const {Sequelize, DataTypes} = require('sequelize')


const user = require('./User_model.js')

const booking = require('./booking_model.js')

const bus = require('./bus_model.js')

user.hasMany(booking)


booking.belongsTo(user)


bus.hasMany(booking)


booking.belongsTo(bus)



module.exports  = {

user,
booking

}