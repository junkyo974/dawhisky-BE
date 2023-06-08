const sequelize = require("sequelize");
const { Op } = require("sequelize");

class WhiskyRepository {
  constructor(Whiskys, Reviews, StoreWhiskys, Stores, WhiskyLikes, Users) {
    this.Whiskys = Whiskys;
    this.Reviews = Reviews;
    this.StoreWhiskys = StoreWhiskys;
    this.Stores = Stores;
    this.WhiskyLikes = WhiskyLikes;
    this.Users = Users;
  }

  //위스키 검색
  searchAllWhiskyEng = async (keyword) => {
    return await this.Whiskys.findAll({
      attributes: ["whisky_eng", "whisky_id"],
      where: {
        whisky_eng: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
  };
  searchAllWhiskyKor = async (keyword) => {
    return await this.Whiskys.findAll({
      attributes: ["whisky_kor", "whisky_id"],
      where: {
        whisky_kor: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
  };

  //위스키 필터
  filterWhisky = async (whisky_country) => {
    return await this.Whiskys.findAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      where: { whisky_country },
    });
  };

  filterWhiskyEtc = async () => {
    return await this.Whiskys.findAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      where: {
        [Op.and]: [
          { whisky_country: { [Op.ne]: "Scotland" } },
          { whisky_country: { [Op.ne]: "usa" } },
          { whisky_country: { [Op.ne]: "Ireland" } },
        ],
      },
    });
  };

  findPaginatedWhiskies = async (offset, pageSize) => {
    return await this.Whiskys.findAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      limit: pageSize,
      offset: offset,
    });
  };
  //위스키 좋아요 여부 찾기
  findOneUser = async (whisky_id, email) => {
    const like = await this.Users.findOne({
      where: { email },
      include: [
        {
          model: this.WhiskyLikes,
          attributes: ["whiskylike_id"],
          where: { whisky_id },
        },
      ],
    });

    return like;
  };

  //위스키 찾기
  findOneWhisky = async (whisky_id) => {
    return await this.Whiskys.findOne({
      where: { whisky_id },
    });
  };

  //위스키 보유 스토어 조회
  findAllWhiskyStore = async (whisky_id) => {
    return await this.StoreWhiskys.findOne({
      where: { whisky_id },
      include: [
        {
          model: this.Stores,
          attributes: ["store"],
        },
      ],
    });
  };

  //위스키 코멘트 조회
  findAllWhiskyComment = async (whisky_id) => {
    return await this.Reviews.findOne({
      where: { whisky_id },
    });
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
