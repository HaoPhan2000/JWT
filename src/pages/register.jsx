import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  theme,
  Typography,
  notification,
  Steps,
  Modal,
} from "antd";
import ConfirmOTP from "../component/confirm_OTP";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { registerApi } from "../util/apis";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

export default function SignUpPage() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const fetAip = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [step, setStep] = useState(1);
  const [sate, setSate] = useState("process");
  const [form] = Form.useForm();
  const [isMount, setIsMount] = useState(false);
  const onFinish = async (values) => {
    const { name, email, password } = values;
    if (fetAip.current) {
      setLoading(true);
      setDisabled(true);
      try {
        await registerApi({
          email: email,
        });
        setDataUser({
          name,
          email,
          password,
        });
        setIsModalOpen(true);
        setIsMount(true);
        fetAip.current = false;
      } catch (error) {
        setDisabled(false);
        notification.error({
          message: "Tạo mới người dùng",
          description:
            error?.response?.data?.EM ||
            "Lỗi trong quá trình đăng ký tài khoản",
        });
      }
      setLoading(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleResetForm = () => {
    form.resetFields();
    setDisabled(false);
    setLoading(false);
    setIsModalOpen(false);
    setStep(1);
    setSate("process");
    fetAip.current = true;
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
  notification.config({ placement: "bottomRight" });

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div>
          <h1 style={{ textAlign: "center", marginBottom: 30 }}>Sign up</h1>
        </div>
        <Form
          form={form}
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
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#595959" : "#1890ff",
                borderColor: loading ? "#434343" : "#1890ff",
                color: loading ? "#fff" : "#fff",
              }}
            >
              Sign up
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Already have an account?</Text>
              <Link to="/login"> Sign in</Link>.
            </div>
          </Form.Item>
        </Form>
      </div>
      {isMount && (
        <Modal
          title={<span style={{ fontSize: "20px" }}>Sign up</span>}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          footer={null}
          maskClosable={false}
        >
          <Steps
            current={step}
            status={sate}
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
          <ConfirmOTP
            // onReload={reloadPage}
            data={{ dataUser, setStep, setSate, form, setIsMount }}
            handleResetForm={handleResetForm}
          />
        </Modal>
      )}
    </section>
  );
}
