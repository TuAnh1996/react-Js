// import { Modal, Button, Space } from "antd";
// import { ExclamationCircleOutlined, } from "@ant-design/icons";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// import { useNavigate } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";
import { Navigate, useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import css from "../../assets/css/modal.css";
import { useState } from "react";
export default function Profile(props) {
  // Do you already have an account?
  const navigate = useNavigate();
  // if (_.isEmpty(userLogin)) {
  const a = () => {
    if (!localStorage.getItem(USER_LOGIN)) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/register" />;
    }
  };
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yessdd",
      okType: "danger",
      cancelText: "Nodsds",
      onOk() {
        navigate("/login");
        console.log("OK");
      },

      onCancel() {
        navigate("/login");
        console.log("Cancel");
      },
    });
  };
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  // if (!localStorage.getItem(USER_LOGIN)) {
  return (
    <div>
      <NavLink to="" type="primary" onClick={showModal}>
        Open Modal with async logic
      </NavLink>
      <Modal
        // title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="modal-header" style={{ border: "none" }}>
          <h4 className="modal-title">Do you already have an account ?</h4>
          <button type="button" className="close" onClick={handleCancel}>
            ×
          </button>
        </div>
        <div className="modal-footer" style={{ border: "none" }}>
          <Button
            onClick={() => {
              navigate(`/admin/login`);
            }}
            type="primary"
            data-dismiss="modal"
          >
            Sigin
          </Button>
          <Button
            onClick={() => {
              navigate(`/admin/register`);
            }}
            type="primary"
            data-dismiss="modal"
          >
            Sigup
          </Button>
        </div>
      </Modal>

      <Button onClick={showDeleteConfirm} type="dashed">
        Delete
      </Button>
      <div>
        <button
          type="button"
          style={{ backgroundColor: "#0062cc" }}
          className="btn btn-outline-success "
          data-toggle="modal"
          data-target="#myModal"
        >
          Open modal
        </button>
        {!localStorage.getItem(USER_LOGIN) ? (
          <NavLink
            className="text-2xl text-green-400"
            to=""
            data-toggle="modal"
            data-target="#myModal"
          >
            đi đăng ký tk
          </NavLink>
        ) : (
          <NavLink
            // data-dismiss="modal"
            to="/checkout"
            className="text-2xl text-green-400"
            data-toggle="modal"
            data-target="#myModal"
          >
            vào film
          </NavLink>
        )}

        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ border: "none" }}>
                <h4 className="modal-title">Do you already have an account?</h4>
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
              </div>
              <div className="modal-footer" style={{ border: "none" }}>
                {/* <Button type="primary" data-dismiss="modal"> */}
                {/* {/* <div class="modal" id="myModal" style="display: none;"  */}
                <NavLink
                  // onClick={() => {
                  //   // navigate("/login");
                  // }}
                  to="/login"
                  // data-dismiss="modal"
                >
                  Sigin{" "}
                </NavLink>
                {/* </Button> */}
                <NavLink
                  // onClick={() => {
                  //   // navigate("/register");
                  // }}
                  to="register"
                  type="primary"
                  data-dismiss="modal"
                >
                  Sigup
                </NavLink>
                {/* <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  type="primary"
                  data-dismiss="modal"
                >
                  Sigin
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  type="primary"
                  data-dismiss="modal"
                >
                  Sigup
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
  // return (
  //   <div>
  //     <button
  //       type="button"
  //       style={{ backgroundColor: "#0062cc" }}
  //       className="btn btn-outline-success "
  //       data-toggle="modal"
  //       data-target="#myModal"
  //     >
  //       Open modaldfsf
  //     </button>
  //   </div>
  // );
}

// export default Profile;
