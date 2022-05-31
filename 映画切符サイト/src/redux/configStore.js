import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
// import NavigateReducer from "./reducers/NavigateReducer";
// import UserReducer from "./reducers/UserReducer/UserReducer";
import LoadingReducer from "./reducers/LoadingReducer";
// import ModalEditReducer from "./reducers/ModalEditReducer";
import CarouselReducer from "./reducers/CarouselReducer";
import { DanhSachPhimReducer } from "./reducers/DanhSachPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import NavigateReducer from "./reducers/NavigateReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
// import NavigateReducer from "./reducers/NavigateReducer copy";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  // NavigateReducer,
  // UserReducer,
  LoadingReducer,
  // ModalEditReducer,
  CarouselReducer,
  DanhSachPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  NavigateReducer,
  QuanLyDatVeReducer,
});
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

middleWareSaga.run(rootSaga);

export default store;
