const db = require('../Utils/connection2')
const {errResponse, correctResponse} = require('../utils/response_controller')

const add_bus = (req,res)=>{
    const {busNumber,totalSeats,availableSeats} = req.body

    const query = 'insert into buses(busNumber, totalSeats, availableSeats) values(?,?,?)'

    db.execute(query,[busNumber, totalSeats, availableSeats],(err,result)=>{
        if(err){
            console.log(err)
            db.end()
            return errResponse(res,{StatusCode : 500, mesaage : "error in adding bus"})
           
        }

        console.log("data insertion successful into buses table")
        return correctResponse(res,result)
    })


}


const get_bus = (req,res)=>{
    const {seats} = req.params

    const query = 'select * from buses where availableSeats > ?'

    db.execute(query,[seats],(err, result)=>{
        if(err){
            db.end()
            return errResponse(res,{StatusCode : 500, mesaage : "error in getting buses details"})
            
        }
        return correctResponse(res,result)
    })
}


module.exports = {
    add_bus,
    get_bus
}



