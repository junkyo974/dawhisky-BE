const fs = require("fs");
const mysql = require("mysql2");

const connectionMysql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const socketHandler = (io) => {
  connectionMysql.connect((err) => {
    if (err) {
      console.error("MySQL connection failed:", err);
      return;
    }
    console.log("Connected to MySQL");
  });

  io.on("connection", (socket) => {
    socket.on("enter", async (store_id) => {
      console.log(`위스키바 store_id:${store_id} 접속 완료`);
      socket.room = store_id;
      socket.join(store_id);

      fs.readFile("./trigger.sql", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        connectionMysql.query(
          `CREATE TRIGGER trigger_name AFTER INSERT, UPDATE, DELETE ON Ques FOR EACH ROW BEGIN SELECT * FROM Ques WHERE ${store_id} = NEW.${store_id}; END;`,
          (error, results) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(results);

            console.log("Trigger created successfully");
          }
        );
      });

      const watchTableChanges = () => {
        const query = `SELECT * FROM Ques WHERE store_id = ${store_id}`;
        connectionMysql.query(query, (err, rows) => {
          if (err) {
            console.error("Error in watching table changes:", err);
            return;
          }

          io.to(socket.room).emit("getQueData", rows);
          console.log("que DB 전송 완료");

          setTimeout(watchTableChanges, 3600000);
        });
      };

      watchTableChanges();
    });
  });
};

module.exports = socketHandler;
