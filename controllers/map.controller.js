const fs = require("fs");

class MapController {
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
}

module.exports = MapController;
