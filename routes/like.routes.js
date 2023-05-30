const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

router.put(
  "/whisky/:whisky_id",
  authMiddleware,
  likeController.whiskyLikeToggle
);

router.put("/store/:store_id", authMiddleware, likeController.storeLikeToggle);

module.exports = router;
