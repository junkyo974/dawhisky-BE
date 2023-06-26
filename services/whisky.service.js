const WhiskyRepository = require("../repositories/whisky.repository");
const {
  Whiskys,
  Reviews,
  StoreWhiskys,
  Stores,
  WhiskyLikes,
  Users,
  Searches,
} = require("../models");

class WhiskyService {
  whiskyRepository = new WhiskyRepository(
    Whiskys,
    Reviews,
    StoreWhiskys,
    Stores,
    WhiskyLikes,
    Users,
    Searches
  );

  //위스키 검색
  searchWhisky = async (keyword) => {
    let whiskys;
    if (/[a-zA-Z]/.test(keyword)) {
      whiskys = await this.whiskyRepository.searchAllWhiskyEng(keyword);
    } else {
      whiskys = await this.whiskyRepository.searchAllWhiskyKor(keyword);
    }
    return whiskys;
  };

  //위스키 인기검색 조회
  whiskyTrending = async () => {
    const whiskys = await this.whiskyRepository.findAllWhiskyTrending();
    const Whiskys = whiskys.map((whisky) => {
      return {
        whisky_id: whisky.whisky_id,
        count: whisky.count,
        whisky_photo: whisky.Whisky.whisky_photo,
        whisky_kor: whisky.Whisky.whisky_kor,
        whisky_eng: whisky.Whisky.whisky_eng,
        whisky_abv: whisky.Whisky.whisky_abv,
      };
    });
    return Whiskys;
  };

  //위스키 초보자 추천 조회
  whiskyBeginner = async () => {
    const whiskys = await this.whiskyRepository.findAllWhiskyBeginner();
    const Whiskys = whiskys.map((whisky) => {
      return {
        whisky_id: whisky.whisky_id,
        whisky_photo: whisky.whisky_photo,
        whisky_kor: whisky.whisky_kor,
        whisky_eng: whisky.whisky_eng,
        whisky_abv: whisky.whisky_abv,
      };
    });
    return Whiskys;
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
    const whiskys = await this.whiskyRepository.findPaginatedWhiskies(
      offset,
      pageSize,
      whisky_country,
      whisky_region,
      whisky_type,
      like
    );

    return [...whiskys.rows, Math.ceil(whiskys.count / pageSize)];
  };

  //위스키 상세조회
  whiskyDetail = async (whisky_id, email, search) => {
    const whiskyLike = await this.whiskyRepository.findOneUser(
      whisky_id,
      email
    );
    let liked = whiskyLike ? true : false;
    const whiskyInfo = await this.whiskyRepository.findOneWhisky(whisky_id);
    if (search) {
      this.whiskyRepository.updateSearch(whisky_id);
    }
    return { liked, whiskyInfo };
  };

  //위스키 보유 스토어 조회
  whiskyStore = async (whisky_id) => {
    const stores = await this.whiskyRepository.findAllWhiskyStore(whisky_id);
    const Stores = stores.map((store) => {
      return {
        store_id: store.Store.store_id,
        biz_photo: store.Store.biz_photo,
        whisky_id: store.Store.whisky_id,
        store: store.Store.store,
        address: store.Store.address,
      };
    });
    return Stores;
  };

  //위스키 코멘트 조회
  whiskyComment = async (whisky_id) => {
    return await this.whiskyRepository.findAllWhiskyComment(whisky_id);
  };

  //위스키 찾기
  findWhiskyById = async (whisky_id) => {
    return await this.whiskyRepository.findOneWhisky(whisky_id);
  };
}

module.exports = WhiskyService;
