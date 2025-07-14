const express = require('express')

const u_controller = require('../controllers/user_controller')

const u_router = express.Router()


u_router.get('/getUsers',u_controller.get_user)

u_router.post('/adduser',u_controller.add_user)


u_router.post('/addbooking',u_controller.add_booking)


u_router.get('/:id/bookings',u_controller.get_user_booking)


module.exports = u_router





