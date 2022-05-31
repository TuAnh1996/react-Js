import React, { Component } from "react";
import FormDangKy from "./FormDangKy";
import TableDanhSachNguoiDung from "./TableDanhSachNguoiDung";
import "./style.css";

export default class BaiTapQuanLyNguoiDung extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ width: "80%", marginTop: 50 }}>
        <FormDangKy />
        <TableDanhSachNguoiDung />
      </div>
    );
  }
}
