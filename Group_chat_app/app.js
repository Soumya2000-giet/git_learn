const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')




const user_route = require('./routers/user_router')



const user_mod = require('./models/user_model')

const message_mod = require('./models/message_model')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const path = require("path");


app.use(express.static(path.join(__dirname, "public")));


app.use('/user',user_route)

user_mod.hasMany(message_mod)
 
message_mod.belongsTo(user_mod)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



