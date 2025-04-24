import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, message, Flex } from "antd";

import api from "@/services/request";
import TextRedactor from "@/components/AdminComponents/TextRedactor";
import { adminPaths } from "@/routers/helpers";
import { NoneDiv } from "./styled";

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = adminPaths.history;
const updateUrl = `${adminPaths.history}/update`;

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState<string>(" ");

  useEffect(() => {
    setLoading(true);
    api
      .get(getUrl, { withCredentials: true })
      .then((response) => {
        const { description } = response.data;
        setDesc(description);
      })
      .catch((error) => {
        message.error(`Failed to load data.\n ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  const handleFinish = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("description", desc);

    const request = api.post(updateUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    request
      .then(() => {
        message.success("Saved successfully!");
        navigate("/history");
      })
      .catch((error) => {
        message.error(`Failed to save. \n${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>Redak elə</h1>

      <Form
        form={form}
        layout="vertical"
        {...formItemLayout}
        onFinish={handleFinish}
        initialValues={{ is_draft: true }}
      >
        <Form.Item label="Təsvir" name="description">
          <NoneDiv>{desc}</NoneDiv>
          <TextRedactor
            value={desc}
            onChange={(value: string) => setDesc(value)}
          />
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              Yenilə
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default HistoryPage;
