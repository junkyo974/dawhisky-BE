const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

// PUT: 위스키 좋아요
router.put("/:whisky_id", likeController.whiskyLikes);

// PUT: 스토어 좋아요
router.put("/:store_id", likeController.storeLikes);

module.exports = router;
