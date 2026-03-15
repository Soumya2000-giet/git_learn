const express = require('express')

const db_connection = require('./utils/connection')

const stud_req = require('./routers/router')

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/students',stud_req)

app.listen(3000,err=>{
    console.log('server is running')
})


