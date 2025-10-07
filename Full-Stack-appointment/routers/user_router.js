const express = require('express')

const u_router = express.Router()

 const u_controller = require('../controllers/user_controller')



u_router.post('/adduser',u_controller.addUser)

u_router.get('/getuser',u_controller.getUser)


u_router.get('/edituser/:id',u_controller.editUser)


u_router.delete('/deleteuser/:id',u_controller.deleteUser)







module.exports=u_router

