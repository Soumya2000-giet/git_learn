const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password : '123456',
    database : 'bus_booking'
})
connection.connect((err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log("connection has been created")
})

module.exports = connection

