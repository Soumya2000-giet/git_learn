const express = require('express')

const router = express.Router()

router.get('/',(request, response, next)=>{
    response.send("<h1>hello from 1st page</h1>")
    console.log("this is 1st middlewire");
})

module.exports = router;