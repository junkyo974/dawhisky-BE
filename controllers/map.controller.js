const fs = require("fs");
const MapService = require("../services/map.service");

class MapController {
  mapService = new MapService();
  getMap = async (req, res) => {
    fs.readFile("./static/index.html", (err, data) => {
      if (err) {
        res.send("오류났음" + err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  };

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
