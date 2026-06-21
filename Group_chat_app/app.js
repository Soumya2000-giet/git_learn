const express = require('express');
var Cors = require('cors');
const http = require('http');          
// const WebSocket = require('ws');  

require('dotenv').config();

const jwt = require("jsonwebtoken");


const { Server } = require('socket.io');


const app = express();

const SocketIo = require('./socket-io/index')
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

// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });


const io =SocketIo(server)



// store clients
const clients = new Set();

// io.use((socket, next) => {

//     const token = socket.handshake.auth.token;

//     console.log("Socket token:", token);
//     console.log("JWT Secret:", process.env.JWT_SECRET);

//     try {

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         console.log("Decoded:", decoded);

//         socket.user = decoded;

//         next();

//     } catch (err) {

//         console.log("Socket Verify Error:", err);
//         console.log("Socket Verify Error Message:", err.message);

//         next(new Error("Invalid Token"));
//     }
// });

// io.on("connection", (socket) => {

//     console.log("User connected:", socket.id);
//       console.log(
//         `User ${socket.user.username} connected`
//     );

//     socket.on("disconnect", () => {

//         console.log("User disconnected:", socket.id);
//           console.log(
//         `User ${socket.user.username} disconnected`
//     );
//     });

// });

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