const { invalid } = require("joi");
const StoreService = require("../services/store.service");
// const axios = require("axios");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

/// 최대 5장까지

class StoreController {
  storeService = new StoreService();

  signup = async (req, res) => {
    const {
      email,
      store,
      biz_number,
      password,
      authCode,
      address,
      phone,
      notice,
      runtime,
    } = req.body;
    const biz_photos = req.files.map((files) => files.location);
    const biz_photo = JSON.stringify(biz_photos);
    const redisGetResult = await redisClient.get(email);
    const emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
    const passwordFilter = /^(?=.*\d)(?=.*[a-zA-Z]).{4,}$/.test(password);
    const authCodeFilter = /^\d{6}$/;

    try {
      if (!authCodeFilter) {
        return res.status(412).json({
          errorMessage: "인증코드는 6자리 숫자만 입력하세요",
        });
      }

      if (authCode !== redisGetResult) {
        return res.status(412).json({
          errorMessage: "인증코드가 일치하지 않습니다.",
        });
      }

      if (!emailFilter) {
        res.status(412).json({
          errorMessage: "이메일 형식이 일치하지 않습니다.",
        });
        return;
      }

      if (!passwordFilter) {
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

      if (!biz_photo) {
        return res.status(412).json({
          errorMessage: "사진을 올려주세요.",
        });
      }

      const signupData = await this.storeService.signup(
        email,
        store,
        biz_number,
        biz_photo,
        password,
        address,
        phone,
        notice,
        runtime
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
    const store = await this.storeService.findOneStoreEmail(email);

    try {
      if (!store || password !== store.password) {
        res.status(412).json({
          errorMessage: "이메일 또는 패스워드를 확인해주세요.",
        });
        return;
      }

      const storeData = await this.storeService.login(email);

      res.cookie(
        "authorization",
        `${storeData.accessObject.type} ${storeData.accessObject.token}`
      );

      res.cookie("refreshToken", `${storeData.refreshObject.token}`);

      res.cookie("store", `${store.store_id}`);

      res.status(200).json({
        authorization: `${storeData.accessObject.type} ${storeData.accessObject.token}`,
        refreshToken: `${storeData.refreshObject.token}`,
        store: `${store.store_id}`,
      });
    } catch (err) {
      console.error("로그인 에러 로그", err);
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };

  logout = async (req, res) => {
    const { store_id } = res.locals.store;

    try {
      const logoutData = await this.storeService.logout(store_id);
      res.clearCookie("authorization", "refreshToken", "store");
      res.status(200).json(logoutData);
      delete res.locals.store;
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };

  deleteStore = async (req, res) => {
    const { store_id } = res.locals.store;

    try {
      const deleteStore = await this.storeService.deleteStore(store_id);
      res.clearCookie("authorization", "refreshToken", "store");
      res.status(200).json(deleteStore);
      delete res.locals.store;
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "회원정보 삭제에 실패하였습니다." });
    }
  };
}

module.exports = StoreController;
