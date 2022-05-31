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
import { GROUPID } from "../../../util/settings/config";
import { object } from "yup";
import { themPhimUploadHinhAction } from "../../../redux/reducers/reduxThunk/QuanLyPhimActions";
export default function AddNew() {
  const dispatch = useDispatch();
  const AddFilm = () => {
    const formik = useFormik({
      // dữ liệu cần post nên cho back end
      initialValues: {
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: {}, // là 1 mảng dữ liệu dạng file
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
            // vì file mình truyền cho nó 3 tham số do đó cta cùng phải cần 3 tham số
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
        // formData.append("tenPhim", formik.values.tenPhim);
        //Gọi api gửi các giá trị formdata về backend xử lý
        // muốn lấy ra thì ta lam ntn
        // console.log(formData.get("tenPhim"));
        dispatch(themPhimUploadHinhAction(formData));
      },
    });

    const handleChangeDatePicker = (value) => {
      // console.log('datepickerchange',);
      // format('DD/MM/YYYY') nó chả về 1 object do đó ta sd moment để format nó  thành chuỗi
      let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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

    // tạo file ảnh
    const [imgSrc, setImgSrc] = useState("");
    const handleChangeFile = (e) => {
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
        //Tạo đối tượng để đọc file,hàm FileReader này đọc file
        let reader = new FileReader();
        // readAsDataURL hàm đọc file trả về url
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          // dùng onload để bắt lấy cái url .sau khi đọc nó trả về giá trị ,FileReader là đọc ocfn onload loafd giá trị nó ra
          // sau khi change file ta nó chả kq về e.target.result
          // console.log(e.target.result);
          setImgSrc(e.target.result); //Hình base 64
        };
        //Đem dữ liệu file lưu vào formik
        formik.setFieldValue("hinhAnh", file);
      }
    };

    const [componentSize, setComponentSize] = useState("default");

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
        <h3>AddFilm </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Describe">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Time">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Showing">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Comming Soon">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Evaluation">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
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
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>
        <Form.Item label="Action">
          <button type="submit" className="bg-blue-300 text-white p-2">
            AddFilm
          </button>
        </Form.Item>
      </Form>
    );
  };
  return <AddFilm />;
}
