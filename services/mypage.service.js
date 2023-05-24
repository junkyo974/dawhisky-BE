const MypageRepository = require("../repositories/mypage.repository");
const { Users, Whiskylikes, Storlikes, Rewiews } = require("../models");

class MyapgeService {
  MypageRepository = new MypageRepository(
    Users,
    Whiskylikes,
    Storlikes,
    Rewiews
  );

  //마이페이지
  findAllInfoMypage = async (userId) => {
    const MyInfo = await this.MypageRepository.findAllMyInfo(userId);
    //결과가공하기
    console.log(MyInfo, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return MyInfo;
  };
}

module.exports = MyapgeService;
