const db = require('../Utils/connection2')

const add_bus = (req,res)=>{
    const {busNumber,totalSeats,availableSeats} = req.body

    const query = 'insert into buses(busNumber, totalSeats, availableSeats) values(?,?,?)'

    db.execute(query,[busNumber, totalSeats, availableSeats],(err)=>{
        if(err){
            console.log(err)
            res.status(500).send("error in adding bus")
            db.end()
            return
        }

        console.log("data insertion successful into buses table")
        res.status(200).send(`Bus with no ${busNumber} successfully added into buses table`)
    })


}


const get_bus = (req,res)=>{
    const {seats} = req.params

    const query = 'select * from buses where availableSeats > ?'

    db.execute(query,[seats],(err, result)=>{
        if(err){
            res.status(500).send('error in geeting bus')
            db.end()
            return
        }

        res.status(200).send(`${JSON.stringify(result)}`)
    })
}


module.exports = {
    add_bus,
    get_bus
}



