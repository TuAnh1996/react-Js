// import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";

import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDung";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../../actions/types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
  //   console.log("navi", thongTinDangNhap.navigate);
  // const navigate = thongTinDangNhap.navigate;
  // navigate("/");
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        //Chuyển hướng đăng nhập về trang trước đó
      }
    } catch (error) {
      // console.log("error", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      // console.log(result);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }

      // console.log("result", result);
    } catch (error) {
      // console.log("error", error.response.data);
    }
  };
};

export const dangKyAction = (action) => {
  // console.log(action.PATHNAME);
  return async (dispatch, getState) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(action);
      if (result.data.statusCode === 200) {
        // console.log(result);
        alert("Sign Up Success");
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        let navigate = getState().NavigateReducer.navigate;
        if (action.PATHNAME === "/admin/register") {
          // navigate(`/checkout/action.id`);
          navigate("/admin/films");
        } else if (action.PATHNAME === `/checkout/${action.ID}/register`) {
          navigate(`/checkout/${action.ID}`);
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      alert("Account or Email already in use");
      // console.log("err", error.response?.data);
    }
  };
};
export const themNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch, getState) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(
        thongTinNguoiDung
      );
      if (result.status === 200) {
        alert(" Add User Success");
        let navigate = getState().NavigateReducer.navigate;
        navigate("/admin/user");
      }
    } catch (error) {
      // console.log("err", error.response.data);
    }
  };
};
export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.danhSachNguoiDung();
      if (result.status === 200) {
        // console.log(result.data.content);
        dispatch({
          type: "DANH_SACH_NGUOI_DUNG",
          DSNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      // console.log("err", error.response.data);
    }
  };
};
export const timKiemNguoiDungAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
      if (result.status === 200) {
        // console.log(result.data.content);
        dispatch({
          type: "TIM_KIEM_NGUOI_DUNG",
          timKiemNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      // console.log("err", error.response.data);
    }
  };
};
export const capNhapThongTinNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch, getState) => {
    try {
      const result = await quanLyNguoiDungService.capNhapThongTinNguoiDung(
        thongTinNguoiDung
      );
      if (result.status === 200) {
        // console.log(result.data.content);
        alert(" Edits User Success");
        let navigate = getState().NavigateReducer.navigate;
        navigate("/admin/user");
      }
    } catch (error) {
      alert(" You can't change other people's accounts");
      // console.log("err", error.response.data);
    }
  };
};
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      if (result.status === 200) {
        alert("You deleted success");
        dispatch(layDanhSachNguoiDungAction());
      }
    } catch (error) {
      alert("You can't delete other'account !");
      // console.log("err", error.response.data);
    }
  };
};
