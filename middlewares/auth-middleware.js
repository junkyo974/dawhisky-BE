const jwt = require("jsonwebtoken");
const { Users, Stores } = require("../models");
const redisClient = require("../utils/redis.js");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? "").split(" ");

  try {
    if (authType !== "Bearer" || !authToken) {
      return res
        .status(403)
        .json({ errormessage: "로그인이 필요한 기능입니다." });
    }

    const decodedToken = jwt.verify(authToken, process.env.USER_ACCESS_KEY);
    const email = decodedToken.email;

    const user = await Users.findOne({ where: { email } });
    const store = await Stores.findOne({ where: { email } });

    if (!user && !store) {
      return res.status(401).json({
        errormessage: "토큰에 해당하는 사용자가 존재하지 않습니다.",
      });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;
      const token = refreshToken.split(" ")[1];
      const decodedRefreshToken = jwt.verify(
        token,
        process.env.USER_REFRESH_KEY
      );
      const email = decodedRefreshToken.email;

      const user = await Users.findOne({ where: { email } });
      const store = await Stores.findOne({ where: { email } });

      if (!user && !store) {
        return res.status(401).json({
          errormessage: "리프레시 토큰에 해당하는 사용자가 존재하지 않습니다.",
        });
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
      return res.status(403).json({
        errormessage: "전달된 쿠키에서 오류가 발생하였습니다.",
      });
    }
  }
};
