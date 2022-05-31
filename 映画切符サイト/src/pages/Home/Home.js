import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";

import ReactSlick from "../../components/ReactSlick/ReactSlick";
import { layDanhSachPhimAction } from "../../redux/reducers/reduxThunk/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/reducers/reduxThunk/QuanLyRapAction";
import Footer from "../../template/HomeTemplate/Footer/Footer";
import Header from "../../template/HomeTemplate/Header";
import HomeCarousel from "../../template/HomeTemplate/HomeCarousel";
import HomeMenu from "../../template/HomeTemplate/HomeMenu";
import Contact from "../Contact/Contact";
import New from "../New/New";
// import ReactPlayer from "react-player";
// import { PlayCircleOutlined } from "@ant-design/icons";
// import YouTubePlayer from "react-player/lib/players/YouTube";
// import Profile from "../Profile/Profile";
// import { View } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
// import React, { useState } from 'react';
// import { Modal, Button } from "antd";
// import { useState } from "react";

export default function Home() {
  const { arrFilm } = useSelector((state) => state.DanhSachPhimReducer);

  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  // console.log(heThongRapChieu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full">
      <Header />
      <HomeCarousel />
      <ReactSlick arrFilm={arrFilm} />

      <div className="w-9/12 mx-auto mt-10">
        <div className="mb-12 ml-0">
          <span
            // style={{
            //   margin: "50px 0 20px 9%",
            //   fontSize: "25px",
            //   fontWeight: "600",cursor-default
            // }}
            className="px-8 py-3 font-semibold rounded   border-gray-800 border bg-gray-800 text-white  mb-8"
          >
            {t("Select Cinema")}
          </span>
        </div>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-12">
            <h5 className="text-base md:text-lg text-indigo-700 mb-1">
              See Our Recent News
            </h5>
            <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">
              Movie News in 24 hours
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src="https://s3img.vcdn.vn/123phim/2020/03/acd6fae7353783fb3a928ad01ba92e98.jpg"
                  alt="blog"
                />
                <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-base font-medium text-indigo-300 mb-1">
                    {" "}
                    May 5 2022
                  </h2>
                  <h1 className="text-2xl font-semibold mb-3">
                    Adidas Prophere
                  </h1>
                  <p className="leading-relaxed mb-3" />
                  <p>
                    {" "}
                    The adidas Primeknit upper wraps the foot with a supportive
                    fit that enhances movement.
                  </p>
                  <p />
                  <div className="flex items-center flex-wrap ">
                    <a
                      href="https://movie.zalopay.vn/landing"
                      className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      24
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      48
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src="https://s3img.vcdn.vn/123phim/2020/05/batman-vs-joker-ai-tot-ai-xau-15888416485092.png"
                  alt="blog"
                />
                <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-base font-medium text-indigo-300 mb-1">
                    {" "}
                    June 26 2022
                  </h2>
                  <h1 className="text-2xl font-semibold mb-3">
                    Adidas Prophere Black White
                  </h1>
                  <p className="leading-relaxed mb-3" />
                  <p>
                    {" "}
                    The adidas Primeknit upper wraps the foot with a supportive
                    fit that enhances movement.
                  </p>
                  <p />
                  <div className="flex items-center flex-wrap ">
                    <a
                      href="https://movie.zalopay.vn/landing"
                      className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      23
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      84
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src="https://s3img.vcdn.vn/123phim/2020/05/ba-dong-lin-shaye-cua-insidious-tai-xuat-trong-phim-kinh-di-bay-linh-hon-15891843391235.png"
                  alt="blog"
                />
                <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-base font-medium text-indigo-300 mb-1">
                    {" "}
                    September 9 2022
                  </h2>
                  <h1 className="text-2xl font-semibold mb-3">
                    Adidas Prophere Customize
                  </h1>
                  <p className="leading-relaxed mb-3" />
                  <p>
                    {" "}
                    The adidas Primeknit upper wraps the foot with a supportive
                    fit that enhances movement.
                  </p>
                  <p />
                  <div className="flex items-center flex-wrap ">
                    <a
                      href="https://movie.zalopay.vn/landing"
                      className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      43
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      69
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-5 p-2">
            <div className="col-span-3">
              <img
                src="https://s3img.vcdn.vn/123phim/2019/11/ford-v-ferrari-tuyet-tac-ve-lich-su-cua-mon-the-thao-toc-do-15750174492320.jpg"
                alt="https://s3img.vcdn.vn/123phim/2019/11/ford-v-ferrari-tuyet-tac-ve-lich-su-cua-mon-the-thao-toc-do-15750174492320.jpg"
              />
              <div>
                <a
                  href="https://movie.zalopay.vn/landing"
                  className="text-left font-bold text-lg  text-black"
                >
                  The midsole contains 20% more Boost for an amplified Boost
                  feeling.
                </a>
                <p>
                  The adidas Primeknit upper wraps the foot with a supportive
                  fit that enhances movement.
                </p>
                <div className="flex text-left" style={{ width: "100%" }}>
                  <span className="flex  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    48
                  </span>
                  <span className="flex ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    24
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <img
                src="https://s3img.vcdn.vn/123phim/2019/12/tro-choi-ky-ao-thang-cap-the-rock-va-dong-bon-tiep-tuc-pha-dao-the-gioi-ao-15762670084453.jpg"
                alt="https://s3img.vcdn.vn/123phim/2019/12/tro-choi-ky-ao-thang-cap-the-rock-va-dong-bon-tiep-tuc-pha-dao-the-gioi-ao-15762670084453.jpg"
              />
              <div>
                <a
                  href="https://movie.zalopay.vn/landing"
                  className="text-left font-bold text-lg  text-black"
                >
                  The midsole contains 20% more Boost for an amplified Boost
                  feeling.
                </a>
                <p>
                  The adidas Primeknit upper wraps the foot with a supportive
                  fit that enhances movement.
                </p>
                <div className="flex text-left" style={{ width: "100%" }}>
                  <span className="flex  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    84
                  </span>
                  <span className="flex ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    23
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <img
                src="https://s3img.vcdn.vn/123phim/2019/12/chi-chi-em-em-ban-remix-cuc-gat-cua-doi-lua-phan-boi-tinh-duc-15763077972671.jpg"
                alt="https://s3img.vcdn.vn/123phim/2019/12/chi-chi-em-em-ban-remix-cuc-gat-cua-doi-lua-phan-boi-tinh-duc-15763077972671.jpg"
              />
              <div>
                <a
                  href="https://movie.zalopay.vn/landing"
                  className="text-left font-bold text-lg  text-black"
                >
                  The midsole contains 20% more Boost for an amplified Boost
                  feeling.
                </a>
                <p>
                  The adidas Primeknit upper wraps the foot with a supportive
                  fit that enhances movement.
                </p>
                <div className="flex text-left" style={{ width: "100%" }}>
                  <span className="flex  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    69
                  </span>
                  <span className="flex ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    43
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3 ">
              <div className="flex flex-row">
                <img
                  className="imageFixed"
                  src="https://s3img.vcdn.vn/123phim/2020/03/acd6fae7353783fb3a928ad01ba92e98.jpg"
                  alt="The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.

"
                  style={{ width: 50, height: 50 }}
                />
                <a
                  className="para text-black"
                  href="https://movie.zalopay.vn/landing"
                >
                  <p>
                    The adidas Primeknit upper wraps the foot with a supportive
                    fit that enhances mo ...
                  </p>
                </a>
              </div>
              <div className="flex flex-row">
                <img
                  className="imageFixed"
                  src="https://s3img.vcdn.vn/123phim/2020/06/toi-se-lam-tat-ca-ngo-ngang-boi-phien-ban-ta-ac-cua-minh-song-ji-hyo-15925373032288.png"
                  alt="Bán Đảo Peninsula là bom tấn xác sống không thể bỏ lỡ!.

"
                  style={{ width: 50, height: 50 }}
                />
                <a
                  className="para text-black"
                  href="https://movie.zalopay.vn/landing"
                >
                  <p>Bán Đảo Peninsula là bom tấn xác sống không thể bỏ lỡ!.</p>
                </a>
              </div>
              <div className="flex flex-row">
                <img
                  className="imageFixed"
                  src="https://s3img.vcdn.vn/123phim/2020/06/ban-dao-peninsula-la-bom-tan-xac-song-khong-the-bo-lo-15925398181587.png"
                  alt="[Review] Gái Già Lắm Chiêu 3 - Cuộc chiến mẹ chồng - nàng dâu của giới siêu giàu xứ Huế

"
                  style={{ width: 50, height: 50 }}
                />
                <a
                  className="para text-black"
                  href="https://movie.zalopay.vn/landing"
                >
                  <p>
                    [Review] Gái Già Lắm Chiêu 3 - Cuộc chiến mẹ chồng - nàng
                    dâu của giới siêu giàu ...
                  </p>
                </a>
              </div>
              <div className="flex flex-row">
                <img
                  className="imageFixed"
                  src="https://s3img.vcdn.vn/123phim/2020/05/ba-dong-lin-shaye-cua-insidious-tai-xuat-trong-phim-kinh-di-bay-linh-hon-15891843391235.png"
                  alt="Diễn viên đặc biệt của Bằng Chứng Vô Hình.

"
                  style={{ width: 50, height: 50 }}
                />
                <a
                  className="para text-black"
                  href="https://movie.zalopay.vn/landing"
                >
                  <p>Diễn viên đặc biệt của Bằng Chứng Vô Hình.</p>
                </a>
              </div>
              <div className="flex flex-row">
                <img
                  className="imageFixed"
                  src="https://s3img.vcdn.vn/123phim/2020/01/30-chua-phai-tet-phim-vong-lap-thoi-gian-thuong-hieu-viet-15797534839619.jpg"
                  alt="[Review] Bí Mật Của Gió - Câu chuyện “tình người duyên ma” đầy nước mắt.

"
                  style={{ width: 50, height: 50 }}
                />
                <a
                  className="para text-black"
                  href="https://movie.zalopay.vn/landing"
                >
                  <p>
                    [Review] Bí Mật Của Gió - Câu chuyện “tình người duyên ma”
                    đầy nước mắt.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <Routes>
        <Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<New />} />
        </Route>
      </Routes>
    </div>
  );
}
