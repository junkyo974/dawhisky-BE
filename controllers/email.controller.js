// const Axios = require("axios");
const nodemailer = require("nodemailer");
const redisClient = require("../utils/redis.js");
const ejs = require("ejs");
const path = require("path");
const appDir = path.dirname(require.main.filename);
require("dotenv").config();

class EmailController {
  send = async (req, res) => {
    const { email } = req.body;
    const emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
    let authNum = Math.random().toString().substr(2, 6);

    try {
      const emailTemplate = await ejs.renderFile(
        appDir + "/template/authMail.ejs",
        { authCode: authNum }
      );
      const redisSetResult = await redisClient.SETEX(email, 300, authNum);
      // const existsEmailUser = await this.userService.findOneUser(email);
      // const existsEmailStore = await this.storeService.findOneStoreEmail(email);

      const transporter = nodemailer.createTransport({
        service: "naver",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const emailForm = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "전송받은 인증번호를 입력해주세요.",
        html: emailTemplate,
      };

      // if (existsEmailUser) {
      //   res.status(412).json({
      //     errorMessage: "유저에 등록된 이메일입니다.",
      //   });
      //   return;
      // }

      // if (existsEmailStore) {
      //   res.status(412).json({
      //     errorMessage: "점주에 등록된 이메일입니다.",
      //   });
      //   return;
      // }

      if (!emailFilter) {
        res.status(412).json({
          errorMessage: "이메일 형식이 일치하지 않습니다.",
        });
        return;
      }

      await transporter.sendMail(emailForm);
      res.status(200).json({
        message: `${email}로 인증번호를 발송하였습니다.`,
      });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ errorMessage: "인증 이메일 전송에 실패하였습니다." });
    }
  };
}

module.exports = EmailController;
