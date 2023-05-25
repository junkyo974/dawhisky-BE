const { Op } = require("sequelize");
const sequelize = require("sequelize");

class QueRepository {
  constructor(Ques) {
    this.Ques = Ques;
  }

  //줄서기 찾기
  findQue = async (user_id, store_id) => {
    return await this.Ques.findOne({
      where: {
        [Op.and]: [{ user_id }, { store_id }],
      },
    });
  };

  //줄서기 요청
  createQue = async (user_id, store_id, request, head_count) => {
    return await this.Que.create(user_id, store_id, request, head_count);
  };

  //줄서기 수정
  updateQue = async (user_id, store_id, request, head_count) => {
    return await this.Que.update(
      {
        request,
        head_count,
      },
      {
        where: {
          [Op.and]: [{ user_id }, { store_id }],
        },
      }
    );
  };

  //줄서기 삭제
  deleteQue = async (user_id, store_id) => {
    return await this.Que.destroy({
      where: {
        [Op.and]: [{ user_id }, { store_id }],
      },
    });
  };
}

module.exports = QueRepository;
