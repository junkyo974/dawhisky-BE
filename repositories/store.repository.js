const { Stores } = require("../models");

class StoreRepository {
  createUser = async (storesData) => {
    const createdStore = await Stores.create({
      email: storesData.email,
      store: storesData.store,
      biz_number: storesData.biz_number,
      biz_photo: storesData.biz_photo,
      password: storesData.password,
    });
    return createdStore;
  };

  findOneUser = async (email) => {
    const findOneStoreData = await Stores.findOne({
      where: { email: email },
    });
    return findOneStoreData;
  };
}

module.exports = StoreRepository;
