import React from "react";
import { useSelector } from "react-redux";
import styleLoading from "./LoadingComponentCSS.module.css";
export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={require("../../../assets/image/loading.gif")} alt="loading" />
      </div>
    );
  } else {
    return "";
  }
}
