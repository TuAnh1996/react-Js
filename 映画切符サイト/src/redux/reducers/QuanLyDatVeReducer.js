// import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLyDatVeType";

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [], //danh sách ghế đang đặt
  danhSachGheKhachDat: [],
  // [{maGhe:48041},{maGhe:48042}],
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }

    case DAT_VE: {
      //Cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      // ta phải ktra khi đặt lần 1 thì ok nhưng lần 2 cùng vé đó nó phải trừ  đi do đó ta phải dujng và tìm nó trong ds nếu có rồi thì xóa dựa vào mã ghế
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.ghe.maGhe
      );
      if (index !== -1) {
        //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.ghe);
      }

      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }

    // khi đặt vé xong nó sẽ chạy qya cái lịch sử đặt vé
    case CHUYEN_TAB: {
      state.tabActive = "2";
      return { ...state };
    }

    case "CHANGE_TAB_ACTIVE": {
      // console.log("action", action);
      state.tabActive = action.number;
      return { ...state };
    }

    case "DAT_GHE": {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
