const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");
const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

// POST: 로컬 로그인
router.post("/login/user", userController.login);
// GET: 카카오 로그인;
router.get("/login/user", userController.kakaologin);

// DELETE: 로그아웃
router.delete("/logout/user", authMiddleware, userController.logout);

// DELETE: 회원 탈퇴
router.delete("/signout/user", authMiddleware, userController.deleteUser);

module.exports = router;
