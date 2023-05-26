const { Op } = require("sequelize");
const sequelize = require("sequelize");

class MypageRepository {
  constructor(
    Users,
    WhiskyLikes,
    StoreLikes,
    Reviews,
    StoreTables,
    StoreWhiskys,
    Whiskys
  ) {
    this.Users = Users;
    this.WhiskyLikes = WhiskyLikes;
    this.StoreLikes = StoreLikes;
    this.Reviews = Reviews;
    this.StoreTables = StoreTables;
    this.StoreWhiskys = StoreWhiskys;
    this.Whiskys = Whiskys;
  }

  //마이페이지 조회
  findAllMyInfo = async (user_id) => {
    console.log(user_id, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return await this.Users.findAll({
      where: { user_id },
      attributes: ["user_id", "name"],
      include: [
        {
          model: this.WhiskyLikes,
          attributes: ["whisky_id"],
        },
        {
          model: this.StorLikes,
          attributes: ["store_id"],
        },
        {
          model: this.Reviews,
          attributes: ["whisky_id", "content"],
        },
      ],
    });
  };
  //점주페이지

  //스토어위스키 조회
  findAllStoreWhisky = async (store_id) => {
    return await this.StoreWhiskys.findAll({
      where: { store_id },
      include: [
        {
          model: this.Whiskys,
          attributes: ["whisky_kor"],
        },
      ],
    });
  };

  //스토어테이블 조회
  findOneStoreTable = async (store_id) => {
    return await this.StoreTables.findOne({
      where: { store_id },
    });
  };

  //테이블 찾기
  findOneStoretable = async (store_id) => {
    return await this.StoreTables.findOne({ where: { store_id } });
  };

  //스토어테이블 생성
  createTable = async (store_id, hall_table, bar_table) => {
    return await this.StoreTables.create({
      store_id,
      hall_table,
      bar_table,
    });
  };

  //스토어테이블 수정
  updateTable = async (storetable_id, store_id, hall_table, bar_table) => {
    return await this.StoreTables.update(
      { store_id, hall_table, bar_table },
      { where: { storetable_id } }
    );
  };

  //스토어테이블 삭제
  deleteTable = async (storetable_id) => {
    return await this.StoreTables.destroy({ where: { storetable_id } });
  };

  //위스키 찾기
  findWhisky = async (whisky_id) => {
    return await this.Whiskys.findOne({ where: { whisky_id } });
  };

  //스토어위스키 찾기
  findStorewhiskyById = async (storewhisky_id) => {
    return await this.StoreWhiskys.findOne({ where: { storewhisky_id } });
  };

  //스토어위스키 생성
  createStoreWhisky = async (store_id, whisky_id, count) => {
    return await this.StoreWhiskys.create({ store_id, whisky_id, count });
  };

  //스토어위스키수정
  updateStoreWhisky = async (storewhisky_id, store_id, whisky_id, count) => {
    return await this.StoreWhiskys.update(
      { store_id, whisky_id, count },
      { where: { storewhisky_id } }
    );
  };

  //스토어위스키 삭제
  deleteStoreWhisky = async (storewhisky_id) => {
    console.log(
      storewhisky_id,
      "here~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~"
    );
    return await this.StoreWhiskys.destroy({ where: { storewhisky_id } });
  };
}

module.exports = MypageRepository;
