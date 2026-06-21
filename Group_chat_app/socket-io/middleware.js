
const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = (io) =>{
io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    console.log("Socket token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        socket.user = decoded;

        next();

    } catch (err) {

        console.log("Socket Verify Error:", err);
        console.log("Socket Verify Error Message:", err.message);

        next(new Error("Invalid Token"));
    }
});

}