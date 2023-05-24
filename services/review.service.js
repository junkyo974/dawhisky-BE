const ReviewRepository = require("../repositories/review.repository.js");

const { Reviews, Users } = require("../models");

class ReviewService {
  commentsRepository = new CommentsRepository(Comments);

  //리뷰등록
  createReview = async (userId, postId, comment) => {
    return await this.commentsRepository.createComment(userId, postId, comment);
  };

  //리뷰수정
  //리뷰삭제
}

module.exports = ReviewService;
