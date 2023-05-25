const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

//마이페이지
router.get("/user", authMiddleware, mypageController.mypage);

//점주페이지
// router.get("/store",authMiddleware, mypageController.storepage);

//스토어테이블 생성
router.post("/table", authMiddleware, mypageController.createTable);
//스토어테이블 수정
router.put("/table", authMiddleware, mypageController.updateTable);
//스토어테이블 삭제
router.delete("/table", authMiddleware, mypageController.deleteTable);

//스토어위스키 생성
router.post("/whisky", authMiddleware, mypageController.createStoreWhisky);

//스토어위스키수정
router.put(
  "/whisky/:storewhisky_id",
  authMiddleware,
  mypageController.updateStoreWhisky
);
//스토어위스키 삭제
router.delete(
  "/whisky/:storewhisky_id",
  authMiddleware,
  mypageController.deleteStoreWhisky
);

module.exports = router;
