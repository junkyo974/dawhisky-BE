const MypageRepository = require("../repositories/mypage.repository");
const {
  Users,
  WhiskyLikes,
  StoreLikes,
  Reviews,
  StoreTables,
  StoreWhiskys,
  Whiskys,
  Stores,
} = require("../models");

class MyapgeService {
  mypageRepository = new MypageRepository(
    Users,
    WhiskyLikes,
    StoreLikes,
    Reviews,
    StoreTables,
    StoreWhiskys,
    Whiskys,
    Stores
  );

  //마이페이지
  findAllInfoMypage = async (user_id) => {
    const MyInfo = await this.mypageRepository.findAllMyInfo(user_id);
    //결과가공하기
    console.log(MyInfo, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return MyInfo;
  };

  //점주페이지

  //스토어위스키 조회
  getStoreWhisky = async (store_id) => {
    return await this.mypageRepository.findAllStoreWhisky(store_id);
  };

  //스토어테이블 조회
  getStoreTable = async (store_id) => {
    return await this.mypageRepository.findOneStoreTable(store_id);
  };

  //테이블찾기
  findStoretableById = async (store_id) => {
    return await this.mypageRepository.findOneStoretable(store_id);
  };

  //스토어테이블 생성
  createTable = async (store_id, hall_table, bar_table) => {
    return await this.mypageRepository.createTable(
      store_id,
      hall_table,
      bar_table
    );
  };

  //스토어테이블 수정
  updateTable = async (storetable_id, store_id, hall_table, bar_table) => {
    return await this.mypageRepository.updateTable(
      storetable_id,
      store_id,
      hall_table,
      bar_table
    );
  };

  //스토어테이블 삭제
  deleteTable = async (storetable_id) => {
    return await this.mypageRepository.deleteTable(storetable_id);
  };

  //위스키 찾기
  findWhisky = async (whisky_id) => {
    return await this.mypageRepository.findWhisky(whisky_id);
  };

  //스토어위스키 찾기
  findStorewhiskyById = async (storewhisky_id) => {
    return await this.mypageRepository.findStorewhiskyById(storewhisky_id);
  };

  //스토어위스키 생성
  createStoreWhisky = async (store_id, whisky_id, count) => {
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
    console.log(
      storewhisky_id,
      "here~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~"
    );
    return await this.mypageRepository.deleteStoreWhisky(storewhisky_id);
  };
}

module.exports = MyapgeService;
