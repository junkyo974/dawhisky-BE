const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const QueController = require("../controllers/que.controller");
const queController = new QueController();

//줄서기 요청
router.post("/table/:store_id", authMiddleware, queController.createQue);
//줄서기 수정
router.put("/table/:store_id", authMiddleware, queController.updateQue);
//줄서기 삭제
router.delete("/table/:store_id", authMiddleware, queController.deleteQue);

module.exports = router;
