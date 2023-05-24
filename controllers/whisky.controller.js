const WhiskyService = require("../services/whisky.service");

class WhiskyController {
  whiskyService = new WhiskyService();

  //위스키정보 생성
  createWhisky = async (req, res) => {
    try {
      const {
        whisky_eng,
        whisky_kor,
        whisky_country,
        whisky_region,
        whisky_age,
        whisky_type,
        whisky_taste,
      } = req.body;
      const { whisky_photo } = req;

      const whiskyData = {
        whisky_photo,
        whisky_eng,
        whisky_kor,
        whisky_country,
        whisky_region,
        whisky_age,
        whisky_type,
        whisky_taste,
      };

      await this.whiskyService.createWhisky(whiskyData);

      res.status(200).json({ message: "위스키정보를 생성하였습니다." });
    } catch (error) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: "위스키정보 생성에 실패하였습니다." });
    }
  };
}

module.exports = WhiskyController;
