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
      process.env.USER_ACCESS_KEY
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshtoken = jwt.sign(
      { email: store.email },
      process.env.USER_REFRESH_KEY
    );
    const refreshObject = { type: "Bearer", token: refreshtoken };

    const store_id = store.store_id;

    await this.redisClient.SET(email, JSON.stringify(refreshtoken));

    return { accessObject, refreshObject, store_id };
  };

  logout = async (store_id) => {
    const store = await this.storeRepository.findOneStoreId(store_id);
    await this.redisClient.DEL(store.email);
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

  findPushData = async (que_id) => {
    const PushData = await this.storeRepository.findPushData(que_id);

    return PushData;
  };
}

module.exports = StoreService;
