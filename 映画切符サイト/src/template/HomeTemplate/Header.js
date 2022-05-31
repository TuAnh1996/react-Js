import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Navigate, useNavigate, useParams } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { useState } from "react";
const { Option } = Select;
export default function Header() {
  // fixed mạc định ở đầu
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  // để dịch đa ngon  ngữ

  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    i18n.changeLanguage(value);
  };
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <>
          <div className="flex items-center mr-4">
            <NavLink
              style={{ fontSize: "18px" }}
              to="/login"
              className={(navData) =>
                navData.isActive
                  ? "active flex items-center  text-[#007bff] "
                  : "flex items-center -mb-0.5  px-4 border-transparent text-black"
              }
            >
              {t("Signin")}
            </NavLink>
          </div>
          <div className="flex items-center">
            <NavLink
              style={{ fontSize: "18px" }}
              to="/register"
              className={(navData) =>
                navData.isActive
                  ? "active flex items-center  text-[#007bff] "
                  : "flex items-center -mb-0.5  px-4 border-transparent text-black"
              }
            >
              {t("Signup")}
            </NavLink>
          </div>
        </>
      );
    }
    return (
      <div className="flex items-center">
        <span
          style={{ fontSize: "18px", color: "black" }}

          // className="flex items-center -mb-0.5 cursos-none  px-4 border-transparent text-black cursor-none"
        >
          {t("Hello")} {userLogin.taiKhoan} !
        </span>
        <NavLink
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            // navigate("/");
            window.location.reload();
          }}
          style={{ fontSize: "18px", margin: "0 10px" }}
          to="/"
          className={(navData) =>
            navData.isActive
              ? // ? "active flex items-center text-[#007bff] "
                "flex items-center -mb-0.5  px-4 border-transparent text-black"
              : "active flex items-center text-[#007bff] "
          }
        >
          {t("Logout")}
        </NavLink>
      </div>
    );
  };

  const { confirm } = Modal;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <header
      className="p-4  fixed w-full "
      style={{
        boxShadow: "0 1px 5px #767676",
        zIndex: "10",
        backgroundColor: "white",
      }}
    >
      <div className=" flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 ml-4"
        >
          <img
            // src="https://banner2.cleanpng.com/20180920/vh/kisspng-logo-film-image-streaming-media-brand-5ba43a32c96e32.1489566115374894588251.jpg"
            src={require("../../assets/image/anh1234.png")}
            style={{ width: "150px" }}
            alt="cyberlearn.vn"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              style={{ fontSize: "18px" }}
              to="/"
              className={(navData) =>
                navData.isActive
                  ? "active flex items-center text-[#007bff] "
                  : "flex items-center -mb-0.5  px-4 border-transparent text-black"
              }
            >
              {t("Home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              style={{ fontSize: "18px" }}
              to="/contact"
              className={(navData) =>
                navData.isActive
                  ? "active flex items-center  text-[#007bff] "
                  : "flex items-center -mb-0.5  px-4 border-transparent text-black"
              }
            >
              {t("News")}
            </NavLink>
          </li>

          <li className="flex">
            {!localStorage.getItem(USER_LOGIN) ? (
              <NavLink
                style={{ fontSize: "18px" }}
                className={
                  (navData) =>
                    navData.isActive
                      ? "flex items-center -mb-0.5  px-4 border-transparent text-black"
                      : "active flex items-center  text-[#007bff] "
                  // : "flex items-center -mb-0.5  px-4 border-transparent text-black"
                }
                to=""
                type="primary"
                onClick={showModal}
              >
                {t("Admin")}
              </NavLink>
            ) : (
              <NavLink
                style={{ fontSize: "18px" }}
                to="/admin/films"
                className={(navData) =>
                  navData.isActive
                    ? "active flex items-center  text-[#007bff] "
                    : "flex items-center -mb-0.5  px-4 border-transparent text-black"
                }
              >
                {t("Admin")}
              </NavLink>
            )}
            <Modal
              // title="Title"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <div className="modal-header" style={{ border: "none" }}>
                <h4 className="modal-title">
                  Do you already have an account ?
                </h4>
                <button type="button" className="close" onClick={handleCancel}>
                  ×
                </button>
              </div>
              <div className="modal-footer" style={{ border: "none" }}>
                <Button
                  onClick={() => {
                    navigate(`/admin/login`);
                  }}
                  type="primary"
                  data-dismiss="modal"
                >
                  Sigin
                </Button>
                <Button
                  onClick={() => {
                    navigate(`/admin/register`);
                  }}
                  type="primary"
                  data-dismiss="modal"
                >
                  Sigup
                </Button>
              </div>
            </Modal>
          </li>
        </ul>
        <div
          className="flex
        "
        >
          {renderLogin()}

          <div className="flex items-center">
            <Select
              defaultValue="en"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="en">Eng</Option>
              <Option value="ja">Ja</Option>

              <Option value="vi">Vi</Option>
            </Select>
          </div>
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-coolGray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* {t('hello.2')} */}
      </div>
    </header>
  );
}
