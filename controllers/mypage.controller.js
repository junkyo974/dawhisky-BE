const MypageService = require("../services/mypage.service");

class MypageController {
  mypageService = new MypageService();

  //마이페이지
  mypage = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const mypage = await this.mypageService.findAllInfoMypage(userId);
      res.status(200).json(mypage);
    } catch (error) {
      error.failedApi = "마이 페이지 조회";
      throw error;
    }
  };
}

module.exports = MypageController;
