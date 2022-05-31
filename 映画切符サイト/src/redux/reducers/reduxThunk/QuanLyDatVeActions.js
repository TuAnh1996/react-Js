import { connection } from "../../..";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../../actions/types/QuanLyDatVeType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      // console.log("result", result);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      // console.log("error", error);
      // console.log("error", error.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(displayLoadingAction)
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      // console.log(result.data.content);
      //Đặt vé thành công gọi api load lại phòng vé
      // await ở đây là 1 hàm đồng bộ có nghĩ nó dispatch xong mới xử lý cái sau
      // đặt xog thì ta load lại để nó cập nhập
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));

      // ở các user khác nó sẽ hiện là ds đang đặt vì vậy sau khi đặt xong ta phải cho ds dang đặt về rõng
      // sau khi ấn vào nút đặt vé thì nó sẽ trả về lại api cho các thứ
      await dispatch({ type: DAT_VE_HOAN_TAT });
      // await dispatch(hideLoadingAction);
      dispatch({
        type: HIDE_LOADING,
      });
      // nhưng nó cũng đồng thời ở file checkout nó cũng sẽ gọi tạo ra mảng Array ds ghế khách đang đặt vì vậy ta cần gọi lên nhờ backend giả quyết
      let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        thongTinDatVe.maLichChieu
      );

      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      // dispatch(hideLoadingAction)
      // console.log(error.response.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      ghe,
    });

    // sau khi ta click vào đặt ghế xong thì nó ms lấy lại thông tin ghế đó gửi chả lại cho backend để nó theo dõi và hiện ở các user khác
    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    // console.log("danhSachGheDangDat", danhSachGheDangDat);
    // console.log("taiKhoan", taiKhoan);
    // console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    // khi có ng đâng dặt nó sẽ lấy đc tk ds gế gửi lại cho backend để nó xử lý và đồng thười sẽ gửi lại cho phía chúng ta
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
