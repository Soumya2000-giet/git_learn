const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    if (req.url === '/'){

        fs.readFile("demo_req.txt", (error, data)=>{
            if(error){
                console.log(error)
            }
            res.setHeader('Content-Type', 'text/html')
        res.end(`
            <form action='/message' method='POST'>
            <label>${data}</label>
            <input type = 'text' name='username'></input><br>
            <button type='submit'>Add</button>
            </form>`)
        })
        
    }
    else if (req.url === '/message'){
        const data_received = [];
        req.on('data',(chunks)=>{
            console.log(chunks)
            data_received.push(chunks)
        })
        req.on('end',()=>{
            const comined_buffer = Buffer.concat(data_received)
            const string__data = comined_buffer.toString()
            const actual_data = string__data.split('=')[1]
            console.log(actual_data)

            fs.writeFile("demo_req.txt", actual_data, (error)=>{
                if(error){
                    console.log(error)
                }
                res.statusCode = 302
                res.setHeader('Location', '/')
                res.end()
            })
        })

    }
})

server.listen(3000,()=>{
    console.log("servre is running")
})



