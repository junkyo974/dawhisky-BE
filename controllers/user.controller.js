const UserService = require("../services/user.service");
const axios = require("axios");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

class UserController {
  userService = new UserService();

  // test용 로컬 로그인
  login = async (req, res) => {
    const { email } = req.body;
    const user = await this.userService.findOneUserEmail(email);

    try {
      if (!user) {
        throw new Error("412/이메일 또는 패스워드를 확인해주세요.");
      }

      const userData = await this.userService.login(email);

      res.cookie(
        "authorization",
        `${userData.accessObject.type} ${userData.accessObject.token}`
      );

      res.cookie("refreshToken", `${userData.refreshObject.token}`);

      res.cookie("user", `${user.user_id}`);

      res.status(200).json({
        authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        refreshToken: `${userData.refreshObject.token}`,
        user: `${user.user_id}`,
        message: "로그인 되었습니다!",
      });
    } catch (error) {
      error.failedApi = "유저 로컬 로그인";
      throw error;
    }
  };

  //소셜 로그인
  kakaologin = async (req, res) => {
    const { code } = req.body;
    try {
      // Access token 가져오기
      const res1 = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params: {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_SECRET_KEY,
            code: code,
            redirect_uri: "https://dawhisky.com/loginOauth",
          },
        }
      );
      // Access token을 이용해 정보 가져오기
      const res2 = await axios.post(
        "https://kapi.kakao.com/v2/user/me",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            Authorization: "Bearer " + res1.data.access_token,
          },
        }
      );
      const data = res2.data;
      const email = data.kakao_account.email;
      const user = await this.userService.findOneUserEmail(email);

      if (!user) {
        const name = data.properties.nickname;

        await this.userService.signup(email, name);
        const userData = await this.userService.login(data.kakao_account.email);

        res.cookie(
          "authorization",
          `${userData.accessObject.type} ${userData.accessObject.token}`
        );

        res.cookie("refreshToken", `${userData.refreshObject.token}`);

        res.cookie("user", `${userData.user_id}`);

        res.status(200).json({
          authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
          refreshToken: `${userData.refreshObject.token}`,
          user: `${userData.user_id}`,
          message: "회원가입 되었습니다!",
        });
      } else {
        const userData = await this.userService.login(data.kakao_account.email);

        res.cookie(
          "authorization",
          `${userData.accessObject.type} ${userData.accessObject.token}`,
          { sameSite: "none", secure: true }
        );

        res.cookie("refreshToken", `${userData.refreshObject.token}`, {
          sameSite: "none",
          secure: true,
        });

        res.cookie("user", `${userData.user_id}`, {
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({
          authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
          refreshToken: `${userData.refreshObject.token}`,
          user: `${userData.user_id}`,
          message: "로그인 되었습니다!",
        });
      }
    } catch (error) {
      error.failedApi = "유저 소셜 로그인";
      throw error;
    }
  };

  logout = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const logoutData = await this.userService.logout(user_id);
      res.clearCookie("authorization", "refreshtoken", "user");
      res.status(200).json(logoutData);
      console.log(logoutData);
      delete res.locals.user;
    } catch (error) {
      error.failedApi = "유저 로그아웃";
      throw error;
    }
  };

  deleteUser = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const deleteUser = await this.userService.deleteUser(user_id);
      res.clearCookie("authorization", "refreshtoken", "user");
      res.status(200).json(deleteUser);
      delete res.locals.user;
    } catch (error) {
      error.failedApi = "유저 탈퇴";
      throw error;
    }
  };
}

module.exports = UserController;
