const db = require('../Utils/connection2')
const bus_model = require('../models/bus_model')

const booking_mod = require('../models/booking_model')

const user_mod = require('../models/User_model')

const {errResponse, correctResponse} = require('../utils/response_controller')

const {Op} = require('sequelize')

const add_bus = async (req,res)=>{
    const {busNumber,totalSeats,availableSeats} = req.body

    try{
        const buses = await bus_model.create({
        busNumber : busNumber,
        totalSeats : totalSeats,
        availableSeats : availableSeats
    })
    correctResponse(res,buses)
    }
    catch(err){
        console.log(err)
        errResponse(res, {StatusCode : 500,message : "unable to add data into bus table"})
    }

}


const get_bus = async (req,res)=>{
    const {seats} = req.params


    try{
        const buses = await bus_model.findAll({
            where :{
                availableSeats:{ [Op.gt]: seats}
            }
        })
        if(!buses || buses.length === 0){
            return errResponse(res, {StatusCode : 500,message : `no buses avaialble with ${seats} available seats`})
        }
        correctResponse(res,buses)
    }

    catch(err){
        console.log(err)
        errResponse(res, {StatusCode : 500,message : "unable to fetch buses"})
    }

   
}


const get_bus_booking = async(req, res)=>{
    const bus_id = req.params.id 

    try{
    const busBooking = await booking_mod.findAll({
        where : {BusId : bus_id},

        include :{
            model : user_mod,
            attributes :  ['name', 'email']
        }
    })

    correctResponse(res, busBooking)
}



    catch(error){
        errResponse(res,{StatusCode : 500, mesaage : "error in fetching bus bookings"})

    }
}



module.exports = {
    add_bus,
    get_bus,
    get_bus_booking
}



