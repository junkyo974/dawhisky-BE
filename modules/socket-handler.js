const QueService = require("../services/que.service");
const queService = new QueService();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("enter", async (name, store_id) => {
      console.log(`${name}님이 ${store_id}에 접속하셨습니다.`);
      socket.name = name;
      socket.room = store_id;
      socket.join(store_id);

      try {
        const getQue = await queService.findAllQue(store_id);

        io.to(socket.room).emit("getQueData", getQue);
        console.log("잘보내짐?", getQue);
      } catch (err) {
        console.log("점주 줄서기 socket 실패", err);
      }
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
