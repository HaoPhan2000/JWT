import React, { useContext } from "react";
import text from "../constants/text";
import { loginApi } from "../util/apis";
import {
  Button,
  Form,
  Grid,
  Input,
  notification,
  theme,
  Typography,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import tokenMethod from "../util/token";
import { InfoContext } from "../context/infoContext";
import { jwtDecode } from "jwt-decode";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const LoginPage = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { setInfo } = useContext(InfoContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const res = await loginApi({ email, password });
      tokenMethod.set(res.data?.access_token);
      const decodeToken = jwtDecode(res.data?.access_token);
      setInfo({
        isLogin: true,
        user: { email: decodeToken.email },
      });
      notification.success({
        message: text.loginTitle,
        description: res?.data?.EM || text.success,
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: text.loginTitle,
        description: error?.response?.data?.EM || text.error,
      });
    }
  };
  notification.config({ placement: "bottomRight" });
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },

    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div>
          <h1 style={{ textAlign: "center", marginBottom: 30 }}>Sign in</h1>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            label="Username"
            rules={[
              { required: true, message: "Please input your gmail!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email phải có định dạng @gmail.com!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Gmail" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link
              to="/forgot-password"
              style={{
                width: "100%",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Forgot password?
            </Link>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Sign in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link to="/register">Sign up now.</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
export default LoginPage;
