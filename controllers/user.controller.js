const UserService = require("../services/user.service");
const Axios = require("axios");
const redisClient = require("../utils/redis.js");
require("dotenv").config();
const axiosInstance = Axios.create({
  withCredentials: true,
});

class UserController {
  userService = new UserService();

  // test용 로컬 로그인
  login = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.userService.findOneUserEmail(email);

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

      res.cookie("refreshToken", `${userData.refreshObject.token}`);

      res.cookie("user", `${user.user_id}`);

      res.status(200).json({
        authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        refreshToken: `${userData.refreshObject.token}`,
        user: `${user.user_id}`,
      });
    } catch (err) {
      console.error("로그인 에러 로그", err);
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };

  //소셜 로그인
  kakaologin = async (req, res) => {
    const code = req.query.code;
    console.log("코드" + code);
    try {
      // Access token 가져오기
      const res1 = await axiosInstance.post(
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
            redirect_uri: "https://jjmdev.site/api/auth/login/user",
          },
        }
      );
      console.log("res1" + res1);
      // Access token을 이용해 정보 가져오기
      const res2 = await Axios.post(
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
      console.log("res2" + res2);
      if (!user) {
        const name = data.kakao_account.name;
        const birthyear = data.kakao_account.birthyear;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthyear;
        const gender = true;
        const password = "123456";

        if (age < 19) {
          return res
            .status(404)
            .json({ errorMessage: "19세 미만은 회원 가입이 불가능합니다." });
        }

        await this.userService.signup(email, name, age, gender, password);

        res.redirect("http://localhost:3000");
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

        res.cookie("user", `${user.user_id}`, {
          sameSite: "none",
          secure: true,
        });

        // res.json({
        //   authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        //   refreshToken: `${userData.refreshObject.token}`,
        //   user: `${user.user_id}`,
        // });
        res.redirect("http://localhost:3000");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: "로그인에 실패했습니다." });
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
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };

  deleteUser = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const deleteUser = await this.userService.deleteUser(user_id);
      res.clearCookie("authorization", "refreshtoken", "user");
      res.status(200).json(deleteUser);
      delete res.locals.user;
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "회원정보 삭제에 실패하였습니다." });
    }
  };
}

module.exports = UserController;
