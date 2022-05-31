import React from "react";
import "./FilmCss.css";
import { useTranslation } from "react-i18next";
import { PlayCircleOutlined } from "@ant-design/icons";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Rate } from "antd";
import { Modal } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player";
// import { t } from "tar";
export default function Film(props) {
  const { phim } = props;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  // const [playTime, setPlayTime] = useState(0);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flip-card  ">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div
            className="card  rounded-b-lg "
            style={{ border: "1px solid #c7b5b5" }}
          >
            <div
              style={{
                backgroundImage: "url(/image/anh1233.jpg)",
                backgroundPosition: "center",
                width: "218x",
                height: "220px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // backgroundSize: "100%", 1px solid #c7b5b5
              }}
            >
              <img
                src={phim.hinhAnh}
                alt="Avatar"
                style={{ width: "218px", height: "220px" }}
              />
            </div>

            <div style={{ marginTop: "6px" }}>
              <h4 className="ml-1 py-2">
                {phim.tenPhim.length > 20
                  ? phim.tenPhim.substr(0, 20) + "..."
                  : phim.tenPhim}
              </h4>
              <div
                className="flex items-center px-2 py-2 justify-between"
                style={{ display: "flex" }}
              >
                <div>2022</div>
                <div>
                  <Rate
                    allowHalf
                    value={phim.danhGia / 2}
                    style={{ fontSize: 15 }}
                  />
                  {/* <StarOutlined /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back ">
          <div
            className="card  rounded-b-lg "
            style={{ border: "1px solid #c7b5b5" }}
          >
            <div
              style={{
                position: "relative",
                backgroundImage: "url(/image/anh111.jpg)",
                backgroundPosition: "center",
                width: "218x",
                height: "230px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                src={phim.hinhAnh}
                alt="Avatar"
                style={{
                  width: "218px",
                  height: "230px",
                  marginBottom: "25px",
                }}
              />
            </div>
            <Modal
              // thêm thuộc tính này mỗi lần đóng nó sẽ đóng hết
              destroyOnClose={true}
              // className="abc"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <>
                {/* playIcon={<button>Play</button>} */}
                {/* light="https://i.stack.imgur.com/zw9Iz.png" */}
                <ReactPlayer
                  // onProgress={handleProgress}
                  playing={true} // để nó tự động chạy
                  // xetPlay
                  controls={true} //các điều khiển của video
                  // width="450px"
                  height="300px"
                  url={phim.trailer}
                />
              </>
            </Modal>

            <div
              className="rounded-full cursor-pointer style_start"
              style={{
                color: "#ddbb1f",
                fontSize: "3rem",
                background: "transparent",
                position: "absolute",
                top: "35%",
                left: "50%",
                transition: "all .5s",
                transform: "translate(-50%,-50%)",
              }}
            >
              <PlayCircleOutlined
                onClick={showModal}
                style={{ fontSize: "50px", color: "orange" }}
              />
            </div>
            <div
              onClick={() => {
                navigate(`/detail/${phim.maPhim}`);
              }}
              style={{ margin: "18px 0" }}
              className="bg-orange-300 text-center cursor-pointer py-2   mx-4 rounded text-success-50 font-bold flip-card-back_hover"
            >
              {t("Booking")}
            </div>
          </div>

          {/* <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              border: "1px solid #c7b5b5",
            }}
            className="  rounded-b-lg "
          >
            <img
              src={phim.hinhAnh}
              alt="Avatar"
              style={{ width: "220px", height: "220px" }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold">{phim.tenPhim}</div>
            </div>
          </div>
          <div
            onClick={() => {
              navigate(`/detail/${phim.maPhim}`);
            }}
            className="bg-orange-300 text-center cursor-pointer py-2  my-2 text-success-50 font-bold"
          >
            {t("Booking")}
          </div> */}
        </div>
      </div>
      {/* <NavLink
        to={`/detail/${phim.maPhim}`}
        className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold"
      >
        ĐẶT VÉ
      </NavLink> */}
      {/* <div
        onClick={() => {
          navigate(`/detail/${phim.maPhim}`);
        }}
        className="bg-orange-300 text-center cursor-pointer py-2  my-2 text-success-50 font-bold"
      >
        {t("Booking")}
      </div> */}
    </div>
  );
}
