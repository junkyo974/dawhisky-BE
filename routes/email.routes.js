const express = require("express");
const router = express.Router();

const EmailController = require("../controllers/email.controller.js");
const eamilController = new EmailController();

// POST: 메일 발송
router.post("/send", eamilController.send);

module.exports = router;
