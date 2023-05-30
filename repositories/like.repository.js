const { WhiskyLikes, StoreLikes, Whiskys, Stores } = require("../models");

class LikeRepository {
  getWhiskyLiked = async (user_id, whisky_id) => {
    const getWhiskyLikedData = await WhiskyLikes.findOne({
      where: {
        user_id,
        whisky_id,
      },
    });
    return getWhiskyLikedData;
  };

  getStoreLiked = async (user_id, store_id) => {
    const getStoreLikedData = await StoreLikes.findOne({
      where: {
        user_id,
        store_id,
      },
    });
    return getStoreLikedData;
  };

  whiksyDeleteLike = async (user_id, whisky_id) => {
    const deleteLikeData = await WhiskyLikes.destroy({
      where: { user_id, whisky_id },
    });
    return deleteLikeData;
  };

  whiksyDecreaseLikes = async (whisky_id) => {
    const findLikesData = await Whiskys.findOne({
      where: { whisky_id },
    });

    const decreaseLikesData = await findLikesData.decrement("wlikes", {
      by: 1,
    });
    return decreaseLikesData;
  };

  whiksyCreateLike = async (user_id, whisky_id) => {
    const createLikeData = await WhiskyLikes.create({
      user_id,
      whisky_id,
    });
    return createLikeData;
  };

  whiksyIncreaseLikes = async (whisky_id) => {
    const findLikesData = await Whiskys.findOne({
      where: { whisky_id },
    });

    const increaseLikesData = await findLikesData.increment("wlikes", {
      by: 1,
    });
    return increaseLikesData;
  };

  storeDeleteLike = async (user_id, store_id) => {
    const deleteLikeData = await StoreLikes.destroy({
      where: { user_id, store_id },
    });
    return deleteLikeData;
  };

  storeDecreaseLikes = async (store_id) => {
    const findLikesData = await Stores.findOne({
      where: { store_id },
    });

    const decreaseLikesData = await findLikesData.decrement("slikes", {
      by: 1,
    });
    return decreaseLikesData;
  };

  storeCreateLike = async (user_id, store_id) => {
    const createLikeData = await StoreLikes.create({
      user_id,
      store_id,
    });
    return createLikeData;
  };

  storeIncreaseLikes = async (store_id) => {
    const findLikesData = await Stores.findOne({
      where: { store_id },
    });

    const increaseLikesData = await findLikesData.increment("slikes", {
      by: 1,
    });
    return increaseLikesData;
  };
}

module.exports = LikeRepository;
