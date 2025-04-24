import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Flex,
} from "antd";
import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

interface NewsData {
  username: string;
  password: string;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.user}/user/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.user}/delete/${slug}`;
const addUrl = `${adminPaths.user}/register`;

const UserUpsetPage: React.FC = () => {
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
          const { username } = response.data;
          form.setFieldsValue({ username });
        })
        .catch((error) => {
          message.error(`Failed to load data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);

  const handleFinish = (values: NewsData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);

    const request = api.post(addUrl, {
      username: values.username,
      password: values.password
    }, {
      withCredentials: true,
    });

    request
      .then(() => {
        message.success("saved successfully!");
        navigate("/admin/auth");
      })
      .catch((error) => {
        message.error(`Failed to save. \n${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (slugId) {
      const request = api.delete(deleteUrl(slugId), {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      request
        .then(() => {
          message.success("delete successfully!");
          navigate("/admin/auth");
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

      <Form
        form={form}
        layout="vertical"
        {...formItemLayout}
        onFinish={handleFinish}
        initialValues={{ is_draft: true }}
      >
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input placeholder="Enter password" />
        </Form.Item>


        <Form.Item>
          <Flex gap="small" wrap>
            {
              slugId ? "" : <Button type="primary" htmlType="submit" loading={loading}>
                Yaratmaq
              </Button>
            }
            {slugId ? (
              <Button
                type="primary"
                loading={loading}
                color="danger"
                onClick={() => handleDelete()}
              >
                Sil
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserUpsetPage;
