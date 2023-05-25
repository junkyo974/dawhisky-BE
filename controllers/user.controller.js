const UserService = require("../services/user.service");
const Axios = require("axios");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { email, name, age, gender, password, authCode } = req.body;
    const redisGetResult = await redisClient.get(email);

    try {
      if (authCode !== redisGetResult) {
        return res.status(412).json({
          errorMessage: "인증코드가 일치하지 않습니다",
        });
      }

      if (password.length < 4) {
        res.status(412).json({
          errorMessage: "패스워드 형식이 일치하지 않습니다.",
        });
        return;
      }

      if (password.includes(age) || password.includes(name)) {
        res.status(412).json({
          errorMessage: "패스워드에 이름 혹은 생일이 포함되어 있습니다.",
        });
        return;
      }
      const signupData = await this.userService.signup(
        email,
        name,
        age,
        gender,
        password
      );
      res.status(200).json(signupData);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.userService.findOneUser(email);

    try {
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: "이메일 또는 패스워드를 확인해주세요.",
        });
        return;
      }

      const userData = await this.userService.login(email);

      res.cookie(
        "authorization",
        `${userData.accessObject.type} ${userData.accessObject.token}`
      );

      res.cookie(
        "refreshToken",
        `${userData.refreshObject.type} ${userData.refreshObject.token}`
      );

      res.cookie("user", `${email}`);

      res.status(200).json({
        authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        refreshToken: `${userData.refreshObject.type} ${userData.refreshObject.token}`,
      });
    } catch (err) {
      console.error("로그인 에러 로그", err);
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };

  logout = async (req, res) => {
    const { user_id } = req.params;

    try {
      const logoutData = await this.userService.logout(user_id);
      res.clearCookie("authorization", "refreshToken");
      delete res.locals.user;
      res.status(200).json(logoutData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };
}

module.exports = UserController;
