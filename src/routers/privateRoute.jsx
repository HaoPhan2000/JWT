import { useContext, useEffect } from "react";
import { InfoContext } from "../context/infoContext";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const { info } = useContext(InfoContext);
  if (!info.isLogin) {
    return <Navigate to="/login" replace={true} />
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
