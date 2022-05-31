import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  danhSachNguoiDung: [],
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }

    case SET_THONG_TIN_NGUOI_DUNG: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }
    case "DANH_SACH_NGUOI_DUNG": {
      return { ...state, danhSachNguoiDung: action.DSNguoiDung };
    }
    case "TIM_KIEM_NGUOI_DUNG": {
      console.log(action.timKiemNguoiDung);
      return { ...state, danhSachNguoiDung: action.timKiemNguoiDung };
    }

    default:
      return { ...state };
  }
};
