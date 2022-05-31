// import axios from "axios";

// import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "../../actions/types/CarouselType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    // axios là thư viện gọi api của reduxThunk
    try {
      //Sử dụng tham số thamSo ,result là kq đợi api gọi nó gắn kq result.Ta sẽ gửi dường link vào cho nó cộng với methond
      const result = await quanLyPhimService.layDanhSachBanner();
      // sau đó ta đưua lên reducer
      // console.log(result);
      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (errors) {
      // console.log("errors", errors);
    }
  };
};
