const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')

const expenses_route = require('./routers/expense_router')


const user_route = require('./routers/user_router')

const payment_route = require('./routers/payment_router')

const expense_mod = require('./models/expense_model')

const user_mod = require('./models/user_model')

const payment_mod = require('./models/payment_model')

const forgot_password = require('./models/forgot_passowrd')



app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const path = require("path");

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "public")));




// app.get('/',(req,res)=>{
//     console.log('welcome to home page')
//     res.send('welcome to Student Management portal')
// })


 app.use('/Expenses', expenses_route)
  
 app.use('/user',user_route)

 app.use('/payment',payment_route)

 user_mod.hasMany(expense_mod)

 expense_mod.belongsTo(user_mod)

 user_mod.hasMany(forgot_password)
 
 forgot_password.belongsTo(user_mod)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



