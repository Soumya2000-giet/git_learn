const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')

const users_route = require('./routers/user_router')

// const course_route = require('./routers/course_router')
require('./models/user_model')


app.use(express.json())


// app.get('/',(req,res)=>{
//     console.log('welcome to home page')
//     res.send('welcome to Student Management portal')
// })


 app.use('/Users',users_route)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



