import React, { Fragment, useEffect } from "react";
import { Table, Button } from "antd";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  EditOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../redux/reducers/reduxThunk/QuanLyPhimActions";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function Films() {
  const { Search } = Input;
  const { arrFilmDefault } = useSelector((state) => state.DanhSachPhimReducer);
  // console.log(arrFilmDefault);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  const data = arrFilmDefault;
  const columns = [
    {
      title: "Code",
      dataIndex: "maPhim",

      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </>
        );
      },
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Describe",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + " ..."
              : film.moTa}
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },

    {
      title: "Action",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <>
            <NavLink
              key={1}
              className=" mr-5  text-2xl"
              to={`/admin/edit/${film.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            {/* xóa  */}
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl mr-5"
              onClick={() => {
                //Gọi action xoá
                if (
                  window.confirm(
                    "Are you sure delete this Film ? " + film.tenPhim
                  )
                ) {
                  //Gọi action
                  dispatch(xoaPhimAction(film.maPhim));
                  window.location.reload(); //nút để reload trang
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
            <NavLink
              key={film.maPhim}
              to={`/admin/showtime/${film.maPhim}/${film.tenPhim}`}
              // khi mình click vào nó sẽ set và lưu dữ liệu fim vào localStorage cho mình để sd
              onClick={() => {
                localStorage.setItem("film", JSON.stringify(film));
              }}
              className="text-2xl"
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = (value) => {
    // value chinh cai minh Search
    dispatch(layDanhSachPhimAction(value));
  };
  return (
    <div>
      <h3>Film Manager</h3>
      <Button
        className="mb-5"
        onClick={() => {
          navigate("/admin/addfilm");
        }}
      >
        AddFilm
      </Button>
      {/* ta dựa vào api lấy danh sách fim để tìm kiếm vì danh sách fim sẽ đc tìm dựa vào tên phim  */}
      <Search
        className=" my-5"
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch} // hàm này sẽ nhận keyword của mình để tìm
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"} //để nó k cảnh báo lỗi
      />
    </div>
  );
}
