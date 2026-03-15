const http = require('http')
const r_req = require('./routes')


const server = http.createServer(r_req)


server.listen(3000,()=>{
    console.log("servre is running")
})



