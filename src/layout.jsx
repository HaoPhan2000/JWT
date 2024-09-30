import { Outlet } from "react-router-dom";
import Header from "./component/header";
import "./styles/main.css";
function Layout() {
  return (
    <div>
      <>
        <Header />
        <Outlet />
      </>
    </div>
  );
}
export default Layout;
