const express = require("express");
const router = express.Router();

const EmailController = require("../controllers/email.controller.js");
const eamilController = new EmailController();

// POST: 메일 발송
router.post("/send", eamilController.send);

// POST: 메일 중복 검증
router.post("/checkEmail", eamilController.checkEmail);

module.exports = router;
