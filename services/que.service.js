const QueRepository = require("../repositories/que.repository");
const { Ques, Users } = require("../models");
const QueController = require("../controllers/que.controller");
class QueService {
  queRepository = new QueRepository(Ques, Users);

  //줄서기 요청들 조회
  findAllQue = async (store_id) => {
    return await this.queRepository.findAllQue(store_id);
  };

  findExistQue = async (store_id, user_id) => {
    return await this.queRepository.findMyQue(store_id, user_id);
  };

  //내 줄서기 현황 조회
  findMyQue = async (store_id, user_id) => {
    const myQue = await this.queRepository.findMyQue(store_id, user_id);
    const que_id = myQue.que_id;
    const que = await this.queRepository.findAllQue(store_id);

    const count = que.filter((que) => que.que_id <= que_id).length;

    return { myQue, count };
  };

  //줄서기 찾기
  findQue = async (que_id) => {
    return await this.queRepository.findQue(que_id);
  };

  //줄서기 요청
  createQue = async (
    user_id,
    store_id,
    request,
    head_count,
    want_table,
    device_token
  ) => {
    return await this.queRepository.createQue(
      user_id,
      store_id,
      request,
      head_count,
      want_table,
      device_token
    );
  };

  //줄서기 수정
  updateQue = async (que_id, request, head_count, want_table, device_token) => {
    return await this.queRepository.updateQue(
      que_id,
      request,
      head_count,
      want_table,
      device_token
    );
  };

  //줄서기 삭제
  deleteQue = async (que_id) => {
    return await this.queRepository.deleteQue(que_id);
  };
}

module.exports = QueService;
