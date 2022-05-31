import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // {taiKhoan:'',matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinNguoiDung = () => {
    return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };
  // đăng ký
  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  // lay loai nguoi dung
  loaiNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  // them nguoi dung
  themNguoiDung = (thongTinNguoiDung) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung);
  };
  danhSachNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`, GROUPID);
  };
  timKiemNguoiDung = (tuKhoa) => {
    return this.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
    );
  };
  capNhapThongTinNguoiDung = (thongTinNguoiDung) => {
    return this.put(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      thongTinNguoiDung
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
