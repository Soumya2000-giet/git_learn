const express = require('express')

const u_router = express.Router()

const u_controller = require('../controllers/user_controller')


const m_controller = require('../controllers/message_controller')

const auth = require('../middlewares/auth')



u_router.post('/adduser',u_controller.adduser)

u_router.post('/login',u_controller.validateuser)

u_router.post('/message/send',auth.user_auth,m_controller.sendmessage)

u_router.get('/message/receive',auth.user_auth,m_controller.getmessage)




u_router.post('/password/forgotpassword',u_controller.forgotPassword)

u_router.get('/password/resetPassword/:id',u_controller.resetPassword)

u_router.post('/password/updatePassword/:id',u_controller.updatePassword)


module.exports = u_router