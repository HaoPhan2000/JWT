import { useContext } from "react";
import { InfoContext } from "../context/infoContext";
import { Navigate,Outlet } from "react-router-dom";
const AppRouters = () => {
  const { info } = useContext(InfoContext);

  if (info.isLogin) {
   return <Navigate to="/" replace={true} />
  }
 
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppRouters;
