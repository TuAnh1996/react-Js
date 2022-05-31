import React, { Fragment } from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FileOutlined,
  BankOutlined,
  DesktopOutlined,
  PlusCircleOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";

import _ from "lodash";
import Film from "../../components/Film/Film";
import ShowTime from "./Showtime/ShowTime";
import User from "./User";
import { Router } from "react-router";
import { NavLink } from "react-router-dom";
import Films from "./Films";
import AddNew from "./AddNew/AddNew";
import Edit from "./Edit";
import { Menu, Switch } from "antd";
import AddUser from "./AddUser/AddUser";
import EditUser from "./User/EditUser";
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");

  const changeTheme = (value) => {
    setTheme(value ? "light" : "dark");
  };

  // if (!localStorage.getItem(USER_LOGIN)) {
  //   alert("You not Admin");
  //   return <navigate to="/" />;
  // }
  // if (userLogin.maLoaiNguoiDung !== "QuanTri") {
  //   alert("You not admin");
  //   return <navigate to="/" />;
  // }
  return (
    <div style={{ display: "flex" }}>
      <Menu
        className="min-h-screen "
        theme={theme}
        style={{ width: "17%" }}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          icon={<FileOutlined />}
          title="Film"
          className="pt-7"
        >
          <Menu.Item
            key="2"
            onClick={() => {
              navigate("/admin/films");
            }}
            icon={
              <NavLink to="films">
                <FileOutlined /> <span>Film</span>
              </NavLink>
            }
          ></Menu.Item>
          <Menu.Item
            key="1"
            icon={
              <NavLink to="addfilm">
                {<PlusCircleOutlined />}
                <span>AddFilm</span>
              </NavLink>
            }
          ></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UserOutlined />} title="User">
          <Menu.Item
            key="5"
            icon={
              <NavLink to="user">
                <FileOutlined /> <span>User</span>
              </NavLink>
            }
          ></Menu.Item>
          <Menu.Item
            key="6"
            icon={
              <NavLink to="adduser">
                <PlusCircleOutlined />
                <span>AddUser</span>
              </NavLink>
            }
          ></Menu.Item>
        </SubMenu>
      </Menu>
      <Layout className="site-layout">
        <div
          className="my-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className=" ml-2">
            <Switch onChange={changeTheme} />
          </div>
          <div>
            {!_.isEmpty(userLogin) ? (
              <>
                <button className="mr-5">
                  <div
                    // style={{
                    //   width: 50,
                    //   height: 50,
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    // }}
                    // className="text-2xl ml-5 bg-red-200"
                    className="chekout"
                    // style={{ marginRight: "100px" }}
                  >
                    {/* lấy chữ cái đầu bằng hàm substr */}
                    Hello {userLogin.taiKhoan}
                  </div>
                </button>
                <button
                  className="mr-5 chekout"
                  onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              ""
            )}
            <button
              className="chekout"
              style={{ marginRight: "100px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
          </div>
        </div>
        {/* <br /> */}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
            border: "20px solid #fff",
          }}
        >
          <Routes>
            <Route path="/films" element={<Films />} />

            <Route path="/user" element={<User />} />
            <Route path="/addfilm" element={<AddNew />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/showtime/:id/:tenPhim" element={<ShowTime />} />
            <Route path="/adduser/:id" element={<EditUser />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}
