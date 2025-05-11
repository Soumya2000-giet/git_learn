const express = require('express')

const app = express()

app.use(express.json())

const user_route = require('./routers/UserRouter')

const bus_route = require('./routers/BusRouter')


app.get('/',(req,res)=>{
    console.log('welcome to bus booking app')
    res.send('welcome to bus booking app')
})

app.use('/users',user_route)

app.use('/buses',bus_route)


app.listen(3000,err=>{
    console.log("app is running")
})