const StoreRepository = require("../repositories/store.repository");
const { Stores } = require("../models");
const redisClient = require("../utils/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class StoreService {
  constructor(storeRepository) {
    this.redisClient = redisClient;
  }
  storeRepository = new StoreRepository(Stores);

  signup = async (email, store, biz_number, biz_photo, password) => {
    const storesData = { email, store, biz_number, biz_photo, password };

    await this.storeRepository.createUser(storesData);

    return { message: "회원 가입 완료" };
  };

  login = async (email) => {
    const store = await this.userRepository.findOneUser(email);

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

    await this.redisClient.SET(email, JSON.stringify(refreshToken));

    return { accessObject, refreshObject };
  };

  logout = async (store_id) => {
    const store = await this.userRepository.findOneUser(store_id);
    // await this.redisClient.DEL(store.email);
    return { message: "로그아웃 되었습니다." };
  };

  findOneUser = async (email) => {
    const findOneUserData = this.storeRepository.findOneUser(email);
    return findOneUserData;
  };
}

module.exports = StoreService;
