const QueRepository = require("../repositories/que.repository");
const { Ques, Users } = require("../models");
class QueService {
  queRepository = new QueRepository(Ques, Users);

  //줄서기 요청들 조회
  findAllQue = async (store_id) => {
    return await this.queRepository.findAllQue(store_id);
  };

  //줄서기 찾기
  findQue = async (user_id, store_id) => {
    return await this.queRepository.findQue(user_id, store_id);
  };

  //줄서기 요청
  createQue = async (user_id, store_id, request, head_count) => {
    return await this.queRepository.createQue(
      user_id,
      store_id,
      request,
      head_count
    );
  };

  //줄서기 수정
  updateQue = async (user_id, store_id, request, head_count) => {
    return await this.queRepository.updateQue(
      user_id,
      store_id,
      request,
      head_count
    );
  };

  //줄서기 삭제
  deleteQue = async (user_id, store_id) => {
    return await this.queRepository.deleteQue(user_id, store_id);
  };
}

module.exports = QueService;
