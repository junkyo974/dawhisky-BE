const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const MapController = require("../controllers/map.controller");
const mapController = new MapController();

//스토어불러오기
router.get("/store", mapController.getStore);

module.exports = router;
