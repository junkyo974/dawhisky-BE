const { WhiskyLikes, StoreLikes } = require("../models");

class LikeRepository {
  findWhiskyLikes = async (whiskyLikeData) => {
    const findOneWhiskyData = await WhiskyLikes.findOne({
      where: {
        whisky_id: whiskyLikeData.whisky_id,
        user_id: whiskyLikeData.user_id,
      },
      raw: true,
    });
    return findOneWhiskyData;
  };

  createWhiskyLike = async (whiskyLikeData) => {
    const createWhiskyLike = await WhiskyLikes.create({
      whisky_id: whiskyLikeData.whisky_id,
      user_id: whiskyLikeData.user_id,
    });
    return createWhiskyLike;
  };

  deleteWhiskysLike = async (whiskyLikeData) => {
    await WhiskyLikes.destroy({
      where: {
        whisky_id: whiskyLikeData.whisky_id,
        user_id: whiskyLikeData.user_id,
      },
    });
  };

  findStoreLikes = async (storeLikeData) => {
    const findOneStoreData = await StoreLikes.findOne({
      where: {
        store_id: storeLikeData.store_id,
        user_id: storeLikeData.user_id,
      },
    });
    return findOneStoreData;
  };

  createStoreLike = async (storeLikeData) => {
    const createStoreLike = await StoreLikes.create({
      store_id: storeLikeData.store_id,
      user_id: storeLikeData.user_id,
    });
    return createStoreLike;
  };

  deleteStoreLike = async (storeLikeData) => {
    await StoreLikes.destroy({
      where: {
        store_id: storeLikeData.store_id,
        user_id: storeLikeData.user_id,
      },
    });
  };
}

module.exports = LikeRepository;
