const MapService = require("../services/map.service");

class MapController {
  mapService = new MapService();

  //스토어 불러오기
  getStore = async (req, res, next) => {
    try {
      const address = encodeURIComponent(req.params.address);
      const store = await this.mapService.getStore(address);

      res.status(200).json(store);
    } catch (error) {
      error.failedApi = "스토어 불러오기";
      throw error;
    }
  };
}

module.exports = MapController;
