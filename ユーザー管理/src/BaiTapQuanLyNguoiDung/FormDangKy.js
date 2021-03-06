import React, { Component } from "react";
import { capNhatThongTin, themNguoiDung } from "../Redux/Action/QuanLyAction";
import { connect } from "react-redux";
import Swal from "sweetalert2";
class FormDangKy extends Component {
  state = {
    values: {
      id: Date.now(),
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      soDienThoai: "",
      email: "",
      loaiNguoiDung: "",
    },
    errors: {
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      soDienThoai: "",
      emai: "",
      loaiNguoiDung: "",
    },
    disabled: true,
  };
  handleChangeValue = (e) => {
    let { name, value, type } = e.target;
    let newValue = { ...this.state.values, [name]: value };
    let newErrors = { ...this.state.errors };
    if (value.trim() === "") {
      newErrors[name] = name + " is required !";
    }
    if (type === "email") {
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!regexEmail.test(value)) {
        newErrors[name] = name + " is required !";
      } else {
        newErrors[name] = "";
      }
    }
    if (name === "soDienThoai") {
      const soDt =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!soDt.test(value)) {
        newErrors[name] = name + " is required !";
      } else {
        newErrors[name] = "";
      }
    }

    this.setState({
      values: newValue,
      errors: newErrors,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let { values, errors } = this.state;

    let valid = true;

    let errorsContent = "";
    for (let key in values) {
      if (values[key] === "") {
        valid = false;

        errorsContent += `
            <p class="text-left"> <b class="text-danger">${key} is invalid!</b></p>`;
        valid = false;
      }
    }

    for (let key in errors) {
      if (errors[key] !== "") {
        errorsContent += `
            <p class="text-left"> <b class="text-danger">${key} is invalid!</b></p>`;
        valid = false;
      }
    }
    if (!valid) {
      Swal.fire({
        title: "Your profile!",
        html: errorsContent,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    {
      this.props.disabled
        ? this.props.dispatch(themNguoiDung(values))
        : this.props.dispatch(capNhatThongTin(values));
    }
  };

  render() {
    return (
      <div
        style={{
          margin: "0 15px",
          borderRight: "1px solid #ebe1e1",
          borderLeft: "1px solid #ebe1e1",
        }}
      >
        <h1>Form ????ng K??</h1>
        <div style={{ width: "95%", margin: "auto" }}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <label>T??i Kho???n</label>
                <br />
                <input
                  value={this.state.values.taiKhoan}
                  required
                  type="text"
                  name="taiKhoan"
                  onChange={this.handleChangeValue}
                />
                <span className="text text-danger">
                  {this.state.errors.taiKhoan}
                </span>
              </div>
              <div className="col-6">
                <label>H??? T??n</label>
                <br />
                <input
                  value={this.state.values.hoTen}
                  required
                  type="text"
                  name="hoTen"
                  onChange={this.handleChangeValue}
                />
                <span className="text text-danger">
                  {this.state.errors.hoTen}
                </span>
              </div>
              <div className="col-6">
                <label>M???t Kh???u</label>
                <br />
                <input
                  value={this.state.values.matKhau}
                  required
                  type="text"
                  name="matKhau"
                  onChange={this.handleChangeValue}
                />
                <span className="text text-danger">
                  {this.state.errors.matKhau}
                </span>
              </div>
              <div className="col-6">
                <label>S??? ??i???n Tho???i</label>
                <br />
                <input
                  value={this.state.values.soDienThoai}
                  type="text"
                  required
                  name="soDienThoai"
                  onChange={this.handleChangeValue}
                />
                <span className="text text-danger">
                  {this.state.errors.soDienThoai}
                </span>
              </div>
              <div className="col-6">
                <label>Email</label>
                <br />
                <input
                  required
                  value={this.state.values.email}
                  type="email"
                  name="email"
                  onChange={this.handleChangeValue}
                />
                <span className="text text-danger">
                  {this.state.errors.email}
                </span>
              </div>
              <div className="col-6">
                <label>M?? Lo???i Ng?????i D??ng</label>
                <br />
                <select
                  name="loaiNguoiDung"
                  onChange={this.handleChangeValue}
                  value={this.state.values.loaiNguoiDung}
                >
                  {/* nh??? ph???i c?? value="" v?? ch??? c?? disabled  */}
                  <option value="" disabled>
                    Ch???n Ki???u Ng?????i D??ng
                  </option>
                  <option value="Gi??o Vi??n">Gi??o Vi??n</option>
                  <option value="H???c Sinh">H???c Sinh</option>
                  <option value="B??c S??">B??c S??</option>
                </select>
              </div>
            </div>
            {this.props.disabled ? (
              <button className="btn btn-success mr-2 ml-3 mt-2 mb-3">
                ????ng K??
              </button>
            ) : (
              <button
                disabled
                style={{ cursor: "no-drop" }}
                className="btn btn-success mr-2 ml-3 mt-2 mb-3"
              >
                ????ng K??
              </button>
            )}

            {this.props.disabled ? (
              <button
                disabled
                style={{ cursor: "no-drop" }}
                className="  btn btn-primary mt-2 mb-3"
              >
                C???p Nh???t
              </button>
            ) : (
              <button className="btn btn-primary mt-2 mb-3">C???p Nh???t</button>
            )}
          </form>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.thongTinChinhXua.id !== this.props.thongTinChinhXua.id) {
      this.setState({
        values: this.props.thongTinChinhXua,
      });
    }
  }
}
const mapStateToProps = (state) => {
  return {
    thongTinChinhXua: state.quanLyNguoiDungReducer.thongTinChinhXua,
    disabled: state.quanLyNguoiDungReducer.disabled,
  };
};
export default connect(mapStateToProps)(FormDangKy);
