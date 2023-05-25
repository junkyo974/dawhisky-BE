const ReviewRepository = require("../repositories/review.repository.js");

class ReviewService {
  reviewRepository = new ReviewRepository();

  //위스키찾기
  findWhiskyById = async (whisky_id) => {
    return await this.reviewRepository.findOneWhisky(whisky_id);
  };

  //리뷰찾기
  findReviewById = async (review_id) => {
    return await this.reviewRepository.findOneReview(review_id);
  };
  //리뷰등록
  createReview = async (user_id, whisky_id, content) => {
    return await this.reviewRepository.createReview(
      user_id,
      whisky_id,
      content
    );
  };

  //리뷰수정
  updateReview = async (review_id, content) => {
    return await this.reviewRepository.updateReview(review_id, content);
  };

  //리뷰삭제
  deleteReview = async (review_id) => {
    await this.reviewRepository.deleteReview(review_id);
  };
}

module.exports = ReviewService;
