const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const MapController = require("../controllers/map.controller");
const mapController = new MapController();

//*주의* HTTPS/로드밸런서/라우트 헬스체크 코드입니다
router.get("/", mapController.getMap);

//스토어불러오기
router.get("/store", mapController.getStore);

module.exports = router;
