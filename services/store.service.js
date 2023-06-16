const StoreRepository = require("../repositories/store.repository");
const { Stores, Ques } = require("../models");
const redisClient = require("../utils/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class StoreService {
  constructor(storeRepository) {
    this.redisClient = redisClient;
  }
  storeRepository = new StoreRepository(Stores);

  signup = async (
    email,
    store,
    biz_number,
    biz_photo,
    password,
    address,
    phone,
    notice,
    runtime
  ) => {
    const storesData = {
      email,
      store,
      biz_number,
      biz_photo,
      password,
      address,
      phone,
      notice,
      runtime,
    };

    await this.storeRepository.createStore(storesData);

    return { message: "회원 가입 완료" };
  };

  login = async (email) => {
    const store = await this.storeRepository.findOneStoreEmail(email);

    const accessToken = jwt.sign(
      { email: store.email },
      process.env.USER_ACCESS_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshToken = jwt.sign(
      { email: store.email },
      process.env.USER_REFRESH_KEY,
      {
        expiresIn: process.env.REFRESH_EXPIRES,
      }
    );
    const refreshObject = { type: "Bearer", token: refreshToken };

    const store_id = store.store_id;

    await this.redisClient.SET(email, JSON.stringify(refreshToken));

    return { accessObject, refreshObject, store_id };
  };

  logout = async (store_id) => {
    const store = await this.storeRepository.findOneStoreId(store_id);
    // await this.redisClient.DEL(store.email);
    return { message: "로그아웃 되었습니다." };
  };

  findOneStoreEmail = async (email) => {
    const findOneUserData = this.storeRepository.findOneStoreEmail(email);
    return findOneUserData;
  };

  deleteStore = async (store_id) => {
    const store = await this.storeRepository.deleteStore(store_id);

    return { message: "회원님의 계정이 삭제되었습니다." };
  };

  findDeviceToken = async (que_id) => {
    const deviceToken = await this.storeRepository.findDeviceToken(que_id);

    return deviceToken;
  };
}

module.exports = StoreService;
