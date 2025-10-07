const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')

const student_route = require('./routers/student_router')


const stud_model = require('./models/student_model')

const att_model = require('./models/attendance')


app.use(express.json())

app.use('/Student',student_route)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})
