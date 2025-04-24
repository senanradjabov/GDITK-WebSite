import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";
import api from "@/services/request";
import { pathPublic } from "@/routers/helpers";
import { Helmet } from 'react-helmet-async';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

  .form-wrapper {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }

  h2 {
    margin-bottom: 16px;
    color: #000;
  }
`;

const AppealPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", values.message);

      const request = api.post(`${pathPublic.appeal}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      request
        .then(() => {
          message.success("Müraciət uğurla göndərildi!");
        })
        .catch((error) => {
          message.error(`Error `, error);
        });
    } catch (error) {
      console.log(error);
      message.error("Müraciət göndərərkən səhv oldu.",);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Müraciət</title>
      </Helmet>

      <FormContainer>
        <div className="form-wrapper">
          <h2>Müraciət</h2>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark="optional"
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: "",
            }}
          >
            <Form.Item
              label="Ad"
              name="firstName"
              rules={[{ required: true, message: "Adınızı qeyd edin" }]}
            >
              <Input placeholder="Adınızı qeyd edin" />
            </Form.Item>

            <Form.Item
              label="Soyad"
              name="lastName"
              rules={[{ required: true, message: "Soyadınızı qeyd edin" }]}
            >
              <Input placeholder="Soyadınızı qeyd edin" />
            </Form.Item>

            <Form.Item
              label="Mail"
              name="email"
              rules={[
                { required: true, message: "Poçtu göstərin" },
                { type: "email", message: "Poçtu göstərin" },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>

            <Form.Item
              label="Əlaqə nömrəsi"
              name="phone"
              rules={[
                { required: true, message: "Əlaqə nömrəsini qeyd edin" },
                {
                  // pattern: /^[0-9+()\- ]+$/,
                  pattern:
                    /^(?:\+994\s?|0)(50|51|55|70|77)\s?\d{3}\s?\d{2}\s?\d{2}$/,
                  message: "Əlaqə nömrəsini duz qeyd edin",
                },
              ]}
            >
              <Input placeholder="+994 (00) 123-45-67" />
            </Form.Item>

            <Form.Item
              label="Müraciətiniz"
              name="message"
              rules={[{ required: true, message: "Müraciətinizi yazın" }]}
            >
              <Input.TextArea rows={4} placeholder="Müraciətinizi yazın" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Göndər
              </Button>
            </Form.Item>
          </Form>
        </div>
      </FormContainer>
    </>
  );
};

export default AppealPage;
