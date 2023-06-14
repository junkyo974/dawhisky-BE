const jwt = require("jsonwebtoken");
const { Users, Stores } = require("../models");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

module.exports = async (req, res, next) => {
  let { authorization, refreshtoken } = req.headers;

  try {
    authorization = !req.headers.refreshtoken
      ? req.cookies.authorization
      : authorization;

    refreshtoken = !req.headers.refreshtoken
      ? req.cookies.refreshtoken
      : refreshtoken;

    const [authType, authToken] = (authorization ?? "").split(" ");
    if (authType !== "Bearer" || !authToken) {
      throw new Error("403/로그인이 필요한 기능입니다.");
    }

    const decodedToken = jwt.verify(authToken, process.env.USER_ACCESS_KEY);
    const email = decodedToken.email;

    const user = await Users.findOne({ where: { email } });
    const store = await Stores.findOne({ where: { email } });

    if (!user && !store) {
      throw new Error("403/토큰에 해당하는 사용자가 존재하지 않습니다.");
    }
    if (user) {
      res.locals.user = {
        user_id: user.user_id,
      };
    }

    if (store) {
      res.locals.store = {
        store_id: store.store_id,
      };
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const token = refreshtoken.split(" ")[1];
      const decodedRefreshToken = jwt.verify(
        token,
        process.env.USER_REFRESH_KEY
      );
      const email = decodedRefreshToken.email;

      const user = await Users.findOne({ where: { email } });
      const store = await Stores.findOne({ where: { email } });

      if (!user && !store) {
        throw new Error(
          "403/리프레시 토큰에 해당하는 사용자가 존재하지 않습니다."
        );
      }

      if (user) {
        const newAccessToken = jwt.sign(
          { email: user.email },
          process.env.USER_ACCESS_KEY,
          {
            expiresIn: process.env.ACCESS_EXPIRES,
          }
        );

        res.cookie("authorization", `Bearer ${newAccessToken}`);
      }

      if (store) {
        const newAccessToken = jwt.sign(
          { email: store.email },
          process.env.USER_ACCESS_KEY,
          {
            expiresIn: process.env.ACCESS_EXPIRES,
          }
        );

        res.cookie("authorization", `Bearer ${newAccessToken}`);
      }

      return next();
    } else {
      error.failedApi = "사용자 인증 미들웨어";
      throw error;
    }
  }
};
