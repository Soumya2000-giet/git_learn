const express = require('express')

const app = express()

const db = require('./utils/connection')

const student_route = require('./routers/student_routers')

const course_route = require('./routers/course_router')
require('./models')


app.use(express.json())


// app.get('/',(req,res)=>{
//     console.log('welcome to home page')
//     res.send('welcome to Student Management portal')
// })


app.use('/students',student_route)
app.use('/course',course_route)
db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



