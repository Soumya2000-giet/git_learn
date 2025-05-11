const db = require('../Utils/connection2')

const add_user = (req,res)=>{

    const {name, email} = req.body
    const query = 'insert into users (name,email) values(?,?)'

    db.execute(query,[name, email], (err)=>{
        if (err){
        console.log(err)
        res.status(500).send('error in inserting to userss table')
        db.end()
        return
        }
        res.status(200).send(`users wih name ${name} succccessfully added into users table`)
    })
}

const get_user = (req,res)=>{
    const query = 'select * from users'

    db.execute(query,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("error in fetching users")
            db.end()
            return
            
        }
        console.log("successfully fetched students")
        res.status(200).send(`${JSON.stringify(result)}`)

    })
}

module.exports = {
    add_user,
    get_user
}