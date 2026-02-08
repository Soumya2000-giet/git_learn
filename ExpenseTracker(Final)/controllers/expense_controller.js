const db = require('../utils/connection')

const Expense = require('../models/expense_model')

const User = require('../models/user_model')

const { fn, col } = require("sequelize")


const {err_response, correctResponse} = require('../utils/response_handler')
const { where } = require('sequelize')
const sequelize = require('../utils/connection')


const addExpense = async (req,res)=>{

    const {amount, desc ,  expense_type} = req.body
    const user = req.user

    const t = await sequelize.transaction()
try {
    const result = await Expense.create({
        amount : amount,
        desc : desc,
        expense_type :  expense_type,
        userId : user.id
    }, {transaction : t})

    const total_expense = Number(user.total_expense) + Number(amount);

    await User.update(
        {total_expense},
            {
                where :{
                    id : user.id
                },
                transaction : t
            }, 
    )
    t.commit()
    correctResponse(res,result)
}


 catch(err){
        console.log(err)
        t.rollback()
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


const getExpense_pagination = async(req, res)=>{

    const user = req.user

    const page = parseInt(req.query.page) || 1;

    console.log(`items per page ${req.query.limit}`)

    const ITEMS_PER_PAGE = parseInt(req.query.limit) || 1;

    
    
    try{

        const total_expense = await Expense.count({where :{ userId: user.id } })
        const result = await Expense.findAll({
        where: { userId: user.id },
        offset : (page -1) * ITEMS_PER_PAGE,
        limit : ITEMS_PER_PAGE,
        order: [['createdAt', 'DESC']]
        })

        // correctResponse(res,result)
        return res.status(200).json({
                                        data: result,
                                        currentPage : page,
                                        hasNextPage : ITEMS_PER_PAGE*page < total_expense,
                                        nextPage : page + 1,
                                        hasPreviousPage : page >1,
                                        previousPage : page -1 ,
                                        lastPage : Math.ceil(total_expense/ITEMS_PER_PAGE),
                                        status: true,
                                        });
    }

    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "Unable to fetch expenses with pagination"})
    }
}



// const getSortedExpense = async (req, res) => {
//     try {
//         const result = await User.findAll({
//             attributes: [
//                 "id",
//                 "username",
//                 [fn("SUM", col("expenses.amount")), "totalExpense"]
//             ],
//             include: [
//                 {
//                     model: Expense,
//                     attributes: []
//                 }
//             ],
//             group: ["user.id"],
//             order: [[fn("SUM", col("expenses.amount")), "DESC"]]
//         });

//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Error fetching leaderboard" });
//     }
// }


const getSortedExpense = async (req, res) => {
    try {
        const result = await User.findAll({
            attributes: [
                "username",
                "total_expense"
            ],
            order: [["total_expense", "DESC"]]
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
    const t = await sequelize.transaction()
        
    try{
        const result = await Expense.destroy({
        where : {
            id : id,
            userId: user.id 
        },
        transaction : t
    })
    if(!result){
        err_response(res, {StatusCode : 500,message : `unable to find expense with id ${id}`})
    }
    t.commit()
     correctResponse(res,result)
    }
    catch(err){
        console.log(err)
        t.rollback()
         err_response(res, {StatusCode : 500,message : "unable to delete data from Expenses table"})
    }
}

const editExpense = async (req,res)=>{
    const {amount , desc, expense_type}  = req.body

    const {id} =req.params
    const t = await sequelize.transaction()

    try{
         const Expense = await Expense.findByPk(id)

         if(!Expense){
             err_response(res, {StatusCode : 500,message : `unable to find Expense with id ${id}`})
         }
         Expense.amount = amount
         Expense.desc = desc
         Expense.expense_type =  expense_type
         const result = await Expense.save({transaction : t})
         t.commit()
          correctResponse(res,result)
    }
    catch(err){
        console.log(err)
        t.rollback()
         err_response(res, {StatusCode : 500,message : "unable to update Expense table "})
    }
   

   
    
}

module.exports ={
    addExpense,
    getExpense,
    deleteExpense,
    editExpense,
    getSortedExpense,
    getExpense_pagination
}

