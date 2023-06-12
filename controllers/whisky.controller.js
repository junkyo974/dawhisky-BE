const WhiskyService = require("../services/whisky.service");
const redisClient = require("../utils/redis.js");

class WhiskyController {
  whiskyService = new WhiskyService();

  //위스키 검색
  searchWhisky = async (req, res, next) => {
    try {
      const { keyword } = req.params;
      const searchWhisky = await this.whiskyService.searchWhisky(keyword);

      res.status(200).json(searchWhisky);
    } catch (error) {
      error.failedApi = "위스키 검색";
      throw error;
    }
  };

  //위스키 전체조회 + 필터
  paginatedWhiskies = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const offset = (page - 1) * pageSize;
      const whisky_country = req.query.country;
      const whisky_region = req.query.region;
      const whisky_type = req.query.type;
      const countries = ["Scotland", "usa", "Ireland", "etc"];
      const regions = [
        "Speyside",
        "Highlands",
        "Lowlands",
        "Campbeltown",
        "Islay",
        "etc",
      ];
      const types = [
        "Single Malt Whisky",
        "Single Grain Whisky",
        "Blended Malt Whisky",
        "Bourbon",
        "Rye",
        "Tennessee",
        "etc",
      ];

      if (
        !countries.includes(whisky_country) &&
        !regions.includes(whisky_region) &&
        !types.includes(whisky_type)
      ) {
        throw new Error("412/올바른 필터명을 입력해주세요.");
      }

      const whiskies = await this.whiskyService.findPaginatedWhiskies(
        offset,
        pageSize,
        whisky_country,
        whisky_region,
        whisky_type
      );

      res.status(200).json(whiskies);
    } catch (error) {
      console.log(error);
      error.failedApi = "위스키 조회";
      throw error;
    }
  };

  //위스키 상세조회
  whiskyDetail = async (req, res, next) => {
    try {
      const { whisky_id } = req.params;
      const jwt = require("jsonwebtoken");
      require("dotenv").config();
      let email = "aaa";

      let { authorization, refreshtoken } = req.headers;

      authorization = !req.headers.refreshtoken
        ? req.cookies.authorization
        : authorization;

      if (authorization) {
        const [authType, authToken] = (authorization ?? "").split(" ");

        const decodedToken = jwt.verify(authToken, process.env.USER_ACCESS_KEY);
        email = decodedToken.email;
      }
      const whiskyDetail = await this.whiskyService.whiskyDetail(
        whisky_id,
        email
      );
      if (!whiskyDetail) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }

      res.status(200).json(whiskyDetail);
    } catch (error) {
      error.failedApi = "위스키 상세 조회";
      throw error;
    }
  };

  //위스키 보유 스토어 조회
  whiskyStore = async (req, res, next) => {
    try {
      const { whisky_id } = req.params;
      const whisky = await this.whiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }
      const whiskyStore = await this.whiskyService.whiskyStore(whisky_id);

      res.status(200).json(whiskyStore);
    } catch (error) {
      error.failedApi = "위스키 보유 스토어 조회";
      throw error;
    }
  };

  //위스키 코멘트 조회
  whiskyComment = async (req, res, next) => {
    try {
      const { whisky_id } = req.params;
      const whisky = await this.whiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }
      const whiskyComment = await this.whiskyService.whiskyComment(whisky_id);

      res.status(200).json(whiskyComment);
    } catch (error) {
      error.failedApi = "위스키 코멘트 조회";
      throw error;
    }
  };

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
        whisky_photo,
        whisky_desc,
        whisky_abv,
      } = req.body;

      // if (user_id !== "관리자 아이디") {
      //   throw new Error("404/위스키 등록 권한이 없습니다.");
      // }

      const whiskyData = {
        whisky_photo,
        whisky_eng,
        whisky_kor,
        whisky_country,
        whisky_region,
        whisky_age,
        whisky_type,
        whisky_desc,
        whisky_abv,
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
        whisky_photo,
        whisky_desc,
        whisky_abv,
      } = req.body;

      // if (user_id !== "관리자 아이디") {
      //   throw new Error("404/위스키 수정 권한이 없습니다.");
      // }

      const whisky = await this.whiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }
      const whiskyData = {
        whisky_photo,
        whisky_eng,
        whisky_kor,
        whisky_country,
        whisky_region,
        whisky_age,
        whisky_type,
        whisky_desc,
        whisky_abv,
      };

      await this.whiskyService.updateWhisky(whisky_id, whiskyData);

      return res.status(200).json({ message: "위스키 정보를 수정했습니다." });
    } catch (error) {
      error.faiedApi = "위스키 정보 수정";
      throw error;
    }
  };
  //위스키 정보 삭제
  deleteWhisky = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;

      const whisky = await this.whiskyService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }

      // if (user_id !== "관리자 아이디") {
      //   throw new Error("403/위스키 삭제 권한이 없습니다.");
      // }

      await this.whiskyService.deleteWhisky(whisky_id);

      return res.status(200).json({ message: "위스키를 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "위스키 정보 삭제";
      throw error;
    }
  };
}

module.exports = WhiskyController;
