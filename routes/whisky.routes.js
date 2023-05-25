const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const uploadImage = require("../modules/whisky_photo.js");
const WhiskyController = require("../controllers/whisky.controller");

const whiskyController = new WhiskyController();

//위스키 전체조회
router.get("/", whiskyController.allWhisky);

//위스키 상세조회
router.get("/:whisky_id", whiskyController.whiskyDetail);

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
