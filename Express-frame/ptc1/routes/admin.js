const express = require('express')
const router = express.Router()

const body_parser = require('body-parser')

router.use(body_parser.urlencoded({extended : false}))

router.get('/add-product',(request, response, next)=>{
    console.log("this is 2nd middlewire")
    response.send("<form action ='/admin/add-product' method='post'><label for='name'>Name</label><input type='text' id='name' name='title'><br><label for='size'>size</label><input type='text' id='size' name='size'><br><button type='submit'>add</button></form>")
})
router.post('/add-product',(request, response, next)=>{
    console.log(request.body)
    response.redirect('/shop')
})

module.exports = router;