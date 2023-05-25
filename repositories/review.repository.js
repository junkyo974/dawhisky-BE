const sequelize = require("sequelize");

class ReviewRepository {
  constructor(Whiskys, Users, Reviews) {
    this.Whiskys = Whiskys;
    this.Users = Users;
    this.Reviews = Reviews;
  }
  //위스키찾기
  findOneWhisky = async (whisky_id) => {
    return await this.Whiskys.findOne({ where: { whisky_id } });
  };
  //리뷰찾기
  findOneReview = async (review_id) => {
    return await this.Reviews.findOne({ where: { review_id } });
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
  updateReview = async (review_id, content) => {
    return await this.Reviews.update({ content }, { where: { review_id } });
  };
  //리뷰삭제
  deleteReview = async (review_id) => {
    await this.Reviews.destroy({ where: { review_id } });
  };
}

module.exports = ReviewRepository;
