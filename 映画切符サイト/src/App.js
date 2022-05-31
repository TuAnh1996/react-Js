import "./App.css";
// import Login from "./pages/Login/Login";
import { Route, Routes, useNavigate, Link } from "react-router-dom";

import Contact from "./pages/Contact/Contact";
import New from "./pages/New/New";
import Detail from "./pages/Detail/Detail";
import CheckOut from "./pages/CheckOut/CheckOut";
import Login from "./pages/Login/Login";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Footer from "./template/HomeTemplate/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import Film from "./pages/Admin/Films";
import ShowTime from "./pages/Admin/Showtime/ShowTime";
import User from "./pages/Admin/User";
import Films from "./pages/Admin/Films";
import AddNew from "./pages/Admin/AddNew/AddNew";
import Edit from "./pages/Admin/Edit";
import Register from "./pages/Register/Register";
import AddUser from "./pages/Admin/AddUser/AddUser";

// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
const OtherComponent = React.lazy(() => import("./pages/Login/Login"));
// import "/dist/output.css";

function App() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ADD_NAVIGATE",
      navigate: navigate,
    });
  });

  return (
    <div className="App">
      <LoadingComponent />
      {/* <Route path="/login" element={ <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>} /> */}
      <Routes>
        <Route path="/news" element={<New />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout/:id/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/checkout/:id" element={<CheckOut />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/footer" element={<Footer />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout/:id/register" element={<Register />} />
        <Route path="/admin/register" element={<Register />} />
        {/* checkout/${lichChieu.maLichChieu}/register */}
        <Route path="/admin/*" element={<Admin />}>
          <Route path="/admin/*films" element={<Films />} />
          <Route path="/admin/*showtime" element={<ShowTime />} />
          <Route path="/admin/*user" element={<User />} />
          <Route path="/admin/*addfilm" element={<AddNew />} />
          <Route path="/admin/*edit/:id" element={<Edit />} />
          <Route path="/admin/*showtime/:id/:tenPhim" element={<ShowTime />} />
          <Route path="/admin/*adduser" element={<AddUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

/* <Route path="/" element={<Login />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/cyberBoard" element={<h1>Cyber Board</h1>} />
          <Route
            path="/admin/projectManagement"
            element={<h1>Project management</h1>}
          />
          <Route path="/admin/managenent" element={<UserManagement />} />
          <Route path="/admin/createProject" element={<CreateProject />} />
        </Route>
        <Route path="*" element={<PageNotFound />} /> */

//  <Routes>
//     <Route path="/" element={<UserManagement />} />
//     <Route>
//       <Route path="/cyberBoard" element={<h1>Cyber Board</h1>} />
//       <Route
//         path="/projectManagement"
//         element={<h1>Project management</h1>}
//       />
//       <Route path="/createProject" element={<CreateProject />} />
//       <Route path="/createProject" element={<CreateProject />} />
//       <Route path="/managenent" element={<UserManagement />} />
//     </Route>
//   </Routes>
