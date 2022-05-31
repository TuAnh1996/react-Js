import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../actions/types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDSPhim = {
  arrFilm: [
    {
      maPhim: 1282,
      tenPhim: "Ban tay diet quy",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: false,
  arrFilmDefault: [],
  filmDetail: {},

  thongTinPhim: {},
};
export const DanhSachPhimReducer = (state = stateDSPhim, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      // state.arrFilm = action.arrFilm;
      state.arrFilmDefault = action.arrFilm;
      state.arrFilm = state.arrFilmDefault.filter(
        (phimDC) => phimDC.dangChieu === state.dangChieu
      );

      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      // khi ấn vào fim đang chiếu nó sẽ hiệu film chưa chiến
      state.dangChieu = !state.dangChieu;
      // sẽ là false tức là film chưa chiếu
      state.sapChieu = !state.sapChieu;
      // ấn lần 1 thì nó ra ds fim với dangChieu là false  ,ấn lần 2 thì nó là true tức
      // console.log(state.dangChieu);
      // state.arrFilm = action.arrFilm;

      // khi click vào vd nó là false thì t dùng filter tức chri lấy những cái false
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );

      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      // sẽ thành phim đang chiếu
      state.sapChieu = !state.sapChieu;
      state.dangChieu = !state.dangChieu;
      // state.arrFilm = action.arrFilm;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );

      return { ...state };
    }
    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }
    case SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
