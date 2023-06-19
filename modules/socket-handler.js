const mysql = require("mysql2");

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

//여기서부터

// // 트리거 삭제 쿼리
// const dropTriggerQuery = `DROP TRIGGER IF EXISTS trigger_name`;

// // 트리거 삭제 쿼리 실행
// connectionMysql.query(dropTriggerQuery, (err, results) => {
//   if (err) {
//     console.error("Error dropping trigger:", err);
//     return;
//   }
// });
// // Ques 테이블에 대한 트리거 이벤트를 감지하는 함수
// const watchTriggerEvent = () => {
//   const triggerQuery = `
//   CREATE TRIGGER trigger_name AFTER UPDATE ON Ques
//   FOR EACH ROW
//   BEGIN
//     DECLARE newData VARCHAR(255);
//     DECLARE response VARCHAR(255);

//     SET newData = NEW.store_id;

//     CALL sendDataToExternalSystem(newData, response);

//   END
//   `; // 트리거 생성 쿼리

// //프로시저 삭제 쿼리
// const dropProcedureQuery = `DROP PROCEDURE IF EXISTS sendDataToExternalSystem`;

// // 프로시저 삭제 쿼리 실행
// connectionMysql.query(dropProcedureQuery, (err, results) => {
//   if (err) {
//     console.error("Error dropping procedure:", err);
//     return;
//   }
// });

//   const procedureQuery = `
//   CREATE PROCEDURE sendDataToExternalSystem(newData VARCHAR(255), OUT response VARCHAR(255))
// BEGIN
//   DECLARE url VARCHAR(255);
//   DECLARE command VARCHAR(500);

//   SET url = 'https://jjmdev.site';
//   SET command = CONCAT('curl -X POST -H "Content-Type: application/json" -d ''{"data":"', newData, '"}'' ', url);

//   -- 커맨드 실행
//   SET @output = sys_exec(command);

//   -- 실행 결과를 response 변수에 할당
//   SET response = CONCAT('Response from external system:', @output);
// END
// `; // 프로시저 생성 쿼리

//   // 트리거 생성 쿼리 실행
//   connectionMysql.query(triggerQuery, (err, results) => {
//     if (err) {
//       console.error("Error creating trigger:", err);
//       return;
//     }
//     console.log("Trigger created successfully");
//   });

//   connectionMysql.query(procedureQuery, (err, results) => {
//     if (err) {
//       console.error("Error creating procedure:", err);
//       return;
//     }
//     console.log("Procedure created successfully");
//   });

//   // 외부 시스템과의 통신을 수행하는 함수
//   const externalSystemProcedure = (data) => {
//     // 외부 시스템과의 통신 코드 작성
//     console.log("Sending data to external system:", data);
//     // 이 부분에서 외부 시스템과의 통신을 위한 코드를 작성해야 합니다.
//     axios
//       .post("https://jjmdev.site", { data })
//       .then((response) => {
//         console.log("Data sent successfully to external system");
//         // 외부 시스템과의 통신 성공 후 수행할 작업
//       })
//       .catch((error) => {
//         console.error("Error sending data to external system:", error);
//         // 외부 시스템과의 통신 실패 시 수행할 작업
//       });
//   };
// };

// // 트리거 이벤트 감지 함수 호출
// watchTriggerEvent();

//여기까지

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("enter", (store_id) => {
      console.log(`위스키바 store_id:${store_id} 접속 완료`);
      socket.room = store_id;
      socket.join(store_id);

      const query = `SELECT Ques.*, (
        SELECT name
        FROM Users
        WHERE user_id = Ques.user_id
        ) AS user_name
        FROM Ques
        WHERE store_id = ${store_id}
        ORDER BY createdAt DESC
        `;

      connectionMysql.query(query, (err, rows) => {
        if (err) {
          console.error("Error in watching table changes:", err);
          return;
        }

        io.to(socket.room).emit("getQueData", rows);
        console.log("que DB 전송 완료");
      });

      // 클라이언트 연결 해제
      socket.on("disconnect", () => {
        console.log("클라이언트와의 연결이 해제되었습니다.");
      });

      const watchTableChanges = () => {
        const query = `SELECT Ques.*, (
        SELECT name
        FROM Users
        WHERE user_id = Ques.user_id
        ) AS user_name
        FROM Ques
        WHERE store_id = ${store_id}
        ORDER BY createdAt DESC
        `;
        connectionMysql.query(query, (err, rows) => {
          if (err) {
            console.error("Error in watching table changes:", err);
            return;
          }

          io.to(socket.room).emit("getQueData", rows);
          console.log("que DB 전송 완료");

          setTimeout(watchTableChanges, 15000);
        });
      };

      watchTableChanges();
    });
  });
};

module.exports = socketHandler;
