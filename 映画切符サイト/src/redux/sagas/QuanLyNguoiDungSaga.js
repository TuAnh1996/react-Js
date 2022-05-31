import { call, put, select, takeLatest } from "redux-saga/effects";
import { number } from "yup";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP_ACTION } from "../actions/types/QuanLyNguoiDungType";

// get list
function* quanLyNguoiDungSaga(action) {
  // console.log(action.pathname);
  try {
    const result = yield call(() => {
      return quanLyNguoiDungService.dangNhap(action.values);
    });
    // console.log(result.data);
    if (result.data.statusCode === 200) {
      yield put({
        type: DANG_NHAP_ACTION,
        thongTinDangNhap: result.data.content,
      });
      //Chuyển hướng đăng nhập về trang trước đó
      let navigate = yield select((state) => state.NavigateReducer.navigate);
      // console.log(action.a);
      if (action.pathname === "/admin/login") {
        // navigate(`/checkout/action.id`);
        navigate("/admin/films");
      } else if (action.pathname === `/checkout/${action.id}/login`) {
        navigate(`/checkout/${action.id}`);
      } else {
        navigate(-1);
      }
    }
  } catch (error) {
    // console.log(error.response.data);
  }
}
export function* followQuanLyNguoiDungSaga() {
  yield takeLatest("DANG_NHAP", quanLyNguoiDungSaga);
}
