const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const uploadImage = require("../modules/whisky_photo.js");
const WhiskyController = require("../controllers/whisky.controller");

const whiskyController = new WhiskyController();

//위스키 검색
router.get("/search/:keyword", whiskyController.searchWhisky);

//위스키 인기검색 조회
router.get("/trending", whiskyController.whiskyTrending);

//위스키 초보자 추천 조회
router.get("/beginner", whiskyController.whiskyBeginner);

//위스키 전체조회 + 필터 ex)localhost:3000/api/whisky/?page=1&pageSize=30&like=y&country=Scotland&type=Single Malt Whisky&region=Islay (모든값 필수아님)
router.get("/", whiskyController.paginatedWhiskies);

//위스키 상세조회+검색시 조회: 쿼리로 ex)localhost:3000/api/whisky/:whisky_id/?search=y
router.get("/:whisky_id", whiskyController.whiskyDetail);

//위스키 보유 스토어 조회
router.get("/store/:whisky_id", whiskyController.whiskyStore);

//위스키 코멘트 조회
router.get("/comment/:whisky_id", whiskyController.whiskyComment);

// 위스키정보 생성
router.post(
  "/",
  uploadImage.single("whisky_photo"),
  authMiddleware,
  whiskyController.createWhisky
);

//위스키정보 수정
router.put(
  "/:whisky_id",
  uploadImage.single("whisky_photo"),
  authMiddleware,
  whiskyController.updateWhisky
);
//위스키정보 삭제
router.delete("/:whisky_id", authMiddleware, whiskyController.deleteWhisky);

module.exports = router;
