import { all } from "redux-saga/effects";
// import { followQuanLyNguoiDungSaga } from "./QuanLyNguoiDungSaga";
// import * as UserSaga from "./User/UserSaga";
import * as NguoiDung from "./QuanLyNguoiDungSaga";
export function* rootSaga() {
  yield all([
    // // sign up
    // UserSaga.followSignInUserSaga(),
    // // get user
    // UserSaga.followGetListUserSaga(),
    // // delete
    // UserSaga.followDeleteUserSaga(),
    // UserSaga.followEditUserSaga(),
    NguoiDung.followQuanLyNguoiDungSaga(),
  ]);
}
