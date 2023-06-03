const { Stores } = require("../models");

class StoreRepository {
  createStore = async (storesData) => {
    const createdStore = await Stores.create({
      email: storesData.email,
      store: storesData.store,
      biz_number: storesData.biz_number,
      biz_photo: storesData.biz_photo,
      password: storesData.password,
      address: storesData.address,
      phone: storesData.phone,
      notice: storesData.notice,
      runtime: storesData.runtime,
    });
    return createdStore;
  };

  findOneStoreEmail = async (email) => {
    const findOneStoreData = await Stores.findOne({
      where: { email: email },
    });
    return findOneStoreData;
  };

  findOneStoreId = async (store_id) => {
    const findOneStoreData = await Stores.findOne({
      where: { store_id: store_id },
    });
    return findOneStoreData;
  };

  deleteStore = async (store_id) => {
    const deleteStore = await Stores.destroy({
      where: { store_id: store_id },
    });
    return deleteStore;
  };
}

module.exports = StoreRepository;
