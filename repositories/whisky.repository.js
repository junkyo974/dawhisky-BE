const sequelize = require("sequelize");
const { Op } = require("sequelize");

class WhiskyRepository {
  constructor(Whiskys, Reviews, StoreWhiskys, Stores) {
    this.Whiskys = Whiskys;
    this.Reviews = Reviews;
    this.StoreWhiskys = StoreWhiskys;
    this.Stores = Stores;
  }

  //위스키 검색
  searchAllWhisky = async (keyword) => {
    return await this.Whiskys.findAll({
      where: {
        [Op.or]: [
          {
            whisky_kor: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            whisky_eng: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            whisky_country: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            whisky_region: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            whisky_age: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            whisky_type: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
  };

  //위스키 전체조회
  findAllWhisky = async () => {
    return await this.Whiskys.findAll({
      attributes: ["whisky_id", "whisky_kor"],
    });
  };

  // 위스키 상세조회
  whiskyDetail = async (whisky_id) => {
    const whiskyDetail = await this.Whiskys.findOne({
      where: { whisky_id },
      include: [
        {
          model: this.Reviews,
          attributes: ["content"],
        },
        {
          model: this.StoreWhiskys,
          include: [
            {
              model: this.Stores,
              attributes: ["store_id", "store"],
            },
          ],
        },
      ],
    });

    return whiskyDetail;
  };

  // 스토어이름찾기
  findStoreName = async (store_id) => {
    return await this.Stores.findOne({
      where: { store_id },
      attributes: ["store_id", "store"],
    });
  };

  //위스키 찾기
  findOneWhisky = async (whisky_id) => {
    return await this.Whiskys.findOne({ where: { whisky_id } });
  };

  //위스키정보 생성
  createWhisky = async (whiskyData) => {
    return await this.Whiskys.create({
      whisky_photo: whiskyData.whisky_photo,
      whisky_eng: whiskyData.whisky_eng,
      whisky_kor: whiskyData.whisky_kor,
      whisky_country: whiskyData.whisky_country,
      whisky_region: whiskyData.whisky_region,
      whisky_age: whiskyData.whisky_age,
      whisky_type: whiskyData.whisky_type,
      whisky_desc: whiskyData.whisky_desc,
      whisky_abv: whiskyData.whisky_abv,
    });
  };

  //위스키정보 수정
  updateWhisky = async (whisky_id, whiskyData) => {
    return await this.Whiskys.update(
      {
        whisky_photo: whiskyData.whisky_photo,
        whisky_eng: whiskyData.whisky_eng,
        whisky_kor: whiskyData.whisky_kor,
        whisky_country: whiskyData.whisky_country,
        whisky_region: whiskyData.whisky_region,
        whisky_age: whiskyData.whisky_age,
        whisky_type: whiskyData.whisky_type,
        whisky_desc: whiskyData.whisky_desc,
        whisky_abv: whiskyData.whisky_abv,
      },
      { where: { whisky_id } }
    );
  };

  //위스키정보 삭제
  deleteWhisky = async (whisky_id) => {
    return await this.Whiskys.destroy({ where: { whisky_id } });
  };
}

module.exports = WhiskyRepository;
