
const Express = require('express')

const app = Express();

const adminrouter = require('./routes/admin')

const shoprouter = require('./routes/shop')

app.use('/admin',adminrouter)

app.use('/shop',shoprouter)

app.use((req, res, next)=>{
    res.status(404).send('<h1>status not found</h1>')
})


app.listen(3000,()=>{
    console.log("server is running")
})