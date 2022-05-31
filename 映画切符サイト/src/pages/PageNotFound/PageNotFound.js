import React from "react";
import { useLocation } from "react-router-dom";
export default function PageNotFound() {
  const { pathname } = useLocation();
  return (
    <div>
      <h1>404</h1>
      <h3> Page Not Found {pathname}</h3>{" "}
    </div>
  );
}
