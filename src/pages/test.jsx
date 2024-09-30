import React, { useState } from "react";
import {Button,Form,Grid,Input,theme,Typography,Steps,Modal,} from "antd";
import ConfirmOTP from "../component/confirm_OTP";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { registerApi } from "../util/apis";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;
let fetAip = true;

export default function SignUpPage() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    console.log(fetAip);
    if (fetAip) {
      setDisabled(true);
      fetAip = false;
      try {
        
      } catch (error) {
        
      }
      // const res = await registerApi({
      //   name: FullName,
      //   email: Email,
      //   password: PassWord,
      // });
     
    }
    setIsModalOpen(true);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      width: "380px",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
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
          <h1 style={{ textAlign: "center", marginBottom: 30 }}>Sign up</h1>
        </div>
        <Form
          name="normal_signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email phải có định dạng @gmail.com!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Already have an account?</Text>
              <Link to="/login"> Sign in</Link>.
            </div>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title={<span style={{ fontSize: "20px" }}>Sign up</span>}
        width={"50%"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        maskClosable={false}
      >
        <Steps
          current={1}
          items={[
            {
              title: "Submit form",
            },
            {
              title: "Confime OTP",
            },
            {
              title: "Success",
            },
          ]}
        />
        <ConfirmOTP />
      </Modal>
    </section>
  );
}
