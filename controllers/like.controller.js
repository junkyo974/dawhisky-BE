const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();

  whiskyLikes = async (req, res) => {
    const { user_id } = res.locals.user;
    const { whisky_id } = req.params;

    try {
      const findOneWhiskyData = await this.likeService.findOneWhisky(whisky_id);

      if (!findOneWhiskyData) {
        return res.status(412).json({
          errorMessage: "해당 위스키 정보를 찾을 수 없습니다.",
        });
      }

      const whiskyLikeData = { whisky_id, user_id };
      const whiskyLike = await this.likeService.putWhiskyLikes(whiskyLikeData);

      if (!whiskyLike) {
        await this.likeService.createWhiskyLike(whiskyLikeData);
        res.status(200).json({ message: "좋아요를 등록하였습니다." });
      } else {
        await this.likeService.deleteWhiskysLike(whiskyLikeData);
        res.status(200).json({ message: "좋아요를 취소하였습니다." });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: "좋아요 기능에 에러가 있습니다.",
      });
    }
  };

  storeLikes = async (req, res) => {
    const { user_id } = res.locals.user;
    const { store_id } = req.params;

    try {
      const findOneStoreData = await this.likeService.findOneStoreId(store_id);

      if (!findOneStoreData) {
        return res.status(412).json({
          errorMessage: "해당 매장 정보를 찾을 수 없습니다.",
        });
      }
      const storeLikeData = { store_id, user_id };
      const storeLike = await this.likeService.putStoreLikes(storeLikeData);

      if (storeLike === null) {
        await this.likeService.createStoreLike(storeLikeData);
        res.status(200).json({ message: "좋아요를 등록하였습니다." });
      } else {
        await this.likeService.deleteStoreLike(storeLikeData);
        res.status(200).json({ message: "좋아요를 취소하였습니다." });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: "좋아요 기능에 에러가 있습니다.",
      });
    }
  };
}

module.exports = LikeController;
