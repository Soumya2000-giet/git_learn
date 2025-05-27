const db = require('../Utils/connection2')
const bus_model = require('../models/bus_model')
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


module.exports = {
    add_bus,
    get_bus
}



