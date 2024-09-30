import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { forgotPasswordApi } from "../util/apis";
import { useState } from "react";
const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values) => {
    setLoading(true);
    const { email } = values;
    try {
      const res = await forgotPasswordApi({ email });
      setLoading(false);
      setDisabled(true);
      notification.success({
        message: "Cập nhật mật khẩu",
        description:
          // error?.response?.data?.EM ||
          "Vui lòng truy cập địa chỉ gmail hoàn tất cập nhật mật khẩu",
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Cập nhật mật khẩu",
        description:
          error?.response?.data?.EM || "Lỗi trong quá trình cập nhật mật khẩu",
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  notification.config({ placement: "bottomRight" });
  return (
    <div className="forgotPassword">
      <div className="forgotPassword_card">
        <h2 className="forgotPassword_card-title">Đặt lại mật khẩu</h2>
        <h5 className="card_title-email">Vui lòng nhập gmail của bạn!</h5>

        {/* Form */}
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your gmail!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email phải có định dạng @gmail.com!",
              },
            ]}
          >
            <Input placeholder="Gmail" />
          </Form.Item>

          <Form.Item>
            <Button
              block
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={disabled}
              style={{
                backgroundColor: disabled ? "#595959" : "#1890ff",
                borderColor: disabled ? "#434343" : "#1890ff",
                color: disabled ? "#fff" : "#fff",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Nút quay lại */}
      <div className="back-button">
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={handleGoBack} // Gọi hàm handleGoBack khi nhấn nút
        >
          <ArrowLeftOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
