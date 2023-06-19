const sequelize = require("sequelize");
const { Op } = require("sequelize");

class MapRepository {
  constructor(StoreTables, Stores) {
    this.StoreTables = StoreTables;
    this.Stores = Stores;
  }

  //스토어 불러오기
  findAllStore = async (address) => {
    const decodedAddress = decodeURIComponent(address);
    return await this.Stores.findAll({
      where: {
        address: { [Op.regexp]: "^.[^ ]* " + decodedAddress },
      },
      attributes: ["store_id", "store", "address", "biz_photo"],
      include: [
        {
          model: this.StoreTables,
          attributes: ["bar_table", "hall_table"],
        },
      ],
    });
  };
}

module.exports = MapRepository;
