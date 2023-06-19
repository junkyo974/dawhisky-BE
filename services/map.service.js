const MapRepository = require("../repositories/map.repository");
const { StoreTables, Stores } = require("../models");

class MapService {
  mapRepository = new MapRepository(StoreTables, Stores);

  //스토어 불러오기
  getStore = async (address) => {
    const store = await this.mapRepository.findAllStore(address);
    return store;
  };
}

module.exports = MapService;
