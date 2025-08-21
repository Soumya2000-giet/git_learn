const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')


const post_route = require('./routers/post_router')


require('./models/s_posts')


app.use(express.json())


// app.get('/',(req,res)=>{
//     console.log('welcome to home page')
//     res.send('welcome to Student Management portal')
// })


 app.use('/Posts',post_route)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



