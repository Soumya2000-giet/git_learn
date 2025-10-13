const express = require('express')

var Cors = require('cors')
const app = express()

app.use(Cors());

const db = require('./utils/connection')

const expenses_route = require('./routers/expense_router')


const user_route = require('./routers/user_router')

const expense_mod = require('./models/expense_model')

const user_mod = require('./models/user_model')


app.use(express.json())


// app.get('/',(req,res)=>{
//     console.log('welcome to home page')
//     res.send('welcome to Student Management portal')
// })


 app.use('/Expenses', expenses_route)
  
 app.use('/user',user_route)

 user_mod.hasMany(expense_mod)

 expense_mod.belongsTo(user_mod)

db.sync().then(
app.listen(3000,err=>{
    console.log('app is running')
})
).catch((err)=>{
    console.log(err)
})



