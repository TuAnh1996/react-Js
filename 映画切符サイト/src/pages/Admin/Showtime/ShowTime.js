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
import { useParams } from "react-router";
import { useEffect } from "react";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import { useFormik } from "formik";
import moment from "moment";
import Film from "../../../components/Film/Film";
export default function ShowTime() {
  // const FormSizeDemo = () => {

  // mình muốn khi click chọn hệ thống rạp thì đồng thời cụm rạp nó cũng dc lấy ra .Nếu sd 2 state thfi khi 1 state đc thay đổi thì nó sẽ gọi setastate làm thay đổi dữ liệu và cái state ban đầu sẽ đc set về gốc
  // Do đó ta chỉ xet 1 state khi heThongRapChieu thay đổi thì ta giữa nguyên ... rồi sau đó mới gán gtri
  const { id, tenPhim } = useParams();
  // console.log(tenPhim);
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      // console.log("values", values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);

        alert(result.data.content);
      } catch (error) {
        // console.log("error", error.response?.data);
      }
    },
  });
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  // console.log(state.heThongRapChieu);
  useEffect(() => {
    return async () => {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();

        setState({
          ...state,
          //lấy nhuwxg thông tin cũ và chỉ thay bằng cái mới ở dưới
          heThongRapChieu: result.data.content,
        });
      } catch (error) {
        // console.log(error)
      }
    };
  }, []);
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onOk = (value) => {
    // console.log("onOk: ", value);
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    // console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const handleChangeHeThongRap = async (value) => {
    //từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      //Gán giá trị cụm rạp vào state.cumRap
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      // console.log("error", error.response?.data);
    }
  };
  const onchangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  let filmStorage = {};
  if (localStorage.getItem("film")) {
    filmStorage = JSON.parse(localStorage.getItem("film"));
    // console.log(filmStorage);
  }

  return (
    <Form
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
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl">Create showtimes - {tenPhim}</h3>
      <img sre={filmStorage.hinhAnh} alt="" width={200} height={100} />
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Theater system">
        {/* hàm Cascader nó chỉ show cái label ra  */}
        <Cascader
          options={state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
          })}
          onChange={handleChangeHeThongRap}
          // ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap })) ta viết ngọn bằng cách thay retun và { } = ()
        />
        {/* <Cascader options={[{ value: "zhejiang", label: "Zhejiangads" }]} /> */}
      </Form.Item>
      <Form.Item label="Cluster of theaters">
        {/* hàm Cascader nó chỉ show cái label ra  */}
        <Cascader
          options={state.cumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap,
            value: cumRap.maCumRap,
          }))}
          onChange={handleChangeCumRap}
        />
      </Form.Item>

      <Form.Item label="Time">
        {/* thêm thuôc tính showTime để show cả h ra */}
        {/* onOk={onOk} dùng khi ta ấn ok nó ms lấy gtri  */}
        <DatePicker
          showTime
          onOk={onOk}
          format="DD/MM/YYYY hh:mm:ss"
          onChange={onChangeDate}
        />
        {/* mình cần format lại cho giống vs backend format="DD/MM/YYYY hh:mm:ss" ngày tháng năm h phút s  */}
      </Form.Item>
      <Form.Item label="Price">
        {/* ta có min={1} max={100000}   */}
        <InputNumber min={1} max={100000} onChange={onchangeInputNumber} />
      </Form.Item>

      <Form.Item label="Action">
        {/* phải có htmlType="submit" này mới bắt sự kiện submit đc  */}
        <Button htmlType="submit">Create showtimes</Button>
      </Form.Item>
    </Form>
  );
  // };
}
