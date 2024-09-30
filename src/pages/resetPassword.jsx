import { useState } from "react";
import text from "../constants/text";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input,notification} from "antd";
import {resetPasswordApi} from"../util/apis"
const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const urlParams = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values) => {
    setLoading(true)
    const{password}=values
    const user_id=urlParams.get('user_id');
    const token=urlParams.get('token')
    try {
    const res= await resetPasswordApi({
      user_id,
      token,
      password,
     })
    
     notification.success({
      message:"Cập nhật mật khẩu",
      description: res?.data?.EM || text.success,
    });
    navigate("/login");
    } catch (error) {
      notification.error({
        message:"Cập nhật mật khẩu",
        description:"Lỗi trong quá trình cập nhật mật khẩu",
      });
      navigate("/forgot-password");
    }

  };

  return (
    <div className="forgotPassword">
      <div className="forgotPassword_card">
        <h2 className="forgotPassword_card-title">Đặt lại mật khẩu</h2>

        {/* Form */}
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password"/>
          </Form.Item>

          <Form.Item
            name="ConfirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu của bạn!",
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
            <Input.Password placeholder="Confirm Password"/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block htmlType="submit" type="primary" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
