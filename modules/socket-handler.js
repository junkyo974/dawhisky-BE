const mysql = require("mysql");
const QueService = require("../services/que.service");
const queService = new QueService();

const socketHandler = (io) => {
  const connectionMysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connectionMysql.connect((err) => {
    if (err) {
      console.error("MySQL connection failed:", err);
      return;
    }
    console.log("Connected to MySQL");
  });

  // 소켓 연결
  io.on("connection", (socket) => {
    socket.on("enter", async (name, store_id) => {
      console.log(`${name}님이 ${store_id}에 접속하셨습니다.`);
      socket.name = name;
      socket.room = store_id;
      socket.join(store_id);

      // MySQL 테이블 변경 사항 감지
      const watchTableChanges = () => {
        const query = "SELECT * FROM Ques";
        connectionMysql.query(query, (err, rows) => {
          if (err) {
            console.error("Error in watching table changes:", err);
            return;
          }

          // 변경된 데이터를 클라이언트에게 전송
          io.to(socket.room).emit("재홍님 보이시나요", rows);
          console.log("잘되고있지?");

          // 일정 시간 간격으로 변경 사항 감지
          setTimeout(watchTableChanges, 6000);
        });
      };

      // 초기 테이블 데이터 감지 시작
      watchTableChanges();

      try {
        const getQue = await queService.findAllQue(store_id);

        io.to(socket.room).emit("getQueData", getQue);
        console.log("잘 보내짐?", getQue);
      } catch (err) {
        console.log("점주 줄서기 socket 실패", err);
      }
    });
  });
};

module.exports = socketHandler;
