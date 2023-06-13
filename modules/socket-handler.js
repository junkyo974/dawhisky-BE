const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("enter", (name, room) => {
      console.log(`${name}님이 ${room}에 접속하셨습니다.`);
      socket.name = name;
      socket.room = room;
      socket.join(room);

      io.to(socket.room).emit("update", {
        type: "connect",
        name: "WHISKY MASTER",
        message: `${name}님이 ${room}방에 접속하셨습니다.`,
      });
    });

    socket.on("message", (data) => {
      data.id = socket.id;
      data.name = socket.name;
      data.room = socket.room;
      console.log("서버2", data);
      socket.broadcast.to(socket.room).emit("update", data);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.name} 님이 나가셨습니다.`);
      io.to(socket.room).emit("update", {
        type: "disconnect",
        name: "POTATO MASTER",
        message: `${socket.name} 님이 나가셨습니다.`,
      });
    });
  });
};

module.exports = socketHandler;
