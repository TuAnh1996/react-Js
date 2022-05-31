import React from "react";
import { Form, Input, Select, Tooltip, Button, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
// import { useFormik } from "formik";
import { useEffect } from "react";
import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDung";
import { useState } from "react";
import { themNguoiDungAction } from "../../../redux/reducers/reduxThunk/QuanLyNguoiDungAction";

const { Option } = Select;
export default function AddUser() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    values["maNhom"] = "GP01";

    dispatch(themNguoiDungAction(values));
  };
  const [state, setState] = useState({
    maLoaiNguoiDung: [],
  });
  // console.log(state.maLoaiNguoiDung);
  useEffect(() => {
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
        // console.log("err", error.response?.data);
      }
    };
  }, []);
  return (
    <Form
      onFinish={onFinish}
      name="complex-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Account">
        <Space>
          <Form.Item
            name="taiKhoan"
            noStyle
            rules={[{ required: true, message: "Account is required" }]}
          >
            <Input style={{ width: 160 }} placeholder="Please input" />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label="Password">
        <Space>
          <Form.Item
            name="matKhau"
            noStyle
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
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
            name="email"
            noStyle
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
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
            name="soDt"
            noStyle
            rules={[{ required: true, message: "Phone Numbe is required" }]}
          >
            <Input style={{ width: 160 }} placeholder="Please input" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="User Type">
        <Input.Group compact>
          <Form.Item
            name="maLoaiNguoiDung"
            noStyle
            rules={[{ required: true, message: "User Type is required" }]}
          >
            <Select placeholder="Select province">
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
            name="hoTen"
            noStyle
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input style={{ width: 160 }} placeholder="Please input" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
}
