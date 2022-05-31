import {
  cap_nhat_thong_tin,
  chinh_xua_thong_tin,
  them_nguoi_dung,
  xoa_nguoi_dung,
} from "../types/QuanLyTypes";

export const themNguoiDung = (thongTinDangKy) => ({
  type: them_nguoi_dung,
  thongTinDangKy,
});
export const xoaNguoiDung = (iDNguoiDung) => ({
  type: xoa_nguoi_dung,
  iDNguoiDung,
});
export const chinhXuaThongTin = (thongTinChinhXua) => ({
  type: chinh_xua_thong_tin,
  thongTinChinhXua,
});
export const capNhatThongTin = (thongTinCapNhat) => ({
  type: cap_nhat_thong_tin,
  thongTinCapNhat,
});
