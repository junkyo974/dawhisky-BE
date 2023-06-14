const { Op } = require("sequelize");
const sequelize = require("sequelize");

class QueRepository {
  constructor(Ques, Users) {
    this.Ques = Ques;
    this.Users = Users;
  }

  //줄서기 요청들 조회
  findAllQue = async (store_id) => {
    return await this.Ques.findAll({
      where: { store_id },
      include: [
        {
          model: this.Users,
          attributes: ["name"],
        },
      ],
    });
  };

  //내 줄서기 현황 조회
  findMyQue = async (store_id, user_id) => {
    return await this.Ques.findOne({
      where: { store_id, user_id },
    });
  };

  //줄서기 찾기
  findQue = async (que_id) => {
    return await this.Ques.findOne({
      where: { que_id },
    });
  };

  //줄서기 요청
  createQue = async (user_id, store_id, request, head_count, want_table) => {
    return await this.Ques.create({
      user_id,
      store_id,
      request,
      head_count,
      want_table,
    });
  };

  //줄서기 수정
  updateQue = async (que_id, request, head_count, want_table) => {
    return await this.Ques.update(
      {
        request,
        head_count,
        want_table,
      },
      {
        where: { que_id },
      }
    );
  };

  //줄서기 삭제
  deleteQue = async (que_id) => {
    return await this.Ques.destroy({
      where: { que_id },
    });
  };
}

module.exports = QueRepository;
