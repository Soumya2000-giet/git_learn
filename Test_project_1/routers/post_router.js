const express = require('express')

const post_router = express.Router()

 const p_controller = require('../controllers/post_controller')



post_router.post('/addpost',p_controller.addpost)

post_router.get('/getposts',p_controller.getpost)



module.exports=post_router

