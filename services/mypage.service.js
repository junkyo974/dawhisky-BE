const MypageRepository = require("../repositories/mypage.repository");

class MyapgeService {
  mypageRepository = new MypageRepository();

  //마이페이지
  findAllInfoMypage = async (userId) => {
    const MyInfo = await this.mypageRepository.findAllMyInfo(userId);
    //결과가공하기
    console.log(MyInfo, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return MyInfo;
  };

  //점주페이지

  //테이블찾기
  findStoretableById = async (storetable_id) => {
    return await this.mypageRepository.findOneStoretable(store_id);
  };

  //스토어테이블 생성
  createTable = async (hall_table, bar_table) => {
    return await this.mypageRepository.createTable(hall_table, bar_table);
  };

  //스토어테이블 수정
  updateTable = async (storetable_id, hall_table, bar_table) => {
    return await this.mypageRepository.updateTable(
      storetable_id,
      hall_table,
      bar_table
    );
  };

  //스토어테이블 삭제
  deleteTable = async (storetable_id) => {
    await this.mypageRepository.deleteTable(storetable_id);
  };

  //스토어위스키 찾기
  findStorewhiskyById = async (storewhisky_id) => {
    return await this.mypageRepository.findStorewhiskyById(storewhisky_id);
  };

  //스토어위스키 생성
  createStoreWhisky = async (hall_table, bar_table) => {
    return await this.mypageRepository.createStoreWhisky(
      store_id,
      whisky_id,
      count
    );
  };

  //스토어위스키수정
  updateStoreWhisky = async (storewhisky_id, store_id, whisky_id, count) => {
    return await this.mypageRepository.updateStoreWhisky(
      storewhisky_id,
      store_id,
      whisky_id,
      count
    );
  };

  //스토어위스키 삭제
  deleteStoreWhisky = async (storewhisky_id) => {
    await this.mypageRepository.deleteStoreWhisky(storewhisky_id);
  };
}

module.exports = MyapgeService;
