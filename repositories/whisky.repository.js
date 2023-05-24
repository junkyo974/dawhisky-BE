const sequelize = require("sequelize");

class WhiskyRepository {
  constructor(whiskyModel) {
    this.whiskyModel = whiskyModel;
  }

  //위스키정보 생성
  createWhisky = async (
    whisky_photo,
    whisky_eng,
    whisky_kor,
    whisky_country,
    whisky_region,
    whisky_age,
    whisky_type,
    whisky_taste
  ) => {
    return await this.whiskyModel.create({
      whisky_Photo,
      whisky_eng,
      whisky_kor,
      whisky_country,
      whisky_region,
      whisky_age,
      whisky_type,
      whisky_taste,
    });
  };
}

module.exports = WhiskyRepository;
