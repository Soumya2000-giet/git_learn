module.exports = (socket) =>{

console.log("User connected:", socket.id);
      console.log(
        `User ${socket.user.username} connected`
    );

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);
          console.log(
        `User ${socket.user.username} disconnected`
    );
    });
}