const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();
const uploadImage = require("../modules/biz_photo.js");

//마이페이지
router.get("/user", authMiddleware, mypageController.mypage);

//스토어상세조회
router.get("/store/:store_id", mypageController.storeMypage);

//스토어마이페이지수정
router.put(
  "/store",
  authMiddleware,
  uploadImage.array("biz_photo", 5),
  mypageController.UpdatestoreMypage
);

//스토어위스키 조회
router.get("/whisky/:store_id", mypageController.getStoreWhisky);

//스토어테이블 조회
router.get("/table/:store_id", mypageController.getStoreTable);

//점주페이지
// router.get("/store",authMiddleware, mypageController.storepage);

//스토어테이블 생성
router.post("/store/table", authMiddleware, mypageController.createTable);
//스토어테이블 수정
router.put("/store/table", authMiddleware, mypageController.updateTable);
//스토어테이블 삭제
router.delete("/store/table", authMiddleware, mypageController.deleteTable);

//스토어위스키 생성
router.post(
  "/store/whisky",
  authMiddleware,
  mypageController.createStoreWhisky
);

//스토어위스키수정
router.put(
  "/store/whisky/:storewhisky_id",
  authMiddleware,
  mypageController.updateStoreWhisky
);
//스토어위스키 삭제
router.delete(
  "/store/whisky/:storewhisky_id",
  authMiddleware,
  mypageController.deleteStoreWhisky
);

module.exports = router;
