const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");
const StoreController = require("../controllers/store.controller.js");
const storeController = new StoreController();
const uploadImage = require("../modules/biz_photo.js");

// POST: 회원가입
router.post(
  "/signup/store",
  uploadImage.array("biz_photo", 5),
  storeController.signup
);

// POST: 로그인;
router.post("/login/store", storeController.login);

// DELETE: 로그아웃
router.delete("/logout/store", authMiddleware, storeController.logout);

// DELETE: 회원 탈퇴
router.delete("/signout/store", authMiddleware, storeController.deleteStore);

// // GET: 알림메시지
// router.get("/push", storeController.pushAlam);

module.exports = router;
