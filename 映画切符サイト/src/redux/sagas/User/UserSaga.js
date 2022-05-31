// import { message } from "antd";
// import { call, delay, put, select, takeLatest } from "redux-saga/effects";
// import { userService } from "../../../services/UserService/UserService";
// import {
//   STATUS_CODE,
//   TOKEN,
//   USER_LOGIN,
// } from "../../../util/constants/settingSystem";
// import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
// import {
//   DELETE_USER_API,
//   DELETE_USER_SAGA,
//   EDIT_USER_API,
//   EDIT_USER_SAGA,
//   GET_LIST_USER_API,
//   GET_LIST_USER_SAGA,
//   USER_SIGIN_SAGA,
// } from "../../constants/UserConstants";

// // signInUser
// function* signInUserSaga(action) {
//   const user = action.userValues;
//   yield put({
//     type: DISPLAY_LOADING,
//   });
//   yield delay(500);
//   try {
//     const { data, status } = yield call(() => {
//       return userService.signUpUser(user);
//     });
//     if (status === STATUS_CODE.SUCCESS) {
//       const { data, status } = yield call(() => {
//         return userService.signInUser(user);
//       });

//       //Lưu vào localstorage khi đăng nhập thành công
//       localStorage.setItem(TOKEN, data.content.accessToken);
//       localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

//       yield put({
//         type: HIDE_LOADING,
//       });
//       let navigate = yield select((state) => state.NavigateReducer.navigate);
//       navigate("/admin");
//     }
//   } catch (err) {
//     console.log(err.response.data);
//   }
// }
// export function* followSignInUserSaga() {
//   yield takeLatest(USER_SIGIN_SAGA, signInUserSaga);
// }
// // get list
// function* GetListUserSaga(action) {
//   const UserLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
//   try {
//     const { data, status } = yield call(() => {
//       return userService.getUser(UserLogin.id);
//     });
//     if (status === STATUS_CODE.SUCCESS) {
//       yield put({
//         type: GET_LIST_USER_API,
//         listUser: data.content,
//         UserLogin,
//       });
//     }
//   } catch (error) {
//     console.log(error.response.data);
//   }
// }
// export function* followGetListUserSaga() {
//   yield takeLatest(GET_LIST_USER_SAGA, GetListUserSaga);
// }
// // delete user
// function* deleteUserSaga(action) {
//   const UserLoginID = JSON.parse(localStorage.getItem(USER_LOGIN)).id;

//   if (action.userId === UserLoginID) {
//     try {
//       const { data, status } = yield call(() => {
//         return userService.deleteUser(action.userId);
//       });
//       if (status === STATUS_CODE.SUCCESS) {
//         yield put({
//           type: DELETE_USER_API,
//         });
//       }
//       message.success("You have successfully deleted");
//       yield put({
//         type: GET_LIST_USER_SAGA,
//       });
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   } else {
//     message.error("You do not have permission to erase other users");
//   }
// }
// export function* followDeleteUserSaga() {
//   yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
// }
// // edit
// function* editUserSaga(action) {
//   try {
//     const { data, status } = yield call(() => {
//       return userService.editUser(action.userValues);
//     });
//     if (status === STATUS_CODE.SUCCESS) {
//       yield put({
//         type: GET_LIST_USER_SAGA,
//       });
//       yield put({
//         type: EDIT_USER_API,
//       });
//     }
//     message.success("You have successfully Edit");
//   } catch (error) {
//     console.log(error.response.data);
//   }
// }
// export function* followEditUserSaga() {
//   yield takeLatest(EDIT_USER_SAGA, editUserSaga);
// }
