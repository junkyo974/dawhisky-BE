const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const ReviewController = require("../controllers/review.controller");

const reviewController = new ReviewController();

//내가쓴 리뷰 조회
router.get("/:whisky_id/", authMiddleware, reviewController.getReview);

//리뷰등록
router.post("/:whisky_id/", authMiddleware, reviewController.createReview);
//리뷰수정
router.put("/:whisky_id", authMiddleware, reviewController.updateReview);
//리뷰삭제
router.delete("/:whisky_id", authMiddleware, reviewController.deleteReview);

module.exports = router;
