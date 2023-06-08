class SocketController {
  seat = async (req, res) => {
    try {
      res.status(200).json({ message: "소켓서버 접속에 성공하였습니다." });
    } catch (err) {
      res.status(400).json({
        errorMessage: "소켓서버 접속에 실패하였습니다.",
      });
    }
  };

  static handleNewUser(io) {
    return (socket, name, room) => {
      console.log(`${name}님이 ${room}에 접속하셨습니다.`);
      socket.name = name;
      socket.room = room;
      socket.join(room);

      io.to(socket.room).emit("update", {
        type: "connect",
        name: "POTATO MASTER",
        message: `${name}님이 ${room}방에 접속하셨습니다.`,
      });
    };
  }

  static handleMessage(io) {
    return (socket, data) => {
      data.id = socket.id;
      data.name = socket.name;
      data.room = socket.room;
      console.log("서버2", data);
      socket.broadcast.to(socket.room).emit("update", data);
    };
  }

  static handleDisconnect(io) {
    return (socket) => {
      console.log(`${socket.name} 님이 나가셨습니다.`);
      io.to(socket.room).emit("update", {
        type: "disconnect",
        name: "POTATO MASTER",
        message: `${socket.name} 님이 나가셨습니다.`,
      });
    };
  }
}

module.exports = SocketController;
