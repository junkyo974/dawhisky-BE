const UserRepository = require("../repositories/user.repository");
const { Users } = require("../models");
const redisClient = require("../utils/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor(userRepository) {
    this.redisClient = redisClient;
  }
  userRepository = new UserRepository(Users);

  signup = async (email, name, age, gender, password) => {
    const usersData = { email, name, age, gender, password };

    await this.userRepository.createUser(usersData);

    return { message: "회원 가입 완료" };
  };

  login = async (email) => {
    const user = await this.userRepository.findOneUserEmail(email);

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.USER_ACCESS_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshtoken = jwt.sign(
      { email: user.email },
      process.env.USER_REFRESH_KEY
    );
    const refreshObject = { type: "Bearer", token: refreshtoken };

    const user_id = user.user_id;

    await this.redisClient.SET(email, JSON.stringify(refreshtoken));

    return { accessObject, refreshObject, user_id };
  };

  logout = async (user_id) => {
    const user = await this.userRepository.findOneUserId(user_id);
    await this.redisClient.DEL(user.email);
    return { message: "로그아웃 되었습니다." };
  };

  findOneUserEmail = async (email) => {
    const findOneUserData = this.userRepository.findOneUserEmail(email);
    return findOneUserData;
  };

  deleteUser = async (user_id) => {
    const user = await this.userRepository.deleteUser(user_id);

    return { message: "회원님의 계정이 삭제되었습니다." };
  };
}

module.exports = UserService;
