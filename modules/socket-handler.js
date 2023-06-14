const mysql = require("mysql");
// const QueService = require("../services/que.service");
// const queService = new QueService();

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
    socket.on("enter", async (store_id) => {
      console.log(`위스키바 ${store_id}님이 접속하셨습니다.`);
      socket.room = store_id;
      socket.join(store_id);

      // MySQL 테이블 변경 사항 감지
      const watchTableChanges = () => {
        const query = `SELECT * FROM Ques WHERE store_id = ${store_id}`;
        connectionMysql.query(query, (err, rows) => {
          if (err) {
            console.error("Error in watching table changes:", err);
            return;
          }

          // 변경된 데이터를 클라이언트에게 전송
          io.to(socket.room).emit("getQueData", rows);
          console.log("데이터전송 체크용");

          // 일정 시간 간격으로 변경 사항 감지
          setTimeout(watchTableChanges, 3600000);
        });
      };

      // 초기 테이블 데이터 감지 시작
      watchTableChanges();
    });
  });
};

module.exports = socketHandler;
