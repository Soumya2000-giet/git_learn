const db = require('../Utils/connection2')

const user_mod = require('../models/User_model')

const bus_mod = require('../models/bus_model')

const booking_mod = require('../models/booking_model')

const {errResponse, correctResponse} = require('../utils/response_controller')



const add_user = async (req,res)=>{

    const {name, email} = req.body
    try{
    const result = await user_mod.create({
        name : name ,
        email : email
    })
    
    correctResponse(res,result)
    }
    catch(err){
        console.log(err)
        errResponse(res,{StatusCode : 500, mesaage : "error in inserting to users table"})
    }
   
}

const get_user = async(req,res)=>{

    try{
    const result = await user_mod.findAll()

    if(!result || result.length===0){
         return errResponse(res, {StatusCode : 500,message : `no users available`})
    }
    correctResponse(res,result)
}
catch(err){
    console.log(err)
    errResponse(res,{StatusCode : 500, mesaage : "error in fetching from  users table"})
}
    
}


const add_booking = async(req, res)=>{
    const {seatNumber, UserId, BusId} = req.body
    try{
    const result  = await booking_mod.create({
        seatNumber: seatNumber,
        UserId : UserId,
        BusId : BusId
    })

    correctResponse(res,result)

    }

    catch(err){
         console.log(err)
        errResponse(res,{StatusCode : 500, mesaage : "error in inserting to booking table"})
    }
}


const get_user_booking = async(req, res)=>{
    const user_id = req.params.id 

    try{
    const userBooking = await booking_mod.findAll({
        where : {UserId : user_id},

        include :{
            model : bus_mod,
            attributes :  ['busNumber']
        }
    })

    correctResponse(res, userBooking)
}



    catch(error){
        errResponse(res,{StatusCode : 500, mesaage : "error in fetching user bookings"})

    }
}

module.exports = {
    add_user,
    get_user,
    add_booking,
    get_user_booking
}