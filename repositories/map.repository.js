const sequelize = require("sequelize");

class MapRepository {
  constructor(StoreTables, Stores) {
    this.StoreTables = StoreTables;
    this.Stores = Stores;
  }

  //스토어 불러오기
  findAllStore = async () => {
    return await this.Stores.findAll({
      attributes: ["store_id", "store", "address"],
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
