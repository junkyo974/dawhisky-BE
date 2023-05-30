const LikeRepository = require("../repositories/like.repository");
const WhiskyRepository = require("../repositories/whisky.repository");
const StoreRepository = require("../repositories/store.repository");
const { Likes, Whiskys, Stores } = require("../models");
const { sequelize } = require("../models");
const { Transaction } = require("sequelize");

class LikeService {
  likeRepository = new LikeRepository(Likes);
  whiskyRepository = new WhiskyRepository(Whiskys);
  storeRepository = new StoreRepository(Stores);

  getWhiskyById = async (whisky_id) => {
    const findOneWhiskyData = await this.whiskyRepository.findOneWhisky(
      whisky_id
    );

    return findOneWhiskyData;
  };

  getStoreById = async (store_id) => {
    const findOneWhiskyData = await this.storeRepository.findOneStoreId(
      store_id
    );

    return findOneWhiskyData;
  };

  getWhiskyLiked = async (user_id, whisky_id) => {
    const getPostLikedData = await this.likeRepository.getWhiskyLiked(
      user_id,
      whisky_id
    );
    return getPostLikedData;
  };

  getStoreLiked = async (user_id, store_id) => {
    const getPostLikedData = await this.likeRepository.getStoreLiked(
      user_id,
      store_id
    );
    return getPostLikedData;
  };

  whiskyLikeToggle = async (user_id, whisky_id, likeExist) => {
    const t = await sequelize.transaction({
      isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      if (likeExist) {
        await this.likeRepository.whiksyDeleteLike(user_id, whisky_id, {
          transaction: t,
        });

        await this.likeRepository.whiksyDecreaseLikes(whisky_id);
        await t.commit();

        return { message: "위스키 좋아요 취소 완료" };
      } else {
        await this.likeRepository.whiksyCreateLike(user_id, whisky_id, {
          transaction: t,
        });

        await this.likeRepository.whiksyIncreaseLikes(whisky_id);
        await t.commit();

        return { message: "위스키 좋아요 완료" };
      }
    } catch (err) {
      await t.rollback();
      return { errorMessage: "좋아요 기능이 실패하였습니다." };
    }
  };

  storeLikeToggle = async (user_id, store_id, likeExist) => {
    const t = await sequelize.transaction({
      isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      if (likeExist) {
        await this.likeRepository.storeDeleteLike(user_id, store_id, {
          transaction: t,
        });

        await this.likeRepository.storeDecreaseLikes(store_id);
        await t.commit();

        return { message: "가게 좋아요 취소 완료" };
      } else {
        await this.likeRepository.storeCreateLike(user_id, store_id, {
          transaction: t,
        });

        await this.likeRepository.storeIncreaseLikes(store_id);
        await t.commit();

        return { message: "가게 좋아요 완료" };
      }
    } catch (err) {
      await t.rollback();
      return { errorMessage: "좋아요 기능이 실패하였습니다." };
    }
  };
}

module.exports = LikeService;
