import { Carousel } from "antd";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselAction } from "../../redux/reducers/reduxThunk/CarouselActions";
export default function HomeCarousel() {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div style={contentStyle}>
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              style={{ height: "600px", width: "100%" }}
            />
          </div>
        </div>
      );
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);
  const contentStyle = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return <Carousel autoplay>{renderImg()}</Carousel>;
}
