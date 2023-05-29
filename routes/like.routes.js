const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

// PUT: 스토어 좋아요
router.put("/store/:store_id", authMiddleware, likeController.storeLikes);

// PUT: 위스키 좋아요
router.put("/whisky/:whisky_id", authMiddleware, likeController.whiskyLikes);

module.exports = router;
