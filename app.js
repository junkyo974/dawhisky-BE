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
const SocketController = require("./controllers/socket.controller");
const socketController = new SocketController();

io.on("connection", (socket) => {
  // 새로운 사용자 접속 처리
  socket.on("newUser", (name, room) => {
    socketController.handleNewUser(io, socket, name, room);
  });

  // 메시지 처리
  socket.on("message", (data) => {
    socketController.handleMessage(io, socket, data);
  });

  // 연결 종료 처리
  socket.on("disconnect", () => {
    socketController.handleDisconnect(io, socket);
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
