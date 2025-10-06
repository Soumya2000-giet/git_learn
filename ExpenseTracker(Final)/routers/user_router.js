const express = require('express')

const u_router = express.Router()

const u_controller = require('../controllers/user_controller')



u_router.post('/adduser',u_controller.adduser)


module.exports = u_router


