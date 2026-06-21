
const { Server } = require('socket.io');
const auth = require('./middleware');

const chatHandler = require('./handler/chat')



module.exports =(server) =>{

    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });


    auth(io)




io.on("connection", (socket) => {

    chatHandler(socket)

});

return io

}