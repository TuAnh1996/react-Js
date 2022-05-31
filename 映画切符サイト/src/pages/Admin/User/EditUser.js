import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  capNhapThongTinNguoiDungAction,
  timKiemNguoiDungAction,
} from "../../../redux/reducers/reduxThunk/QuanLyNguoiDungAction";
import { Form, Input, Select, Tooltip, Button, Space, Typography } from "antd";
import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDung";
import { useState } from "react";
import { GROUPID } from "../../../util/settings/config";
import { useFormik } from "formik";
const { Option } = Select;
export default function EditUser() {
  const { id } = useParams();

  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  // console.log(danhSachNguoiDung[0]?.taiKhoan);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    maLoaiNguoiDung: [],
  });
  const formik = useFormik({
    // dữ liệu cần post nên cho back end
    enableReinitialize: true,
    initialValues: {
      taiKhoan: danhSachNguoiDung[0]?.taiKhoan,
      matKhau: danhSachNguoiDung[0]?.matKhau,
      email: danhSachNguoiDung[0]?.email,
      soDt: danhSachNguoiDung[0]?.soDt,

      maLoaiNguoiDung: danhSachNguoiDung[0]?.maLoaiNguoiDung,
      hoTen: danhSachNguoiDung[0]?.hoTen,
      maNhom: GROUPID,

      //nếu null trong trg hợp nó k thay đổi thì dùng null khi đó backend sẽ k xửu lý
    },

    onSubmit: (values) => {
      // console.log("values", values);
      dispatch(capNhapThongTinNguoiDungAction(values));
    },
  });
  useEffect(() => {
    dispatch(timKiemNguoiDungAction(id));
    return async () => {
      try {
        const result = await quanLyNguoiDungService.loaiNguoiDung();
        if (result.status === 200) {
          // console.log(result.data.content);
          setState({
            maLoaiNguoiDung: result.data.content,
          });
        }
      } catch (error) {
        console.log("err", error.response?.data);
      }
    };
  }, []);
  //   const onFinish = (values) => {
  //     values["maNhom"] = "GP01";
  //     console.log(values);
  //     // dispatch(themNguoiDungAction(values));
  //   };
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      name="complex-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Account">
        <Space>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "Account is required" }]}
          >
            <Input
              // onChange={formik.handleChange}
              name="taiKhoan"
              style={{ width: 160 }}
              placeholder="Please input"
              value={formik.values.taiKhoan}
            />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label="Password">
        <Space>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              name="matKhau"
              value={formik.values.matKhau}
              onChange={formik.handleChange}
              type="password"
              style={{ width: 160 }}
              placeholder="Please input"
            />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label="Email">
        <Space>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              style={{ width: 160 }}
              placeholder="Please input"
            />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label="Phone Number">
        <Space>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "Phone Numbe is required" }]}
          >
            <Input
              name="soDt"
              value={formik.values.soDt}
              onChange={formik.handleChange}
              style={{ width: 160 }}
              placeholder="Please input"
            />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="User Type">
        <Input.Group compact>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "User Type is required" }]}
          >
            <Select
              placeholder="Select province"
              name="maLoaiNguoiDung"
              value={formik.values.maLoaiNguoiDung}
              onChange={formik.handleChange}
            >
              {/* <option value="" disabled>
                ac
              </option> */}
              {state.maLoaiNguoiDung?.map((loaiNguoiDung, index) => {
                return (
                  <Option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
                    {loaiNguoiDung.tenLoai}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Name">
        <Space>
          <Form.Item
            noStyle
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input
              name="hoTen"
              value={formik.values.hoTen}
              onChange={formik.handleChange}
              style={{ width: 160 }}
              placeholder="Please input"
            />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
