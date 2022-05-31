import React, { useEffect } from "react";
import Header from "../../template/HomeTemplate/Header";
import Footer from "../../template/HomeTemplate/Footer/Footer";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
// import "../../assets/styles/circle.css";
import Circle from "react-circle";
import { Rate, Tabs } from "antd";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/actions/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/reducers/reduxThunk/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { USER_LOGIN } from "../../util/settings/config";

export default function Detail(props) {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  //   console.log(id);

  //   useEffect(() => {
  //     console.log(`/something/${id}`);
  //  }, []);
  const { filmDetail } = useSelector((state) => state.DanhSachPhimReducer);

  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(layThongTinChiTietPhim(id));
  }, []);
  return (
    <div>
      {/* Nhớ dùng  minHeight: "100vh" */}
      <Header />
      <div
        style={{
          paddingTop: 150,
          // backgroundImage: `url(${filmDetail.hinhAnh})`,
          // backgroundSize: "100%",
          // backgroundPosition: "center",
          // minHeight: "100vh",
        }}
      >
        {/* <CustomCard
          style={{ minHeight: "100vh", paddingTop: 150 }}
          effectColor="#C780FF" // required
          color="#14AEFF" // default color is white
          blur={2} // default blur value is 10px
          borderRadius={0} // default border radius value is 10px
        > */}
        <div className="grid grid-cols-12 ">
          <div className="col-span-4 col-start-4">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={filmDetail.hinhAnh}
                style={{ width: "100%", height: 300 }}
                alt="123"
              />
              <div className="col-span-2 ml-5" style={{ marginTop: "25%" }}>
                <p className="text-sm">
                  Time: {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p className="text-4xl leading-3">{filmDetail.tenPhim}</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 ml-5">
            <h1
              style={{
                marginLeft: "15%",
                color: "#2e6287",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Evaluate
            </h1>{" "}
            <h1
              style={{ marginLeft: "5%" }}
              className="text-green-400 text-2xl"
            >
              <Rate
                allowHalf
                value={filmDetail.danhGia / 2}
                style={{ color: "#78ed78", fontSize: 30 }}
              />
            </h1>
            <Circle progress={filmDetail.danhGia * 10} />
          </div>
          {/* <Circle progress={35} /> */}
        </div>
        <div
          className=" bg-white my-5 mx-5"
          style={{ minHeight: 300, width: "70%", margin: "40px auto" }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Time" key="1">
              <Tabs tabPosition={"left"} className="mb-8">
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div className="flex flex-row items-center justify-center mb-5">
                          <img src={htr.logo} alt="" style={{ width: 50 }} />
                          <div className="text-center ml-2">
                            {htr.tenHeThongRap}
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row">
                              <img
                                style={{ width: 60, height: 60 }}
                                src={cumRap.hinhAnh}
                                alt="..."
                              />
                              <div className="ml-2">
                                <p
                                  style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    lineHeight: 1,
                                  }}
                                >
                                  {cumRap.tenCumRap}
                                </p>
                                <p
                                  className="text-gray-400"
                                  style={{ marginTop: 0 }}
                                >
                                  {cumRap.diaChi}
                                </p>
                              </div>
                            </div>
                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                              {cumRap.lichChieuPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    // <NavLink
                                    //   to={`/checkout/${lichChieu.maLichChieu}`}
                                    //   key={index}
                                    //   className="col-span-1 text-green-800 font-bold"
                                    // >
                                    //   {moment(
                                    //     lichChieu.ngayChieuGioChieu
                                    //   ).format("hh:mm A")}
                                    // </NavLink>

                                    <>
                                      {!localStorage.getItem(USER_LOGIN) ? (
                                        <NavLink
                                          key={index}
                                          className="col-span-1 text-green-800 font-bold"
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
                                          // data-dismiss="modal"
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                          className="col-span-1 text-green-800 font-bold"
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
                                                Do you already have an account ?
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
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
            <TabPane tab="Information" key="2">
              Information
            </TabPane>
            <TabPane tab="Evaluate " key="3">
              Evaluate
            </TabPane>
          </Tabs>
        </div>
        {/* </CustomCard> */}
      </div>

      <Footer />
    </div>
  );
}

// {*
// *} npm i react-circle --force
// <Circle
// animate={true} // Boolean: Animated/Static progress
// animationDuration="1s" //String: Length of animation
// responsive={true} // Boolean: Make SVG adapt to parent size
// size={150} // Number: Defines the size of the circle.
// lineWidth={14} // Number: Defines the thickness of the circle's stroke.
// progress={69} // Number: Update to change the progress and percentage.
// progressColor="cornflowerblue" // String: Color of "progress" portion of circle.
// bgColor="whitesmoke" // String: Color of "empty" portion of circle.
// textColor="hotpink" // String: Color of percentage text color.
// textStyle={{
//   font: "bold 5rem Helvetica, Arial, sans-serif", // CSSProperties: Custom styling for percentage.
// }}
// percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
// roundedStroke={true} // Boolean: Rounded/Flat line ends
// showPercentage={true} // Boolean: Show/hide percentage.
// showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
// />
