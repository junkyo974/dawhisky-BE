const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

//마이페이지
router.get("/user", mypageController.mypage);

//점주페이지
// router.get("/store", mypageController.storepage);

module.exports = router;
