const express = require('express')

const e_router = express.Router()

 const e_controller = require('../controllers/expense_controller')



e_router.post('/addExpense',e_controller.addExpense)

e_router.get('/getExpense',e_controller.getExpense)


e_router.get('/editExpense/:id',e_controller.editExpense)


e_router.delete('/deleteExpense/:id',e_controller.deleteExpense)







module.exports=e_router

