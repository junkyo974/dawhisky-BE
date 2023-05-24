const WhiskyRepository = require("../repositories/whisky.repository");

class WhiskyService {
  whiskyRepository = new WhiskyRepository();

  // 위스키정보 생성
  createWhisky = async (whiskyData) => {
    return await this.postsRepository.createPost(whiskyData);
    console.log("왜안돼!~~~~~~~~~~~~~~~~~~~~");
  };
}

module.exports = WhiskyService;
