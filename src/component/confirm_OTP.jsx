import { useState, useEffect, useRef } from "react";
import { Button, Form, notification } from "antd";
import { InputOTP } from "antd-input-otp";
import { useNavigate } from "react-router-dom";
import { confirmOtp } from "../util/apis";
import text from "../constants/text";

const ConfirmOTP = ({ data, handleResetForm }) => {
  const { dataUser, setStep, setSate,setIsMount } = data;
  const [time, setTime] = useState(60);
  const timerId = useRef();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (time > 0) {
      timerId.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }else{
      window.location.reload();
    }
    return () => clearInterval(timerId.current);
  }, [time]);

  const handleComfirmOTP = async (values) => {
    const { otp } = values;

    if (!otp || otp.includes(undefined) || otp.includes("")) {
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."],
        },
      ]);
    }
    const strOtp = otp.join("");
    setLoading(true);
    try {
      const res = await confirmOtp({ otp: strOtp, dataUser });
      if (res?.data?.EC === 1) {
        setStep(3);
        notification.success({
          message: "Tạo mới người dùng",
          description: res?.data?.EM || text.success,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      notification.error({
        message: "Tạo mới người dùng",
        description: error?.response?.data?.EM || text.error,
      });
      if (error?.response?.data?.EC === 102) {
        handleOTPError();
      } else {
        setLoading(false);
      }
    }
  };
  const handleOTPError = () => {
    setSate("error");
    clearInterval(timerId.current);
    setTimeout(() => {
      setIsMount(false)
      handleResetForm?.();
    }, 1000);
  };
  return (
    <div className="Confirm_otp">
      <div className="Confirm_otp-card">
        <h5 style={{ fontSize: 16, textAlign: "center" }}>
          Mã sẽ được gửi về Gmail: <span>{dataUser.email}</span>
        </h5>
        <h5 className="second">{time}</h5>
        <Form form={form} onFinish={handleComfirmOTP}>
          <Form.Item
            name="otp"
            className="center-error-message"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <InputOTP autoFocus inputType="numeric" length={6} />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              block
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#595959" : "#1890ff",
                borderColor: loading ? "#434343" : "#1890ff",
                color: loading ? "#fff" : "#fff",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmOTP;
