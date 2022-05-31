import {
  cap_nhat_thong_tin,
  chinh_xua_thong_tin,
  them_nguoi_dung,
  xoa_nguoi_dung,
} from "../types/QuanLyTypes";
const stateQuanLyNguoiDung = {
  thongTinNguoiDung: [
    {
      id: 1,
      taiKhoan: "Nguyen A",
      hoTen: "Nguyen Van A",
      matKhau: "aaa123d2",
      email: "chelsea@gmail.com",
      soDienThoai: "01697636098",
      loaiNguoiDung: "Học Sinh",
    },
    {
      id: 2,
      taiKhoan: "Le Van C",
      hoTen: "Le C",
      matKhau: "1232",
      email: "cfsfdseaa@gmail.com",
      soDienThoai: "0123336098",
      loaiNguoiDung: "Bác Sĩ",
    },
    {
      id: 3,
      taiKhoan: "B Tran",
      hoTen: "Tran Thi B",
      matKhau: "123dsdvds2",
      email: "abcdd@gmail.com",
      soDienThoai: "0180636098",
      loaiNguoiDung: "Giáo Viên",
    },
  ],

  thongTinChinhXua: {
    id: -1,
    taiKhoan: "Le Van C",
    hoTen: "Le C",
    matKhau: "1232",
    email: "cfsfdseaa@gmail.com",
    soDienThoai: "0123336098",
    loaiNguoiDung: "Học Sinh",
  },

  disabled: true,
};
const quanLyNguoiDungReducer = (state = stateQuanLyNguoiDung, action) => {
  switch (action.type) {
    case them_nguoi_dung: {
      let values = action.thongTinDangKy;

      let upDateThongTinNguoiDung = [...state.thongTinNguoiDung];
      let indexEmail = upDateThongTinNguoiDung.findIndex(
        (thongTin) => thongTin.email === values.email
      );

      let indexSDT = upDateThongTinNguoiDung.findIndex(
        (thongTin) => thongTin.soDienThoai === values.soDienThoai
      );

      if (indexEmail !== -1) {
        alert("Tài Khoản Gmail Đã Được Sử Dụng!Hãy Sử Dụng Gmail Khác !");
        return { ...state };
      } else if (indexSDT !== -1) {
        alert(
          "Tài Khoản Số Điện Thoại Đã Được Sử Dụng!Hãy Sử Dụng Số Điện Thoại Khác !"
        );
        return { ...state };
      }
      upDateThongTinNguoiDung.push(values);
      state.thongTinChinhXua = {
        id: -2,
        taiKhoan: " ",
        hoTen: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        loaiNguoiDung: "",
      };
      return {
        ...state,
        thongTinNguoiDung: upDateThongTinNguoiDung,
      };
    }
    case xoa_nguoi_dung: {
      let upDateThongTinNguoiDung = [...state.thongTinNguoiDung];
      let index = upDateThongTinNguoiDung.findIndex(
        (thongTin) => thongTin.id === action.iDNguoiDung
      );
      if (index !== -1) {
        upDateThongTinNguoiDung.splice(index, 1);
      }
      state.thongTinChinhXua = {
        id: -3,
        taiKhoan: " ",
        hoTen: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        loaiNguoiDung: "",
      };
      return {
        ...state,
        thongTinNguoiDung: upDateThongTinNguoiDung,
        disabled: true,
      };
    }
    case chinh_xua_thong_tin: {
      return {
        ...state,
        thongTinChinhXua: action.thongTinChinhXua,
        disabled: false,
      };
    }
    case cap_nhat_thong_tin: {
      let values = action.thongTinCapNhat;
      let upDateThongTinNguoiDung = [...state.thongTinNguoiDung];
      // lấy ra mảng khác id để sd sdt và email khi ng dùng cập nhật phòng th ng dùng điền đúng sdt hoặc email
      let mangKhacId = upDateThongTinNguoiDung.filter(
        (thongTin) => thongTin.id !== values.id
      );

      let indexEmail = mangKhacId.findIndex(
        (thongTin) => thongTin.email === values.email
      );

      let indexSDT = mangKhacId.findIndex(
        (thongTin) => thongTin.soDienThoai === values.soDienThoai
      );
      let indexIdUpDate = upDateThongTinNguoiDung.findIndex(
        (thongTin) => thongTin.id === values.id
      );
      if (indexEmail !== -1) {
        alert("Tài Khoản Gmail Đã Được Sử Dụng!Hãy Sử Dụng Gmail Khác !");
        return { ...state };
      } else if (indexSDT !== -1) {
        alert(
          "Tài Khoản Số Điện Thoại Đã Được Sử Dụng!Hãy Sử Dụng Số Điện Thoại Khác !"
        );
        return { ...state };
      }
      upDateThongTinNguoiDung[indexIdUpDate] = action.thongTinCapNhat;

      state.thongTinChinhXua = {
        id: -4,
        taiKhoan: " ",
        hoTen: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        loaiNguoiDung: "",
      };
      return {
        ...state,
        thongTinNguoiDung: upDateThongTinNguoiDung,
        disabled: true,
      };
    }
    default:
      return { ...state };
  }
};
export default quanLyNguoiDungReducer;
