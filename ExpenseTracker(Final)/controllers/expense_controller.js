const db = require('../utils/connection')

const Expense = require('../models/expense_model')

const User = require('../models/user_model')

const { fn, col } = require("sequelize")


const {err_response, correctResponse} = require('../utils/response_handler')
const { where } = require('sequelize')


const addExpense = async (req,res)=>{

    const {amount, desc ,  expense_type} = req.body
    const user = req.user

try {
    const result = await Expense.create({
        amount : amount,
        desc : desc,
        expense_type :  expense_type,
        userId : user.id
    })
    correctResponse(res,result)
}


 catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into Expenses table"})
    }
}

const getExpense = async(req, res)=>{

    const user = req.user
    try{
        const result = await Expense.findAll({
  where: { userId: user.id }
})

        correctResponse(res,result)
    }

    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to fetch from Expenses table"})
    }
}

const getSortedExpense = async (req, res) => {
    try {
        const result = await User.findAll({
            attributes: [
                "id",
                "username",
                [fn("SUM", col("expenses.amount")), "totalExpense"]
            ],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ["user.id"],
            order: [[fn("SUM", col("expenses.amount")), "DESC"]]
        });

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching leaderboard" });
    }
}




const deleteExpense = async(req, res)=>{
    const {id }= req.params
    const user = req.user
        
    try{
        const result = await Expense.destroy({
        where : {
            id : id,
            userId: user.id 
        },
    })
    if(!result){
        err_response(res, {StatusCode : 500,message : `unable to find expense with id ${id}`})
    }
     correctResponse(res,result)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to delete data from Expenses table"})
    }
}

const editExpense = async (req,res)=>{
    const {amount , desc, expense_type}  = req.body

    const {id} =req.params

    try{
         const Expense = await Expense.findByPk(id)

         if(!Expense){
             err_response(res, {StatusCode : 500,message : `unable to find Expense with id ${id}`})
         }
         Expense.amount = amount
         Expense.desc = desc
         Expense.expense_type =  expense_type
         const result = await Expense.save()
          correctResponse(res,result)
    }
    catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to update Expense table "})
    }
   

   
    
}

module.exports ={
    addExpense,
    getExpense,
    deleteExpense,
    editExpense,
    getSortedExpense
}

