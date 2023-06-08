const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("express-async-errors");
const socket = require("socket.io");
const http = require("http");
const chatServer = http.createServer(app);
const io = socket(chatServer);
const chatPort = 3001;
const cors = require("cors");
const { host, sentry } = require("./config/config");
const port = host.port;
const errorHandler = require("./middlewares/error-handler");
const Sentry = require("@sentry/node");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// sentry
Sentry.init({
  dsn: sentry.dsn,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

// cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://52.78.56.220:3000",
      "https://www.dawhisky.com",
    ],
    credentials: "true",
    // cors options
  })
);

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

// errorHandler
app.use(errorHandler);

// chat

app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));
// const SocketController = require("./controllers/socket.controller");
// const socketController = new SocketController();

io.on("connection", (socket) => {
  socket.on("newUser", (name, room) => {
    console.log(`${name}님이 ${room}에 접속하셨습니다.`);
    socket.name = name;
    socket.room = room;
    socket.join(room);

    io.to(socket.room).emit("update", {
      type: "connect",
      name: "POTATO MASTER",
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

// app.get("/api/socket", (req, res) => {
//   try {
//     io.on("connection", (socket) => {
//       // 새로운 사용자 접속 처리
//       socket.on("newUser", socketController.handleNewUser(io, socket));

//       // 메시지 처리
//       socket.on("message", socketController.handleMessage(io, socket));

//       // 연결 종료 처리
//       socket.on("disconnect", socketController.handleDisconnect(io, socket));
//     });
//     res.status(200).json({ message: "소켓서버 접속에 성공하였습니다." });
//   } catch {
//     res.status(400).json({
//       errorMessage: "소켓 망함",
//     });
//   }
// });

// swagger
app.use("/api/swag", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

chatServer.listen(chatPort, () => {
  console.log(`running http://localhost:${chatPort}`);
});

module.exports = app;
