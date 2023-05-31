const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const QueController = require("../controllers/que.controller");
const queController = new QueController();

//줄서기 요청들 조회
router.get("/", authMiddleware, queController.getQue);

//내 줄서기 현황 조회
router.get("/:store_id", authMiddleware, queController.getMyQue);

//줄서기 요청
router.post("/:store_id", authMiddleware, queController.createQue);
//줄서기 수정
router.put("/:store_id", authMiddleware, queController.updateQue);
//줄서기 삭제
router.delete("/:store_id", authMiddleware, queController.deleteQue);

module.exports = router;
