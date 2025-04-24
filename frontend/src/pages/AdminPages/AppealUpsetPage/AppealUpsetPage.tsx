import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Flex } from "antd";

import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const { TextArea } = Input;

const getUrl = (slug: string) => `/appeal/${slug}`;
const deleteUrl = (slug: string) => `/appeal/delete/${slug}`;

const formatDateTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("az-AZ", options);
};

const AppealUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slugId) {
      setLoading(true);

      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { created_at, first_name, last_name, phone, email, message } =
            response.data;

          form.setFieldsValue({
            created_at: formatDateTime(created_at),
            first_name,
            last_name,
            phone,
            email,
            message,
          });
        })
        .catch((error) => {
          message.error(`Failed to load data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);

  const handleDelete = () => {
    if (slugId) {
      const request = api.delete(deleteUrl(slugId), {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      request
        .then(() => {
          message.success("delete successfully!");
          navigate(`/admin/${adminPaths.appeal}`);
        })
        .catch((error) => {
          message.error(`Failed to delete. \n${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <h1>{slugId ? "Redak elə" : "Yaratmaq"}</h1>

      <Form form={form} layout="vertical" {...formItemLayout}>
        <Form.Item label="Tarix" name="created_at">
          <Input />
        </Form.Item>
        <Form.Item label="first_name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="last_name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="message" name="message">
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
            <Button
              type="primary"
              loading={loading}
              color="danger"
              onClick={() => handleDelete()}
            >
              Sil
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default AppealUpsetPage;
