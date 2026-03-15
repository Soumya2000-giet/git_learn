const connection = require('../utils/connection')
const db = require('../utils/connection')


const add_student = (req,res)=>{

    const {email,name} = req.body
    const query = 'insert into students (email,name) values(?,?)'
   
    db.execute(query,[email, name],(err)=>{
        if(err){
            res.status(500).send("error in adding students")
            db.end()
            return 
        }
        console.log('student entry has been suscccessfully added')
        res.status(200).send(`student with name ${name} successfully added to table`)
    })
}

const update_student = (req,res)=>{
    const {id} = req.params
    const {name} = req.body


    const query = `update students set name =?  where id =?`

    db.execute(query,[name, id],(err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send(`error in upadating table for the id ${id}`)
            db.end()
            return
        }

        if (result.affectedRows===0){
            res.status(404).send(`no records found for the id ${id}`)
            return
        }
        res.status(200).send('user has been updated')
    })

}


const delete_student = (req,res)=>{
    const {id} = req.params

    const delete_query = 'delete from students where id = ?'

    db.execute(delete_query,[id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send(`error in deletion of student with id ${id}`)
            return
        }
        if(result.affectedRows===0){
            res.status(402).send(`sudent with id ${id} not exist`)
        }
        res.send(`user has been updated`)

    })
}
module.exports = {
    add_student,
    update_student,
    delete_student
}