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
      biz_photo,
      password,
      authCode,
      address,
      phone,
      notice,
      runtime,
    } = req.body;

    const redisGetResult = await redisClient.get(email);
    const emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
    const passwordFilter = /^(?=.*\d)(?=.*[a-zA-Z]).{4,}$/.test(password);
    const authCodeFilter = /^\d{6}$/;

    try {
      if (!authCodeFilter) {
        throw new Error("412/인증코드는 6자리 숫자만 입력하세요");
      }

      if (authCode !== redisGetResult) {
        throw new Error("412/인증코드가 일치하지 않습니다");
      }

      if (!emailFilter) {
        throw new Error("412/이메일 형식이 일치하지 않습니다");
      }

      if (!passwordFilter) {
        throw new Error("412/패스워드 형식이 일치하지 않습니다");
      }

      if (password.includes(store)) {
        throw new Error("412/패스워드에 상호명이 포함되어 있습니다");
      }

      if (!biz_photo) {
        throw new Error("412/사진을 올려주세요");
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
    } catch (error) {
      error.failedApi = "스토어 유저 회원가입";
      throw error;
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const store = await this.storeService.findOneStoreEmail(email);

    try {
      if (!store || password !== store.password) {
        throw new Error("412/이메일 또는 패스워드를 확인해주세요");
      }

      const storeData = await this.storeService.login(email);

      res.cookie(
        "authorization",
        `${storeData.accessObject.type} ${storeData.accessObject.token}`
      );

      res.cookie("refreshToken", `${storeData.refreshObject.token}`);

      res.cookie("store", `${storeData.store_id}`);

      res.status(200).json({
        authorization: `${storeData.accessObject.type} ${storeData.accessObject.token}`,
        refreshToken: `${storeData.refreshObject.token}`,
        store: `${storeData.store_id}`,
        message: "로그인 되었습니다!",
      });
    } catch (error) {
      error.failedApi = "스토어 로그인";
      throw error;
    }
  };

  logout = async (req, res) => {
    const { store_id } = res.locals.store;

    try {
      const logoutData = await this.storeService.logout(store_id);
      res.clearCookie("authorization", "refreshToken", "store");
      res.status(200).json(logoutData);
      delete res.locals.store;
    } catch (error) {
      error.failedApi = "스토어 로그아웃";
      throw error;
    }
  };

  deleteStore = async (req, res) => {
    const { store_id } = res.locals.store;

    try {
      const deleteStore = await this.storeService.deleteStore(store_id);
      res.clearCookie("authorization", "refreshToken", "store");
      res.status(200).json(deleteStore);
      delete res.locals.store;
    } catch (error) {
      error.failedApi = "스토어 탈퇴";
      throw error;
    }
  };

  pushMessage = async (req, res) => {
    const admin = require("firebase-admin");
    const serviceAccount = require("../config/firebase.json");
    const { que_id } = req.body;
    let deviceToken = await this.storeService.findDeviceToken(que_id);

    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://da-whisky-default-rtdb.firebaseio.com",
        });
      }

      const message = {
        notification: {
          title: "Da-whisky 줄서기 예약 알림",
          body: "곧 입장이 가능하니 매장에서 대기해주세요! \n취소 및 수정은 사이트를 확인해주세요.",
        },
        token: deviceToken,
      };
      const messaging = admin.messaging();
      const response = await messaging.send(message);
      console.log("푸시 메시지 전송");

      res.status(200).json({
        message: "메세지 전송에 성공하였습니다.",
      });
    } catch (error) {
      error.failedApi = "push message 전송";
      throw error;
    }
  };
}

module.exports = StoreController;
