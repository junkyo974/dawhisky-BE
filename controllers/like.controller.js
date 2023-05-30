const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();

  whiskyLikeToggle = async (req, res) => {
    const { user_id } = res.locals.user;
    const { whisky_id } = req.params;

    try {
      const whiskyExist = await this.likeService.getWhiskyById(whisky_id);
      if (!whiskyExist) {
        return res
          .status(404)
          .json({ errorMessage: "위스키가 존재하지 않습니다." });
      }

      const likeExist = await this.likeService.getWhiskyLiked(
        user_id,
        whisky_id
      );

      if (likeExist) {
        const likeResult = await this.likeService.whiskyLikeToggle(
          user_id,
          whisky_id,
          true
        );

        return res.status(200).json(likeResult);
      } else {
        const likeResult = await this.likeService.whiskyLikeToggle(
          user_id,
          whisky_id,
          false
        );
        return res.status(200).json(likeResult);
      }
    } catch (err) {
      res.status(400).json({
        errorMessage: "위스키 좋아요에 실패하였습니다.",
      });
    }
  };

  storeLikeToggle = async (req, res) => {
    const { user_id } = res.locals.user;
    const { store_id } = req.params;

    try {
      const storeExist = await this.likeService.getStoreById(store_id);
      if (!storeExist) {
        return res
          .status(404)
          .json({ errorMessage: "가게가 존재하지 않습니다." });
      }

      const likeExist = await this.likeService.getStoreLiked(user_id, store_id);

      if (likeExist) {
        const likeResult = await this.likeService.storeLikeToggle(
          user_id,
          store_id,
          true
        );

        return res.status(200).json(likeResult);
      } else {
        const likeResult = await this.likeService.storeLikeToggle(
          user_id,
          store_id,
          false
        );
        return res.status(200).json(likeResult);
      }
    } catch (err) {
      console.log("라잌컨츄롤", err);
      res.status(400).json({
        errorMessage: "가게 좋아요에 실패하였습니다.",
      });
    }
  };
}

module.exports = LikeController;
