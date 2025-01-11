const http = require('http')

const body_parser = require('body-parser')
const Express = require('express')

const app = Express();

app.use(body_parser.urlencoded({extended : false}))


app.use('/add-product',(request, response, next)=>{
    console.log("this is 2nd middlewire")
    response.send("<form action ='/product' method='post'><label for='name'>Name</label><input type='text' id='name' name='title'><br><label for='size'>size</label><input type='text' id='size' name='size'><br><button type='submit'>add</button></form>")
})
app.use('/product',(request, response, next)=>{
    console.log(request.body)
    response.redirect('/')
})


app.use('/',(request, response, next)=>{
    response.send("<h1>hello from 1st page</h1>")
    console.log("this is 1st middlewire");
})

app.listen(3000,()=>{
    console.log("server is running")
})