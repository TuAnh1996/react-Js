import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";

import _ from "lodash";

import { object } from "yup";
import { GROUPID } from "../../util/settings/config";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "../../redux/reducers/reduxThunk/QuanLyPhimActions";

export default function Edit() {
  // const Edit = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinPhim } = useSelector((state) => state.DanhSachPhimReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  // tạo file ảnh
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, []);
  const formik = useFormik({
    // dữ liệu cần post nên cho back end
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim, // ta sẽ để chết k cho nó thay đổi
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      maNhom: GROUPID,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      hinhAnh: null,
      //nếu null trong trg hợp nó k thay đổi thì dùng null khi đó backend sẽ k xửu lý
    },

    onSubmit: (values) => {
      // console.log("values", values);
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    // console.log('datepickerchange',);
    // format('DD/MM/YYYY') nó chả về 1 object do đó ta sd moment để format nó  thành chuỗi
    let ngayKhoiChieu = moment(value);
    // setFieldValue cái này để ta gán gtri   nó vào giá trị vào cái initialValues
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  // xử lý chiếu hay chưa chiếu
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0]; //[0 ] vì ta chỉ lấy 1 file ảnh
    // sau khi lấy đc file tạo 1 đối tượng để đọc file
    // sau khi lấy đc file dạng object thì ta cho hình nó hiển thị
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //Đem dữ liệu file lưu vào formik,async await để dảm bảo nó load đc file xong nó ms xử lý
      await formik.setFieldValue("hinhAnh", file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setImgSrc(e.target.result); //Hình base 64
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      {" "}
      <h3>Edit Film </h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Name">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Describe">
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Time">
        <DatePicker
          format="DD/MM/YYYY"
          onChange={handleChangeDatePicker}
          value={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item label="Showing">
        <Switch
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Comming Soon">
        <Switch
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Evaluation">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          value={formik.values.danhGia}
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item label="Image">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        <br />
        {/* tạo 1 hình kết nói để ta xem có tạo đúng hình hay không,mỗi lần change file thì nó sẽ thya đổi do đó ta tạo useState  */}
        <img
          style={{ width: 150, height: 150 }}
          // mới đầu loafd nó sẽ lấy của api trả về khi đó nó chưa đổi state tuy nhiên khi ta chọn ảnh khác thì nó thay đỏi state do đó ta để chỗ hình ảnh là null để th nếu k thay dổi thì nó sẽ k đỏi do có thuộc tính null
          // imgSrc khi này sẽ lấy đc từ file mình thay đổi
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt=""
        />
      </Form.Item>
      <Form.Item label="Action">
        <button type="submit" className="bg-blue-300 text-white p-2">
          Update
        </button>
      </Form.Item>
    </Form>
  );
}
// return <Edit />;
// }
