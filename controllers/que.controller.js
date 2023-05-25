const QueService = require("../services/que.service");
class QueController {
  queService = new QueService();

  //줄서기 요청
  createQue = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { request, head_count } = req.body;
      const { store_id } = req.params;

      await this.queService.createQue(user_id, store_id, request, head_count);

      res.status(201).json({ message: "줄서기를 요청하였습니다." });
    } catch (error) {
      error.failedApi = "줄서기 요청";
      throw error;
    }
  };

  //줄서기 수정
  updateQue = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { request, head_count } = req.body;
      const { store_id } = req.params;

      const que = await this.queService.findQue(user_id, store_id);
      if (!que) {
        throw new Error("403/줄서기 요청이 존재하지 않습니다.");
      }

      await this.qudService.updateQue(user_id, store_id, request, head_count);

      return res.status(200).json({ message: "줄서기 요청을 수정했습니다." });
    } catch (error) {
      error.faiedApi = "줄서기 요청 수정";
      throw error;
    }
  };
  //줄서기 삭제
  deleteQue = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { store_id } = req.params;

      const que = await this.queService.findQue(user_id, store_id);
      if (!que) {
        throw new Error("403/줄서기 요청이 존재하지 않습니다.");
      }

      await this.queService.deleteQue(user_id, store_id);

      return res.status(200).json({ message: "테이블을 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "테이블 삭제";
      throw error;
    }
  };
}

module.exports = QueController;
