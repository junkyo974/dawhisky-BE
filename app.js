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
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger-output");

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

// 나중에 쓸까 말까 고민
// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

// 센트리로 에러 핸들러 구성
// app.use(Sentry.Handlers.errorHandler());

// chat
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

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

  // socket.on("message read", (messageId) => {
  //   const message = {
  //     id: messageId,
  //     read: true,
  //   };
  //   io.emit("message read", message);
  // });
});

// cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://52.78.56.220:3000",
    ],
    credentials: "true",
    // cors options
  })
);

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);
// app.get("/", (req, res) => {
//   res.send("CD성공!!!! 찐막");
// });

// errorHandler
app.use(errorHandler);

// swagger
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

// chatServer.listen(chatPort, () => {
//   console.log(`running http://localhost:${chatPort}`);
// });

module.exports = app;
