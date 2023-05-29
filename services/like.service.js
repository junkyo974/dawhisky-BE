const LikeRepository = require("../repositories/like.repository");
const WhiskyRepository = require("../repositories/whisky.repository");
const StoreRepository = require("../repositories/store.repository");
const { Likes, Whisky, Store } = require("../models");

class LikeService {
  likeRepository = new LikeRepository(Likes);
  whiskyRepository = new WhiskyRepository(Whisky);
  storeRepository = new StoreRepository(Store);

  findOneWhisky = async (whisky_id) => {
    const findOneWhiskyData = await this.whiskyRepository.findOneWhisky(
      whisky_id
    );

    return findOneWhiskyData;
  };

  putWhiskyLikes = async (whiskyLikeData) => {
    await this.likeRepository.putWhiskyLikes(whiskyLikeData);
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
    await this.likeRepository.putStoreLikes(storeLikeData);
  };

  createStoreLike = async (storeLikeData) => {
    await this.likeRepository.createWhiskyLike(storeLikeData);
  };

  deleteStoreLike = async (storeLikeData) => {
    await this.likeRepository.deleteWhiskysLike(storeLikeData);
  };
}

module.exports = LikeService;
