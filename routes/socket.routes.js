const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const SocketController = require("../controllers/socket.controller");
const socketController = new SocketController();

router.get("/", socketController.seat);
// router.get("/:post_id", authMiddleware, socketController.seat);

module.exports = router;
