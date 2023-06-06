const { Op } = require("sequelize");
const sequelize = require("sequelize");

class ReviewRepository {
  constructor(Reviews, Whiskys, Users) {
    this.Reviews = Reviews;
    this.Whiskys = Whiskys;
    this.Users = Users;
  }
  //위스키찾기
  findOneWhisky = async (whisky_id) => {
    return await this.Whiskys.findOne({ where: { whisky_id } });
  };
  //리뷰찾기
  findOneReview = async (user_id, whisky_id) => {
    return await this.Reviews.findOne({
      where: { [Op.and]: [{ whisky_id }, { user_id }] },
    });
  };

  //리뷰등록
  createReview = async (user_id, whisky_id, content) => {
    return await this.Reviews.create({
      user_id,
      whisky_id,
      content,
    });
  };

  //리뷰수정
  updateReview = async (user_id, whisky_id, content) => {
    return await this.Reviews.update(
      { content },
      {
        where: { [Op.and]: [{ whisky_id }, { user_id }] },
      }
    );
  };
  //리뷰삭제
  deleteReview = async (user_id, whisky_id) => {
    await this.Reviews.destroy({
      where: { [Op.and]: [{ whisky_id }, { user_id }] },
    });
  };
}

module.exports = ReviewRepository;
