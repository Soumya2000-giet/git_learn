const express = require('express')

const e_router = express.Router()

const auth = require('../middlewares/auth')

 const e_controller = require('../controllers/expense_controller')



e_router.post('/addExpense',auth.user_auth ,e_controller.addExpense)

e_router.get('/getExpense',auth.user_auth ,e_controller.getExpense)

e_router.get('/getExpensePagination',auth.user_auth ,e_controller.getExpense_pagination)

e_router.get('/downloadExpenses',auth.user_auth,e_controller.downloadExpense)


e_router.get('/premium/leaderboard',e_controller.getSortedExpense)


e_router.get('/editExpense/:id',auth.user_auth,e_controller.editExpense)


e_router.delete('/deleteExpense/:id',auth.user_auth,e_controller.deleteExpense)







module.exports=e_router

