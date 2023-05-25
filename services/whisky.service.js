const WhiskyRepository = require("../repositories/whisky.repository");

class WhiskyService {
  whiskyRepository = new WhiskyRepository();

  // 위스키정보 생성
  createWhisky = async (whiskyData) => {
    console.log("왜안돼!~~~~~~~~~~~~~~~~~~~~");
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
