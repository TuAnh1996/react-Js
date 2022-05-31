import React from "react";
import { Table } from "antd";
import { Button, Input } from "antd";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AudioOutlined,
  EditOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  layDanhSachNguoiDungAction,
  timKiemNguoiDungAction,
  xoaNguoiDungAction,
} from "../../redux/reducers/reduxThunk/QuanLyNguoiDungAction";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
// import Search from "antd/lib/transfer/search";
export default function User() {
  const { Search } = Input;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  // console.log(danhSachNguoiDung);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);
  const onSearch = (value) => {
    // value chinh cai minh Search
    // dispatch(layDanhSachPhimAction(value));
    dispatch(timKiemNguoiDungAction(value));
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "3%",
      render: (text, record, index) => {
        return <>{index + 1}</>;
      },

      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      width: "12%",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      width: "12%",
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      width: "15%",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => {
      //   let hoTenA = a.hoTen.toLowerCase().trim();
      //   let hoTenB = b.hoTen.toLowerCase().trim();
      //   if (hoTenA > hoTenB) {
      //     return 1;
      //   }
      //   return -1;
      // },
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Phone Number",
      dataIndex: "soDt",
      width: "12%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      render: (text, user, index) => {
        // console.log("user", user);
        return (
          <>
            <NavLink
              key={1}
              className=" mr-5  text-2xl"
              // to={`/admin/edit/${film.maPhim}`}
              to={`/admin/adduser/${user.taiKhoan}`}
            >
              <EditOutlined />
            </NavLink>
            {/* xóa  */}
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl mr-5"
              onClick={() => {
                if (window.confirm("Do You Sure Delete Your Account?")) {
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
          </>
        );
      },
    },
  ];

  const data = danhSachNguoiDung;
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Button
        className="my-5"
        onClick={() => {
          navigate("/admin/adduser");
        }}
      >
        Add User
      </Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch} // hàm này sẽ nhận keyword của mình để tìm
      />
      <Table
        className="mt-5"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
