const ReviewService = require("../services/review.service.js");

class ReviewController {
  reviewService = new ReviewService();

  //내가쓴 리뷰 조회
  getReview = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;

      const whisky = await this.reviewService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }

      const reviewWhisky = await this.reviewService.getReview(
        user_id,
        whisky_id
      );

      res.status(200).json(reviewWhisky);
    } catch (error) {
      error.failedApi = "리뷰 조회";
      throw error;
    }
  };

  //리뷰등록
  createReview = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;
      const { content } = req.body;

      if (!content) {
        throw new Error("404/리뷰를 입력해주세요.");
      }

      const whisky = await this.reviewService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }

      const whiskyReview = await this.reviewService.findWhiskyReview(
        user_id,
        whisky_id
      );
      if (whiskyReview) {
        throw new Error("412/이미 리뷰를 작성한 위스키입니다.");
      }

      await this.reviewService.createReview(user_id, whisky_id, content);

      res.status(200).json({ message: "리뷰를 작성하였습니다." });
    } catch (error) {
      error.failedApi = "리뷰 작성";
      throw error;
    }
  };

  //리뷰수정
  updateReview = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;
      const { content } = req.body;

      const whisky = await this.reviewService.findWhiskyById(whisky_id);

      if (!content) {
        throw new Error("404/리뷰를 입력해주세요.");
      }

      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }

      const whiskyReview = await this.reviewService.findWhiskyReview(
        user_id,
        whisky_id
      );
      if (!whiskyReview) {
        throw new Error("412/리뷰가 존재하지 않습니다.");
      }

      await this.reviewService.updateReview(user_id, whisky_id, content);

      return res.status(200).json({ message: "리뷰를 수정했습니다." });
    } catch (error) {
      error.faiedApi = "리뷰 수정";
      throw error;
    }
  };

  //리뷰삭제
  deleteReview = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;

      const whiskyReview = await this.reviewService.findWhiskyReview(
        user_id,
        whisky_id
      );
      if (!whiskyReview) {
        throw new Error("412/리뷰가 존재하지 않습니다.");
      }

      await this.reviewService.deleteReview(user_id, whisky_id);

      return res.status(200).json({ message: "리뷰를 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "리뷰 삭제";
      throw error;
    }
  };
}

module.exports = ReviewController;
