const { WhiskyLikes, StoreLikes } = require("../models");

class LikeRepository {
  findWhiskyLikes = async (whiskyLikeData) => {
    const findOneWhiskyData = await WhiskyLikes.findOne({
      where: {
        whisky_id: whiskyLikeData.whisky_id,
        user_id: whiskyLikeData.user_id,
      },
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
    const deleteWhiskyLike = await WhiskyLikes.destroy({
      whisky_id: whiskyLikeData.whisky_id,
      user_id: whiskyLikeData.user_id,
    });
    return deleteWhiskyLike;
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
      whisky_id: storeLikeData.whisky_id,
      user_id: storeLikeData.user_id,
    });
    return createStoreLike;
  };

  deleteStoreLike = async (storeLikeData) => {
    const deleteStoreLike = await StoreLikes.destroy({
      whisky_id: storeLikeData.whisky_id,
      user_id: storeLikeData.user_id,
    });
    return deleteStoreLike;
  };
}

module.exports = LikeRepository;
