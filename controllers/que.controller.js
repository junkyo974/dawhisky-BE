const QueService = require("../services/que.service");

class QueController {
  queService = new QueService();

  //줄서기 요청들 조회
  getQue = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;

      let getQue = await this.queService.findAllQue(store_id);
      if (!getQue) {
        getQue = {};
      }

      res.status(200).json(getQue);
    } catch (error) {
      error.failedApi = "줄서기 요청";
      throw error;
    }
  };

  //내 줄서기 현황 조회
  getMyQue = async (req, res, next) => {
    try {
      const { store_id } = req.params;
      const { user_id } = res.locals.user;

      let myQue = await this.queService.findExistQue(store_id, user_id);
      if (!myQue) {
        myQue = {};
      }
      res.status(200).json(myQue);
    } catch (error) {
      error.failedApi = "줄서기 요청";
      throw error;
    }
  };

  //줄서기 요청
  createQue = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { request, head_count, want_table, device_token } = req.body;
      const { store_id } = req.params;
      const que = await this.queService.findExistQue(store_id, user_id);
      if (que) {
        throw new Error("404/이미 줄서기를 요청하였습니다.");
      }
      if (
        want_table !== "hall" &&
        want_table !== "bar" &&
        want_table !== "dontCare"
      ) {
        throw new Error("412/올바른 테이블 형식을 지정해주세요.");
      }

      await this.queService.createQue(
        user_id,
        store_id,
        request,
        head_count,
        want_table,
        device_token
      );

      return res.status(200).json({ message: "줄서기를 요청하였습니다." });
    } catch (error) {
      error.failedApi = "줄서기 요청";
      throw error;
    }
  };

  //줄서기 수정
  updateQue = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { request, head_count, want_table, device_token } = req.body;
      const { que_id } = req.params;

      const que = await this.queService.findQue(que_id);
      if (!que) {
        throw new Error("404/줄서기 요청이 존재하지 않습니다.");
      }
      if (
        want_table !== "hall" &&
        want_table !== "bar" &&
        want_table !== "dontCare"
      ) {
        throw new Error("412/올바른 테이블 형식을 지정해주세요.");
      }

      await this.queService.updateQue(
        que_id,
        request,
        head_count,
        want_table,
        device_token
      );

      return res.status(200).json({ message: "줄서기 요청을 수정했습니다." });
    } catch (error) {
      error.faiedApi = "줄서기 요청 수정";
      throw error;
    }
  };
  //줄서기 삭제
  deleteQue = async (req, res, next) => {
    try {
      let user_id;
      let store_id;

      if (res.locals.user) {
        user_id = res.locals.user.user_id;
      } else if (res.locals.store) {
        store_id = res.locals.store.store_id;
      } else {
        throw new Error("403/로그인이 필요한 기능입니다.");
      }
      const { que_id } = req.params;

      const que = await this.queService.findQue(que_id);
      if (!que) {
        throw new Error("404/줄서기 요청이 존재하지 않습니다.");
      }
      if (user_id == que.user_id || store_id == que.store_id) {
        await this.queService.deleteQue(que_id);

        return res.status(200).json({ message: "테이블을 삭제하였습니다." });
      } else {
        throw new Error("404/줄서기 요청 권한이 존재하지 않습니다.");
      }
    } catch (error) {
      error.faiedApi = "테이블 삭제";
      throw error;
    }
  };
}

module.exports = QueController;
