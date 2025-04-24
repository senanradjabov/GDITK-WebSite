import { useState, useEffect } from "react";
import { PageWrapper, LoginBox, LoginTitle, LoginWrapper } from "./styled";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { adminPaths } from "@/routers/helpers";
import api from "@/services/request";
import axios, { AxiosError } from "axios";

type FieldType = {
  username?: string;
  password?: string;
};

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  refresh_token: string;
  scheme: string;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    setClientReady(true);
  }, []);

  async function onFinish(formData: FormData) {
    try {
      await api.post<LoginResponse>(
        "/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      navigate(adminPaths.home);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
          messageApi.error({
            content: "Username or Password incorrect!",
            duration: 8,
            style: { fontSize: "18px" },
          });
        } else {
          messageApi.error({
            content: "An incomprehensible mistake!",
            duration: 8,
            style: { fontSize: "18px" },
          });
          console.error("Данные ответа ошибки:", axiosError.response?.data);
        }
      } else {
        console.error("Ошибка:", error);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {contextHolder}
      <PageWrapper>
        <LoginWrapper>
          <LoginBox>
            <LoginTitle>Welcome To GDITK</LoginTitle>
            <Form
              name="login"
              initialValues={{ remember: true }}
              size="large"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                  { max: 20, message: "Continue input to exceed 20 chars" },
                  { min: 5 },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                  { max: 20, message: "Continue input to exceed 20 chars" },
                  { min: 5 },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !clientReady ||
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Log in
                  </Button>
                )}
              </Form.Item>
            </Form>
          </LoginBox>
        </LoginWrapper>
      </PageWrapper>
    </>
  );
};

export default LoginPage;
