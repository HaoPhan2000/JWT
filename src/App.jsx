import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.jsx";
import HomePage from "./pages/home.jsx";
import RankPage from "./pages/rank.jsx";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import GamePage from "./pages/game.jsx";
import ForgotPasswordPage from "./pages/forgotPassword.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import PrivateRoute from "./routers/privateRoute.jsx";
import AppRouters from "./routers/appRouters.jsx";
import PATHS from "./constants/path.js";
import { Spin } from "antd";
import { useContext, useEffect } from "react";
import { infoAccountApi } from "./util/apis";
import { InfoContext } from "./context/infoContext";

function App() {
  const { setInfo, loading, setLoading } = useContext(InfoContext);

  useEffect(() => {
    async function infoAccount() {
      try {
        const info = await infoAccountApi();
        setInfo({
          isLogin: true,
          user: { email: info?.data?.email },
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    infoAccount();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            {/* App Wrapper */}
            <Route path={PATHS.HOME} element={<Layout />}>
              {/* Home Page will render at the root path */}
              <Route index element={<HomePage />} />
              <Route path={PATHS.RANK} element={<RankPage />} />
              <Route element={<PrivateRoute />}>
                <Route path={PATHS.GAME} element={<GamePage />} />
              </Route>
            </Route>
            {/* Public Routes */}
            <Route element={<AppRouters />}>
              <Route path={PATHS.REGISTER} element={<RegisterPage />} />
              <Route path={PATHS.LOGIN} element={<LoginPage />} />
              <Route
                path={PATHS.FORGOT_PASSWORD}
                element={<ForgotPasswordPage />}
              />
              <Route path={PATHS.RESET_PASSWORD} element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
