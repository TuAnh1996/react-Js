import Slider from "react-slick";
import React from "react";
import "./ReactSlickCss.css";
import Film from "../Film/Film";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ReactSlick(props) {
  const { t, i18n } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 2,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 925,
        settings: {
          slidesToShow: 2,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,

          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const { arrFilm } = props;
  // console.log(arrFilm);
  const renderFilms = () => {
    // ví dụ ở đâu .map.slice(0,10) tức chỉ lấy 10 phim
    return arrFilm.map((itemPhim, index) => {
      return (
        <div key={index} className="my-2 ">
          <Film phim={itemPhim} />
        </div>
      );
    });
  };

  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.DanhSachPhimReducer
  );
  let activeDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";
  return (
    <div className="w-9/12 mx-auto mt-5">
      <button
        className={` ${activeDC} px-8 py-3 font-semibold rounded ml-0 mb-8  m-5 border-gray-800 border`}
        onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU };
          dispatch(action);
        }}
      >
        {t("Now Showing")}
      </button>
      <button
        className={` ${activeClassSC} px-8 py-3 font-semibold rounded  border-gray-800 border`}
        onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU };
          dispatch(action);
        }}
      >
        {t("Comming Soon")}
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
}
