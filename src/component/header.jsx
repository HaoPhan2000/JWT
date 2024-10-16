import React, { useContext, useState, useEffect } from "react";
import {
  OrderedListOutlined,
  HomeFilled,
  CaretDownOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import tokenMethod from "../util/token";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logoutApi } from "../util/apis";
import { Link, useLocation } from "react-router-dom";
import { InfoContext } from "../context/infoContext";

const Header = () => {
   
  const navigate = useNavigate();
  const { info, setInfo } = useContext(InfoContext);
  const location = useLocation();

  const [current, setCurrent] = useState("");

  useEffect(() => {
    switch(location.pathname) {
      case "/":
        setCurrent("Home");
        break;
      case "/rank":
        setCurrent("Rank");
        break;
        case "/game":
          setCurrent("Game");
          break;
      default:
        setCurrent("Home");
    }
  }, [location.pathname]);

  const leftItems = [
    {
      label: <Link to={"/"}>Home</Link>,
      style:{userSelect:"none"},
      key: "Home",
      icon: <HomeFilled />,
    },
    {
      label: <Link to={"/rank"}>Rank</Link>,
      style:{userSelect:"none"},
      key: "Rank",
      icon: <OrderedListOutlined />,
    },
    {
      label: <Link to={"/game"}>Game</Link>,
      style:{userSelect:"none"},
      key: "Game",
      icon:  <FontAwesomeIcon icon={faGamepad} />,
    },
  ];

  const rightItems = [
    {
      label: info?.user?.email,
      style:{userSelect:"none"},
      key: "SubMenu",
      icon: <CaretDownOutlined />,
      children: [
        ...(info.isLogin
          ? [
              {
                label: (
                  <span
                    onClick={async () => {
                      try {
                        await logoutApi();
                        tokenMethod.remove();
                        setInfo({
                          isLogin: false,
                          user: { email: "" },
                        });
                        navigate("/");
                      } catch (error) {
                        setInfo({
                          isLogin: false,
                          user: { email: "" },
                        });
                        tokenMethod.remove();
                      }
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "Logout",
                icon: <LogoutOutlined />,
              },
            ]
          : [
              {
                label: <Link to={"/login"}>Login</Link>,
                key: "Login",
                icon: <LoginOutlined />,
              },
            ]),
      ],
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={leftItems}
        style={{ flex: 1 }}
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={rightItems}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
    </div>
  );
};

export default Header;
