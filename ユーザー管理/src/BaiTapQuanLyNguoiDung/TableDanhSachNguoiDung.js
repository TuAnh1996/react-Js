import React, { Component } from "react";
import { connect } from "react-redux";
import { chinhXuaThongTin, xoaNguoiDung } from "../Redux/Action/QuanLyAction";

class TableDanhSachNguoiDung extends Component {
  renderThongTinNguoiDung = () => {
    return this.props.thongTinNguoiDung.map((item, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>{item.taiKhoan}</td>
            <td>{item.hoTen}</td>
            <td>{item.matKhau}</td>
            <td>{item.email}</td>
            <td>{item.soDienThoai}</td>
            <td>{item.loaiNguoiDung} </td>
            <td>
              <button
                className="btn btn-success mr-2"
                onClick={() => {
                  this.props.dispatch(chinhXuaThongTin(item));
                }}
              >
                Chỉnh sửa
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.props.dispatch(xoaNguoiDung(item.id));
                }}
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  };
  render() {
    return (
      <div>
        <h1 style={{ fontSize: "20px" }}>Danh Sách Người Dùng</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tài Khoản</th>
              <th>Họ Tên </th>
              <th>Mật Khẩu </th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Loại Người Dùng</th>
              <th></th>
            </tr>
          </thead>
          {this.renderThongTinNguoiDung()}
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    thongTinNguoiDung: state.quanLyNguoiDungReducer.thongTinNguoiDung,
  };
};
export default connect(mapStateToProps)(TableDanhSachNguoiDung);
