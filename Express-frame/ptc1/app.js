const http = require('http')
const Express = require('express')

const app = Express();


app.use((request, response, next)=>{
    console.log("this is 1st middlewire");
    next();
})


app.use((request, response, next)=>{
    console.log("this is 2nd middlewire")
    response.send('<h1>Hello Express</h1>')
})

app.listen(3000,()=>{
    console.log("server is running")
})