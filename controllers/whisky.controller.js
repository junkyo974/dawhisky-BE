const WhiskyService = require("../services/whisky.service");

class WhiskyController {
  whiskyService = new WhiskyService();

  //위스키정보 생성
  createWhisky = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
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

      if (user_id !== "관리자 아이디") {
        throw new Error("403/위스키 등록 권한이 없습니다.");
      }

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
      error.failedApi = "위스키 정보 생성";
      throw error;
    }
  };

  //위스키정보 수정
  updateWhisky = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;
      const {
        whisky_eng,
        whisky_kor,
        whisky_country,
        whisky_region,
        whisky_age,
        whisky_type,
        whisky_taste,
      } = req.body;

      if (user_id !== "관리자 아이디") {
        throw new Error("403/위스키 수정 권한이 없습니다.");
      }

      const whisky = await this.WhiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("403/위스키가 존재하지 않습니다.");
      }
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

      await this.whiskyService.updateWhisky(whisky_id, whiskyData);

      return res.status(200).json({ message: "위스키 정보를 수정했습니다." });
    } catch (error) {
      error.faiedApi = "위스키 정보 수정";
      throw error;
    }
  };
  //위스키 정보 삭제
  deleteRewiew = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;

      const whisky = await this.whiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("403/위스키가 존재하지 않습니다.");
      }

      if (user_id !== "관리자 아이디") {
        throw new Error("403/위스키 삭제 권한이 없습니다.");
      }

      await this.whiskyService.deleteRewiew(whisky_id);

      return res.status(200).json({ message: "위스키를 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "위스키 정보 삭제";
      throw error;
    }
  };
}

module.exports = WhiskyController;
