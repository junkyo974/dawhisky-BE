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
  Ques,
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
    Stores,
    Ques
  );

  //마이페이지
  findAllInfoMypage = async (user_id) => {
    const MyInfo = await this.mypageRepository.findAllMyInfo(user_id);
    const result = MyInfo.map((info) => {
      return {
        user_id: info.user_id,
        name: info.name,
        whisky_likes: info.WhiskyLikes.map((like) => {
          return {
            whisky_id: like.whisky_id,
            whisky_kor: like.Whisky.whisky_kor,
            whisky_eng: like.Whisky.whisky_eng,
            whisky_photo: like.Whisky.whisky_photo,
            whisky_abv: like.Whisky.whisky_abv,
          };
        }),
        store_likes: info.StoreLikes.map((like) => {
          return {
            store_id: like.store_id,
            store: like.Store.store,
            address: like.Store.address,
            biz_photo: like.Store.biz_photo,
          };
        }),
        reviews: info.Reviews.map((review) => {
          return {
            review_id: review.review_id,
            content: review.content,
            whisky_id: review.whisky_id,
            whisky_kor: review.Whisky.whisky_kor,
            whisky_eng: review.Whisky.whisky_eng,
            whisky_photo: review.Whisky.whisky_photo,
            whisky_abv: review.Whisky.whisky_abv,
          };
        }),
      };
    });
    return result;
  };

  //내 모든 줄서기 현황 조회
  findAllMyQue = async (user_id) => {
    const myAllQue = await this.mypageRepository.findAllMyQue(user_id);

    const que = myAllQue.map(async (que) => {
      const count = await this.mypageRepository.findAllQue(que.store_id);
      const myTurn = count.filter(
        (storeQue) => storeQue.que_id <= que.que_id
      ).length;
      return {
        que_id: que.que_id,
        user_id: user_id,
        store_id: que.store_id,
        store: que.Store.store,
        request: que.request,
        head_count: que.head_count,
        want_table: que.want_table,
        device_token: que.device_token,
        myTurn: myTurn,
      };
    });
    const myQue = await Promise.all(que);
    return myQue;
  };

  //스토어상세조회
  getStoreMypageEmail = async (store_id, email) => {
    const storeLike = await this.mypageRepository.findOneUser(store_id, email);
    let liked = storeLike ? true : false;
    const storeInfo = await this.mypageRepository.findOneStoreInfo(store_id);
    return {
      liked: liked,
      store_id: storeInfo.store_id,
      email: storeInfo.email,
      store: storeInfo.store,
      biz_number: storeInfo.biz_number,
      biz_photo: storeInfo.biz_photo,
      slikes: storeInfo.slikes,
      password: storeInfo.password,
      address: storeInfo.address,
      phone: storeInfo.phone,
      notice: storeInfo.notice,
      runtime: storeInfo.runtime,
    };
  };

  getStoreMypage = async (store_id) => {
    return await this.mypageRepository.findOneStoreInfo(store_id);
  };

  //스토어마이페이지수정
  updateStore = async (
    store_id,
    store,
    biz_photo,
    address,
    phone,
    notice,
    runtime
  ) => {
    return await this.mypageRepository.updateStore(
      store_id,
      store,
      biz_photo,
      address,
      phone,
      notice,
      runtime
    );
  };

  //스토어위스키 조회
  getStoreWhisky = async (store_id) => {
    const whiskys = await this.mypageRepository.findAllStoreWhisky(store_id);
    const Whiskys = whiskys.map((whisky) => {
      return {
        store_id: whisky.store_id,
        storewhisky_id: whisky.storewhisky_id,
        whisky_id: whisky.whisky_id,
        count: whisky.count,
        whisky_photo: whisky.Whisky.whisky_photo,
        whisky_kor: whisky.Whisky.whisky_kor,
        whisky_eng: whisky.Whisky.whisky_eng,
        whisky_abv: whisky.Whisky.whisky_abv,
      };
    });
    return Whiskys;
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
  findStoreWhisky = async (whisky_id, store_id) => {
    return await this.mypageRepository.findStorewhisky(whisky_id, store_id);
  };

  //스토어위스키 생성
  createStoreWhisky = async (store_id, whisky_id) => {
    return await this.mypageRepository.createStoreWhisky(store_id, whisky_id);
  };

  //스토어위스키 삭제
  deleteStoreWhisky = async (store_id, whisky_id) => {
    return await this.mypageRepository.deleteStoreWhisky(store_id, whisky_id);
  };
}

module.exports = MyapgeService;
