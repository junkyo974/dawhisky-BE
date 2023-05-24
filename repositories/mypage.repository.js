const { Op } = require("sequelize");
const sequelize = require("sequelize");

class MypageRepository {
  constructor(Users, Whiskylikes, Storlikes, Rewiews) {
    this.Users = Users;
    this.Whiskylikes = Whiskylikes;
    this.Storlikes = Storlikes;
    this.Rewiews = Rewiews;
  }

  //마이페이지 조회
  findAllMyInfo = async (userId) => {
    return (myInfos = await this.Users.findAll({
      where: { user_id: userId },
      attributes: ["user_id", "name"],
      include: [
        {
          model: this.Whiskylikes,
          attributes: ["whisky_id"],
        },
        {
          model: this.Storlikes,
          attributes: ["store_id"],
        },
        {
          model: this.Rewiews,
          attributes: ["whisky_id", "content"],
        },
      ],
    }));
  };
}

module.exports = MypageRepository;
