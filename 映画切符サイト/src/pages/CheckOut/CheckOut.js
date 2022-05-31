import React from "react";
import { Button, Tabs } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/reducers/reduxThunk/QuanLyDatVeActions";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
// import { layThongTinChiTietPhim } from "../../redux/reducers/reduxThunk/QuanLyRapAction";
// import layChiTietPhongVeAction from ".";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
// import { Fragment } from "react";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import Footer from "../../template/HomeTemplate/Footer/Footer";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { layThongTinNguoiDungAction } from "../../redux/reducers/reduxThunk/QuanLyNguoiDungAction";
import moment from "moment";
import { connection } from "../..";
import { NavLink } from "react-router-dom";

function CheckOut(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(layChiTietPhongVeAction(id));

    //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong", () => {
      dispatch(layChiTietPhongVeAction(id));
    });

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    // khi ta thao tác thì nó sẽ tự độgn nhìn thấy mà k cần phải reload lại trang
    connection.invoke("loadDanhSachGhe", id);
    //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // console.log("danhSachGheKhachDat", dsGheKhachDat);
      //Bước 1: Loại mình ra khỏi danh sách,lấy tk khác vs tk của mình
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      // //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      // ta sẽ lấy mình ra dựa vào tk để lấy các ds đang đặt
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);
      // console.log(arrGheKhachDat);

      // //Đưa dữ liệu ghế khách đặt cập nhật redux
      // th mạng yếu ngta có thể đặt trùng lặp do đó ta sd hàm của  lodash
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });

    // FlappyBird というゲームをJavaScript 言語で制作して、PythonのDjangoを使用してコメント欄を作りました。FlappyBird というゲームをJavaScript 言語で制作して、PythonのDjangoを使用してコメント欄を作りました。

    //Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);
  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, id);
  };
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  // console.log(danhSachGheDangDat);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/login" />;
  }
  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      // map đc tất cả các ghế dựa vào id mã của nó
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD !== -1) {
        classGheDaDat = "gheDangDat";
      }
      //Kiểm tra từng render xem có phải ghế khách đặt hay không
      // sau đó ta kiểm tra xem nó có phải ghế đã đặt hay k nếu đã đặt thì mình hiện thi lại css
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      // khi mình click đặt ghế nó sẽ kiểm tra xem cái tài khoản token  vs tk người đạt dc chả về từ back end sau khi click đặt / thfi ta đổi css
      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      return (
        <>
          <button
            onClick={() => {
              // dispatch({
              //   type: DAT_VE,
              //   ghe,
              // });
              const action = datGheAction(ghe, id);
              dispatch(action);
              // console.log(ghe);
              // disabled={ghe.daDat nếu dispatch bằng true thì click đc còn fasle thì không
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`}
            key={index}
          >
            {/* nếu ghế đã đăt bằng true thì hiện bthg còn false tức đã đặt ròi thfi hiện dấu X  */}
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {/* cứ 16 dòng lại xuống  */}
          {/* {(index + 1) % 16 === 0 ? <br /> : ""} */}
        </>
      );
    });
  };

  return (
    <div className="max-h-full">
      <div className="  mt-5 ">
        <div className="grid grid-cols-12">
          <div className="col-span-9">
            <div className="flex flex-col items-center mt-5">
              <div
                className="bg-black "
                style={{ width: "80%", height: 15 }}
              ></div>
              <div className={`${style["trapezoid"]} text-center`}>
                <h3 className="mt-3 text-black">Screen</h3>
              </div>
              <div className="w-4/5 0 mx-auto">{renderSeats()}</div>
            </div>
            <div className="mt-5 flex justify-center">
              <div className="mt-5 flex justify-center">
                <table className=" divide-y divide-gray-200 w-2/3">
                  <thead className="bg-gray-50 p-5">
                    <tr>
                      <th>Seats not booked</th>
                      <th>Seats are being booked</th>
                      <th>Vip</th>
                      <th>Seats booked</th>
                      <th>I booked</th>
                      <th>Booked</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td>
                        <button className="ghe text-center">
                          {" "}
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />{" "}
                        </button>{" "}
                      </td>
                      <td>
                        <button className="ghe gheDangDat text-center">
                          {" "}
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />
                        </button>{" "}
                      </td>
                      <td>
                        <button className="ghe gheVip text-center">
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />
                        </button>{" "}
                      </td>
                      <td>
                        <button className="ghe gheDaDat text-center">
                          {" "}
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />{" "}
                        </button>{" "}
                      </td>
                      <td>
                        <button className="ghe gheDaDuocDat text-center">
                          {" "}
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />{" "}
                        </button>{" "}
                      </td>
                      <td>
                        <button className="ghe gheKhachDat text-center">
                          {" "}
                          <CheckOutlined
                            style={{ marginBottom: 7.5, fontWeight: "bold" }}
                          />{" "}
                        </button>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <h3 className="text-green-400 text-center text-4xl">
              {danhSachGheDangDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ (VietNam)
            </h3>
            <hr />
            <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
            <p>
              Place: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
            </p>
            <p>
              Time: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
            </p>
            <hr />
            <div className="flex flex-row my-5">
              <div className="w-4/5">
                <span className="text-red-400 text-lg">Seat</span>
                <br />
                {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                  return (
                    <span key={index} className="text-green-500 ml-1 text-xl">
                      {gheDD.stt}
                      {(index + 1) % 8 === 0 ? <br /> : ""}
                    </span>
                  );
                })}
                {/* {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}</span>
                            })} */}
              </div>
              <div className="text-right col-span-1">
                <span className="text-green-800 text-lg">
                  {danhSachGheDangDat
                    .reduce((tongTien, ghe, index) => {
                      return (tongTien += ghe.giaVe);
                    }, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
            <hr />
            <div className="my-5">
              <i>Email</i> <br />
              {userLogin.email}
            </div>
            <hr />
            <div className="my-5">
              <i>Phone</i> <br />
              {userLogin.soDT}
            </div>
            <hr />
            <div
              className="mb-0  flex flex-col items-center"
              style={{ marginBottom: 0 }}
            >
              <div
                onClick={() => {
                  const thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = id;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;
                  // console.log("thongTinDatVe", thongTinDatVe);
                  dispatch(datVeAction(thongTinDatVe));
                }}
                className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
              >
                Booking
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const { TabPane } = Tabs;
export default function CheckOutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // làm thế này mục đích để khi ta đang ở tab 2 nhưng ta thoát về trang chru nhưng khi quay lại để nó sẽ load hay dispatch cái này trc để gọi về hiện thị tab 1
  useEffect(() => {
    return () => {
      dispatch({
        type: "CHANGE_TAB_ACTIVE",
        number: "1",
      });
    };
  }, []);

  const operations = (
    <div>
      {!_.isEmpty(userLogin) ? (
        <>
          <button
            style={{ color: "#48433b", fontWeight: "700" }}
            className="mr-5"
          >
            Hello ! {userLogin.taiKhoan}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              navigate("/");
              window.location.reload(); // nút này để reload lại trang ví navigate nó chuyển trang k thôi,như vậy dữ liệu xóa kia nếu k reload nó sẽ k mất đi
            }}
            className="mr-5 chekout"
            // style={style}
          >
            Logout
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="mr-9 chekout"
            // style={style}
          >
            Home
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: "CHANGE_TAB_ACTIVE",
            number: key,
          });
        }}
      >
        <TabPane tab="01 CHOOSE & PAYMENT" key="1">
          <CheckOut {...props} />
        </TabPane>
        <TabPane tab="02 BOOKING RESULTS" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  // console.log(thongTinNguoiDung);
  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      // ta lấy hàng ghế đầu tiên ddeer tuừ đó in ra tên hệ thống rạp hay cụm tạp
      // console.log(ticket);

      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-pink-500 title-font font-medium text-2xl">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span className="font-bold">Time:</span>{" "}
                {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                <span className="font-bold">Date:</span>{" "}
                {moment(ticket.ngayDat).format("DD-MM-YYYY")} .
              </p>
              <p>
                <span className="font-bold">Place:</span> {seats.tenHeThongRap}{" "}
              </p>
              <p>
                <span className="font-bold">Theater :</span> {seats.tenCumRap} -{" "}
                <span className="font-bold">Seat:</span>{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-500 text-xl" key={index}>
                      {" "}
                      [ {ghe.tenGhe} ]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Customer booking history
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Enjoy the movie!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
