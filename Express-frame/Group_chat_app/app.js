const Express = require('express')
const log_in = require('./login/login.js')
const message = require('./login/message.js')
const app = Express()
app.use(Express.urlencoded({ extended: true }));
app.use(log_in)

app.use(message)

app.listen(3000,()=>{
    console.log("server is running")
})