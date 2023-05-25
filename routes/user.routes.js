const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");
const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

// POST: 회원가입
router.post("/signup/user", userController.signup);

// POST: 로그인;
router.post("/login/user", userController.login);

// DELETE: 로그아웃
router.delete("/logout/:user_id", authMiddleware, userController.logout);

// DELETE: 회원 탈퇴
// router.delete('/api/auth/signout/user', userController.deleteUser);

module.exports = router;
