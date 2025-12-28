const express = require('express')

const u_router = express.Router()

const u_controller = require('../controllers/user_controller')



u_router.post('/adduser',u_controller.adduser)

u_router.post('/login',u_controller.validateuser)

u_router.post('/predictCategory',u_controller.airesponse)


module.exports = u_router


