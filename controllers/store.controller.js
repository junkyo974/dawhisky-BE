const StoreService = require("../services/store.service");
// const axios = require("axios");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

/// 최대 5장까지

class StoreController {
  storeService = new StoreService();

  signup = async (req, res) => {
    const { email, store, biz_number, biz_photo, password, authCode } =
      req.body;
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

      if (password.includes(store)) {
        res.status(412).json({
          errorMessage: "패스워드에 상호명이 포함되어 있습니다.",
        });
        return;
      }
      const signupData = await this.storeService.signup(
        email,
        store,
        biz_number,
        biz_photo,
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
    const store = await this.storeService.findOneUser(email);

    try {
      if (!store || password !== store.password) {
        res.status(412).json({
          errorMessage: "이메일 또는 패스워드를 확인해주세요.",
        });
        return;
      }

      const storeData = await this.userService.login(email);

      res.cookie(
        "authorization",
        `${storeData.accessObject.type} ${storeData.accessObject.token}`
      );

      res.cookie(
        "refreshToken",
        `${storeData.refreshObject.type} ${storeData.refreshObject.token}`
      );

      res.cookie("store", `${email}`);

      res.status(200).json({
        authorization: `${storeData.accessObject.type} ${storeData.accessObject.token}`,
        refreshToken: `${storeData.refreshObject.type} ${storeData.refreshObject.token}`,
      });
    } catch (err) {
      console.error("로그인 에러 로그", err);
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };

  logout = async (req, res) => {
    const { store_id } = req.params;

    try {
      const logoutData = await this.userService.logout(store_id);
      res.clearCookie("authorization", "refreshToken");
      delete res.locals.user;
      res.status(200).json(logoutData);
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };
}

module.exports = StoreController;
