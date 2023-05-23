const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const MapController = require("../controllers/map.controller");
const mapController = new MapController();

router.get("/", mapController.getMap);

module.exports = router;
