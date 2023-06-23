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
    Whiskys,
    Stores,
    Ques
  ) {
    this.Users = Users;
    this.WhiskyLikes = WhiskyLikes;
    this.StoreLikes = StoreLikes;
    this.Reviews = Reviews;
    this.StoreTables = StoreTables;
    this.StoreWhiskys = StoreWhiskys;
    this.Whiskys = Whiskys;
    this.Stores = Stores;
    this.Ques = Ques;
  }

  // 마이페이지 조회
  findAllMyInfo = async (user_id) => {
    return await this.Users.findAll({
      where: { user_id },
      attributes: ["user_id", "name"],
      include: [
        {
          model: this.WhiskyLikes,
          attributes: ["whisky_id"],
          include: [
            {
              model: this.Whiskys,
              attributes: [
                "whisky_id",
                "whisky_kor",
                "whisky_eng",
                "whisky_photo",
                "whisky_abv",
              ],
            },
          ],
        },
        {
          model: this.StoreLikes,
          attributes: ["store_id"],
          include: [
            {
              model: this.Stores,
              attributes: ["store_id", "store", "address", "biz_photo"],
            },
          ],
        },
        {
          model: this.Reviews,
          attributes: ["review_id", "content", "whisky_id"],
          include: [
            {
              model: this.Whiskys,
              attributes: [
                "whisky_id",
                "whisky_kor",
                "whisky_eng",
                "whisky_photo",
                "whisky_abv",
              ],
            },
          ],
        },
      ],
    });
  };

  //내 모든 줄서기 현황 조회
  findAllMyQue = async (user_id) => {
    return await this.Ques.findAll({
      where: { user_id },
      include: [
        {
          model: this.Stores,
          attributes: ["store"],
        },
      ],
    });
  };

  //줄서기 요청들 조회
  findAllQue = async (store_id) => {
    return await this.Ques.findAll({
      where: { store_id },
    });
  };

  //스토어 좋아요 여부 찾기
  findOneUser = async (store_id, email) => {
    const like = await this.Users.findOne({
      where: { email },
      include: [
        {
          model: this.StoreLikes,
          attributes: ["storelike_id"],
          where: { store_id },
        },
      ],
    });

    return like;
  };

  //스토어상세조회
  findOneStoreInfo = async (store_id) => {
    return await this.Stores.findOne({
      where: { store_id },
    });
  };

  //스토어마이페이지수정
  updateStore = async (
    store_id,
    store,
    biz_photo,
    address,
    phone,
    notice,
    runtime
  ) => {
    return await this.Stores.update(
      { store, biz_photo, address, phone, notice, runtime },
      { where: { store_id } }
    );
  };

  //스토어위스키 조회
  findAllStoreWhisky = async (store_id) => {
    return await this.StoreWhiskys.findAll({
      where: { store_id },
      include: [
        {
          model: this.Whiskys,
          attributes: [
            "whisky_id",
            "whisky_photo",
            "whisky_kor",
            "whisky_eng",
            "whisky_abv",
          ],
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
  findStorewhisky = async (whisky_id, store_id) => {
    return await this.StoreWhiskys.findOne({
      where: { [Op.and]: [{ whisky_id }, { store_id }] },
    });
  };

  //스토어위스키 생성
  createStoreWhisky = async (store_id, whisky_id) => {
    return await this.StoreWhiskys.create({ store_id, whisky_id });
  };

  //스토어위스키 삭제
  deleteStoreWhisky = async (store_id, whisky_id) => {
    return await this.StoreWhiskys.destroy({
      where: { [Op.and]: [{ whisky_id }, { store_id }] },
    });
  };
}

module.exports = MypageRepository;
