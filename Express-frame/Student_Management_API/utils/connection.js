const mysql = require('mysql2')


const connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password : '123456',
    database : 'stud_management'
})

connection.connect((err)=>{
    if(err){
        console.log(`connection failed due to ${err}`)
        return
    }
    console.log('connection successful')

    const query = `create table IF NOT EXISTS Students( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    age INT
    )`

    connection.execute(query,(err)=>{
        if(err){
            console.log(`error in creating table students ${err}`)
        }

        console.log('successfully created table students')
    })
})


module.exports = connection