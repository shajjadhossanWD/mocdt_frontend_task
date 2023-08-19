import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader2 from "../Common/Loader";
import { AuthContext } from "./AuthContext";

const RequireUser = () => {
  const location = useLocation();
  const { currentUser} = useContext(AuthContext);
  const lsToken = localStorage.getItem("emailapp");

  console.log("location from require user", location);

  if (!currentUser && lsToken) {
    return <Loader2 />;
  }

  if (!lsToken  || !currentUser) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

export default RequireUser;
