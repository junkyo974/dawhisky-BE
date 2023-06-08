const MypageService = require("../services/mypage.service");

class MypageController {
  mypageService = new MypageService();

  //마이페이지
  mypage = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const mypage = await this.mypageService.findAllInfoMypage(user_id);
      res.status(200).json(mypage);
    } catch (error) {
      error.failedApi = "마이 페이지 조회";
      throw error;
    }
  };

  //유저가 스토어상세조회
  storePage = async (req, res, next) => {
    try {
      const { store_id } = req.params;
      const storeInfo = await this.mypageService.getStoreMypage(store_id);
      if (!storeInfo) {
        throw new Error("404/스토어가 존재하지 않습니다.");
      }
      res.status(200).json(storeInfo);
    } catch (error) {
      error.failedApi = "스토어 상세 조회";
      throw error;
    }
  };

  //점주가 스토어상세조회
  storeMypage = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const storeInfo = await this.mypageService.getStoreMypage(store_id);
      if (!storeInfo) {
        throw new Error("404/스토어가 존재하지 않습니다.");
      }
      res.status(200).json(storeInfo);
    } catch (error) {
      error.failedApi = "스토어 상세 조회";
      throw error;
    }
  };

  //스토어마이페이지수정
  UpdatestoreMypage = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { store, address, phone, notice, runtime, biz_photo } = req.body;
      const storeInfo = await this.mypageService.getStoreMypage(store_id);
      if (!storeInfo) {
        throw new Error("404/스토어가 존재하지 않습니다.");
      }
      await this.mypageService.updateStore(
        store_id,
        store,
        biz_photo,
        address,
        phone,
        notice,
        runtime
      );

      return res.status(200).json({ message: "스토어 정보를 수정했습니다." });
    } catch (error) {
      error.faiedApi = "스토어 정보 수정";
      throw error;
    }
  };

  //스토어위스키 조회
  getStoreWhisky = async (req, res, next) => {
    try {
      const { store_id } = req.params;
      const storeWhisky = await this.mypageService.getStoreWhisky(store_id);
      const storeInfo = await this.mypageService.getStoreMypage(store_id);
      if (!storeInfo) {
        throw new Error("404/스토어가 존재하지 않습니다.");
      }
      res.status(200).json(storeWhisky);
    } catch (error) {
      error.failedApi = "스토어위스키 조회";
      throw error;
    }
  };

  //스토어테이블 조회
  getStoreTable = async (req, res, next) => {
    try {
      const { store_id } = req.params;
      const storeInfo = await this.mypageService.getStoreMypage(store_id);
      if (!storeInfo) {
        throw new Error("404/스토어가 존재하지 않습니다.");
      }
      const storeTable = await this.mypageService.getStoreTable(store_id);
      res.status(200).json(storeTable);
    } catch (error) {
      error.failedApi = "스토어테이블 조회";
      throw error;
    }
  };

  //스토어테이블 생성
  createTable = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { hall_table, bar_table } = req.body;

      const storetable = await this.mypageService.findStoretableById(store_id);
      if (storetable) {
        throw new Error("412/이미 스토어테이블을 생성하였습니다.");
      }

      await this.mypageService.createTable(store_id, hall_table, bar_table);

      res.status(200).json({ message: "테이블을 생성하였습니다." });
    } catch (error) {
      error.failedApi = "테이블 생성";
      throw error;
    }
  };

  //스토어테이블 수정
  updateTable = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { hall_table, bar_table } = req.body;

      const storetable = await this.mypageService.findStoretableById(store_id);
      if (!storetable) {
        throw new Error("404/테이블이 존재하지 않습니다.");
      }
      await this.mypageService.updateTable(
        storetable.storetable_id,
        store_id,
        hall_table,
        bar_table
      );

      return res.status(200).json({ message: "테이블을 수정했습니다." });
    } catch (error) {
      error.faiedApi = "테이블 수정";
      throw error;
    }
  };

  //스토어테이블 삭제
  deleteTable = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;

      const storetable = await this.mypageService.findStoretableById(store_id);
      if (!storetable) {
        throw new Error("404/테이블이 존재하지 않습니다.");
      }

      await this.mypageService.deleteTable(storetable.storetable_id);

      return res.status(200).json({ message: "테이블을 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "테이블 삭제";
      throw error;
    }
  };

  //스토어위스키 생성
  createStoreWhisky = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { whisky_id, count } = req.body;

      const whisky = await this.mypageService.findWhisky(whisky_id);
      const storeWhisky = await this.mypageService.findStoreWhisky(
        whisky_id,
        store_id
      );
      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }
      if (storeWhisky) {
        throw new Error("412/이미 등록된 스토어위스키 입니다.");
      }

      await this.mypageService.createStoreWhisky(store_id, whisky_id, count);

      res.status(200).json({ message: "위스키목록을 추가하였습니다." });
    } catch (error) {
      error.failedApi = "위스키목록 추가";
      throw error;
    }
  };

  //스토어위스키수정
  updateStoreWhisky = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { count } = req.body;
      const { whisky_id } = req.params;

      const whisky = await this.mypageService.findWhisky(whisky_id);

      if (!whisky) {
        throw new Error("404/위스키가 존재하지 않습니다.");
      }
      const storeWhisky = await this.mypageService.findStoreWhisky(
        whisky_id,
        store_id
      );

      if (!storeWhisky) {
        throw new Error("412/위스키목록이 존재하지 않습니다.");
      }
      await this.mypageService.updateStoreWhisky(store_id, whisky_id, count);

      return res.status(200).json({ message: "위스키목록을 수정했습니다." });
    } catch (error) {
      error.faiedApi = "위스키목록 수정";
      throw error;
    }
  };

  //스토어위스키 삭제
  deleteStoreWhisky = async (req, res, next) => {
    try {
      const { store_id } = res.locals.store;
      const { whisky_id } = req.params;

      const storeWhisky = await this.mypageService.findStoreWhisky(
        whisky_id,
        store_id
      );

      if (!storeWhisky) {
        throw new Error("412/위스키목록이 존재하지 않습니다.");
      }
      await this.mypageService.deleteStoreWhisky(store_id, whisky_id);

      return res.status(200).json({ message: "위스키목록을 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "위스키목록 삭제";
      throw error;
    }
  };
}

module.exports = MypageController;
