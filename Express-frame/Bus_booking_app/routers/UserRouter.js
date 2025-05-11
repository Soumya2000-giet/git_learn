const express = require('express')

const u_controller = require('../controllers/user_controller')

const u_router = express.Router()


u_router.get('/getUsers',u_controller.get_user)

u_router.post('/adduser',u_controller.add_user)


module.exports = u_router





