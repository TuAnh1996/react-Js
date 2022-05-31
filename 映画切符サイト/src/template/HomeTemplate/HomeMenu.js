import { Button, Tabs } from "antd";
import moment from "moment";
import React, { Component, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";
// import { Navigate, useNavigate, useParams } from "react-router";
import { Route, Redirect, Navigate, useNavigate } from "react-router";
const { TabPane } = Tabs;
// export default class HomeMenu extends React.PureComponent {
export default function HomeMenu(props) {
  // state = {
  //   tabPosition: "left",
  // };
  const navigate = useNavigate();
  const [tabPosition, settabPosition] = useState("left");
  // const navigate = useNavigate();

  const renderHeThongRap = () => {
    return props.heThongRapChieu?.map((heThongRap, index) => {
      // let { tabPosition } = this.state;
      return (
        // đầu tiên ta load logo
        <TabPane
          key={index}
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full"
              width="50"
              alt=""
            />
          }
        >
          <Tabs tabPosition={tabPosition}>
            {/* load tên cụm rạp  */}
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img
                        src={cumRap.hinhAnh}
                        className="rounded-full"
                        width="50"
                        alt=""
                      />
                      <br />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-red-200">Chi tiết</p>
                      </div>
                    </div>
                  }
                >
                  {/*Load phim tương ứng */}
                  {cumRap.danhSachPhim?.slice(0, 4).map((phim, index) => {
                    // console.log(cumRap.danhSachPhim);
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ height: 75, width: 75 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                            />
                            <div className="ml-2">
                              <h1 className="text-2xl text-green-700">
                                {phim.tenPhim}
                              </h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <>
                                        {!localStorage.getItem(USER_LOGIN) ? (
                                          <NavLink
                                            key={index}
                                            className="text-2xl text-green-400"
                                            to=""
                                            data-toggle="modal"
                                            data-target="#myModal"
                                          >
                                            {moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("hh:mm A")}
                                          </NavLink>
                                        ) : (
                                          <NavLink
                                            key={index}
                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                            className="text-2xl text-green-400"
                                          >
                                            {moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("hh:mm A")}
                                          </NavLink>
                                        )}

                                        <div className="modal" id="myModal">
                                          <div className="modal-dialog">
                                            <div className="modal-content">
                                              <div
                                                className="modal-header"
                                                style={{ border: "none" }}
                                              >
                                                <h4 className="modal-title">
                                                  Do you already have an account
                                                  ?
                                                </h4>
                                                <button
                                                  type="button"
                                                  className="close"
                                                  data-dismiss="modal"
                                                >
                                                  ×
                                                </button>
                                              </div>
                                              <div
                                                className="modal-footer"
                                                style={{ border: "none" }}
                                              >
                                                <Button
                                                  onClick={() => {
                                                    navigate(
                                                      `/checkout/${lichChieu.maLichChieu}/login`
                                                    );
                                                  }}
                                                  type="primary"
                                                  data-dismiss="modal"
                                                >
                                                  Sigin
                                                </Button>
                                                <Button
                                                  onClick={() => {
                                                    navigate(
                                                      `/checkout/${lichChieu.maLichChieu}/register`
                                                    );
                                                  }}
                                                  type="primary"
                                                  data-dismiss="modal"
                                                >
                                                  Sigup
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  // render() {
  // const { tabPosition } = this.state;
  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
  // }
}
