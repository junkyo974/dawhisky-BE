const LikeRepository = require("../repositories/like.repository");
const WhiskyRepository = require("../repositories/whisky.repository");
const StoreRepository = require("../repositories/store.repository");
const { Likes, Whiskys, Stores } = require("../models");

class LikeService {
  likeRepository = new LikeRepository(Likes);
  whiskyRepository = new WhiskyRepository(Whiskys);
  storeRepository = new StoreRepository(Stores);

  findOneWhisky = async (whisky_id) => {
    const findOneWhiskyData = await this.whiskyRepository.findOneWhisky(
      whisky_id
    );

    return findOneWhiskyData;
  };

  putWhiskyLikes = async (whiskyLikeData) => {
    const whiskyLike = await this.likeRepository.findWhiskyLikes(
      whiskyLikeData
    );
    return whiskyLike;
  };

  createWhiskyLike = async (whiskyLikeData) => {
    await this.likeRepository.createWhiskyLike(whiskyLikeData);
  };

  deleteWhiskysLike = async (whiskyLikeData) => {
    await this.likeRepository.deleteWhiskysLike(whiskyLikeData);
  };

  findOneStoreId = async (store_id) => {
    const findOneWhiskyData = await this.storeRepository.findOneStoreId(
      store_id
    );

    return findOneWhiskyData;
  };

  putStoreLikes = async (storeLikeData) => {
    const storeLike = await this.likeRepository.findStoreLikes(storeLikeData);
    return storeLike;
  };

  createStoreLike = async (storeLikeData) => {
    await this.likeRepository.createStoreLike(storeLikeData);
  };

  deleteStoreLike = async (storeLikeData) => {
    await this.likeRepository.deleteStoreLike(storeLikeData);
  };
}

module.exports = LikeService;
