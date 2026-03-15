const Express = require('express')
const router = Express.Router()
router.use(Express.urlencoded({ extended: true }))
const fs = require('fs')

router.get('/',(req, res, next)=>{

    fs.readFile('username.txt',(err, data)=>{
        if(err){
            console.log(err)
            data = "No Chat Exists"
        }
        res.send(`<h1>${data}</h1><form action = "/" method = "POST" onsubmit="document.getElementById(\'username\').value = localStorage.getItem(\'username\'); return true;"><input id="username" type="hidden" name="username"><input id="message" type="text" name="message"><button type="submit">Add</button></form>`);

    })
    
})

router.post('/', (req, res, next)=>{
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`,{flag :'a'},(err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
 module.exports= router