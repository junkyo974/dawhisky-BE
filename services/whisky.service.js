const WhiskyRepository = require("../repositories/whisky.repository");
const { Whiskys, Reviews, StoreWhiskys, Stores } = require("../models");

class WhiskyService {
  whiskyRepository = new WhiskyRepository(
    Whiskys,
    Reviews,
    StoreWhiskys,
    Stores
  );

  //위스키 전체조회
  findAllWhisky = async () => {
    return await this.whiskyRepository.findAllWhisky();
  };

  //위스키 상세조회

  whiskyDetail = async (whisky_id) => {
    const whiskyDetail = await this.whiskyRepository.whiskyDetail(whisky_id);

    const findStoreName = await this.whiskyRepository.findStoreName(
      whiskyDetail.StoreWhiskys[0].store_id
    );
    const result = {
      whiskyDetail,
      Stores: [
        {
          store_id: findStoreName.store_id,
          store: findStoreName.store,
        },
      ],
    };

    return {
      whisky_id: result.whiskyDetail.whisky_id,
      whisky_photo: result.whiskyDetail.whisky_photo,
      whisky_eng: result.whiskyDetail.whisky_eng,
      whisky_kor: result.whiskyDetail.whisky_kor,
      whisky_country: result.whiskyDetail.whisky_country,
      whisky_region: result.whiskyDetail.whisky_region,
      whisky_age: result.whiskyDetail.whisky_age,
      whisky_type: result.whiskyDetail.whisky_type,
      whisky_taste: result.whiskyDetail.whisky_taste,
      Reviews: result.whiskyDetail.Reviews,
      Store: result.whiskyDetail.StoreWhiskys.map(
        (storeWhisky) => storeWhisky.Store
      ),
    };
  };

  // 위스키정보 생성
  createWhisky = async (whiskyData) => {
    return await this.whiskyRepository.createWhisky(whiskyData);
  };

  //위스키 찾기
  findWhiskyById = async (whisky_id) => {
    return await this.whiskyRepository.findOneWhisky(whisky_id);
  };

  //위스키정보 수정
  updateWhisky = async (whisky_id, whiskyData) => {
    return await this.whiskyRepository.updateWhisky(whisky_id, whiskyData);
  };

  //위스키정보 삭제
  deleteWhisky = async (whisky_id) => {
    await this.whiskyRepository.deleteWhisky(whisky_id);
  };
}

module.exports = WhiskyService;
