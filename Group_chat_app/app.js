const express = require('express');
var Cors = require('cors');
const http = require('http');          
// const WebSocket = require('ws');       


const { Server } = require('socket.io');


const app = express();
app.use(Cors());

const db = require('./utils/connection');

const user_route = require('./routers/user_router');

const user_mod = require('./models/user_model');
const message_mod = require('./models/message_model');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

app.use('/user', user_route);


user_mod.hasMany(message_mod);
message_mod.belongsTo(user_mod);


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
// const wss = new WebSocket.Server({ server });



// store clients
const clients = new Set();

// wss.on('connection', (ws) => {
//     console.log("WebSocket connected");

//     clients.add(ws);

//     ws.on('close', () => {
//         console.log("WebSocket disconnected");
//         clients.delete(ws);
//     });
// });

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

// make available in controllers
// app.set("clients", clients);
app.set("io", io);

db.sync().then(() => {
    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch((err) => {
    console.log(err);
});