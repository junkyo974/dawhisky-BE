const sequelize = require("sequelize");
const { Op } = require("sequelize");

class WhiskyRepository {
  constructor(
    Whiskys,
    Reviews,
    StoreWhiskys,
    Stores,
    WhiskyLikes,
    Users,
    Searches
  ) {
    this.Whiskys = Whiskys;
    this.Reviews = Reviews;
    this.StoreWhiskys = StoreWhiskys;
    this.Stores = Stores;
    this.WhiskyLikes = WhiskyLikes;
    this.Users = Users;
    this.Searches = Searches;
  }

  //위스키 검색
  searchAllWhiskyEng = async (keyword) => {
    return await this.Whiskys.findAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      where: {
        whisky_eng: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
  };
  searchAllWhiskyKor = async (keyword) => {
    return await this.Whiskys.findAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      where: {
        whisky_kor: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
  };
  //위스키 인기검색 조회
  findAllWhiskyTrending = async () => {
    return await this.Searches.findAll({
      order: [["count", "DESC"]],
      limit: 10,
      include: [
        {
          model: this.Whiskys,
          attributes: [
            "whisky_kor",
            "whisky_eng",
            "whisky_photo",
            "whisky_abv",
          ],
        },
      ],
    });
  };

  //위스키 초보자 추천 조회
  findAllWhiskyBeginner = async () => {
    const whiskyIDs = [
      "1. 글렌모렌지 오리지널(glenmorangie original) -1241",
      "2. 글렌피딕 12년(glenfiddich 12y) -775",
      "3. 발베니 12년(balvenie 12y)더블우드 -745",
      "4. 보모어 12년(bow more 12y) -757",
      "5. 글렌킨치 12년(glenkinchie 12y) -829",
      "6. 하이랜드 파크 12년(highland park 12y) -742",
      "7. 글렌드로낙 12년(glendronach 12y) -1120",
      "8. 메이커스 마크(maker’s mark) -796",
      "9. 와일드 터키101(wild turkey 101) -891",
      "10. 제임슨 스탠다드(Jameson standard) -1230",
      "11. 캐내디언 클럽 12년(Canadian club 12y) -1351",
      "12. 버팔로 트레이스(buffalo trace) -980",
      "13. 페이머스 그라우스(famous grouse) -1121",
      "14. 조니워커 블랙라벨(Johnnie walker black label) -959",
      "15. 오반 14년(oban 14y) -774",
    ];

    const whiskyIDsOnly = whiskyIDs.map((whisky) => {
      const parts = whisky.split("-");
      return parts[parts.length - 1].trim();
    });

    const beginnerOptions = {
      whisky_id: {
        [Op.or]: [whiskyIDsOnly],
      },
    };
    return await this.Whiskys.findAll({ where: beginnerOptions });
  };

  //인기검색어
  updateSearch = async (whisky_id) => {
    const existSearch = await this.Searches.findOne({ where: { whisky_id } });
    if (!existSearch) {
      await this.Searches.create({
        whisky_id,
      });
    }
    await this.Searches.increment("count", {
      where: { whisky_id },
    });
  };

  //위스키 전체조회 + 필터
  findPaginatedWhiskies = async (
    offset,
    pageSize,
    whisky_country,
    whisky_region,
    whisky_type,
    like
  ) => {
    const filterOptions = {};
    const orderOptions = [];

    if (like == "y") {
      orderOptions.push(["wlikes", "DESC"]);
    } else {
      orderOptions.push(["whisky_id", "ASC"]);
    }

    if (whisky_country) {
      if (whisky_country == "etc") {
        filterOptions.whisky_country = {
          [Op.or]: [
            { [Op.eq]: null },
            {
              [Op.notIn]: ["Scotland", "usa", "Ireland", "Japan", "Canada"],
            },
          ],
        };
      } else {
        filterOptions.whisky_country = {
          [Op.like]: `%${whisky_country}%`,
        };
      }
    }

    if (whisky_region) {
      if (whisky_region == "etc") {
        filterOptions.whisky_region = {
          [Op.or]: [
            { [Op.eq]: null },
            {
              [Op.notIn]: [
                "Speyside",
                "Highlands",
                "Lowlands",
                "Campbeltown",
                "Islay",
              ],
            },
          ],
        };
      } else {
        filterOptions.whisky_region = { [Op.like]: `%${whisky_region}%` };
      }
    }

    if (whisky_type) {
      if (whisky_type == "etc") {
        filterOptions.whisky_type = {
          [Op.or]: [
            { [Op.eq]: null },
            {
              [Op.and]: [
                {
                  [Op.notIn]: [
                    "Single Malt Whisky",
                    "Single Grain Whisky",
                    "Blended Malt Whisky",
                    "Blended Whisky",
                  ],
                  [Op.and]: [
                    { [Op.notLike]: "%Bourbon%" },
                    { [Op.notLike]: "%Rye%" },
                    { [Op.notLike]: "%Tennessee%" },
                  ],
                },
              ],
            },
          ],
        };
      } else {
        filterOptions.whisky_type = {
          [Op.like]: `%${whisky_type}%`,
        };
      }
    }

    return await this.Whiskys.findAndCountAll({
      attributes: [
        "whisky_id",
        "whisky_kor",
        "whisky_eng",
        "whisky_photo",
        "whisky_abv",
      ],
      where: filterOptions,
      order: orderOptions,
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
    return await this.StoreWhiskys.findAll({
      where: { whisky_id },
      include: [
        {
          model: this.Stores,
          attributes: ["store_id", "biz_photo", "store", "address"],
        },
      ],
    });
  };

  //위스키 코멘트 조회
  findAllWhiskyComment = async (whisky_id) => {
    return await this.Reviews.findAll({
      where: { whisky_id },
      include: [
        {
          model: this.Users,
          attributes: ["email"],
        },
      ],
    });
  };
}

module.exports = WhiskyRepository;
