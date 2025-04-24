import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, message, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

interface NewsData {
  title: string;
  slug?: string;
  description: string;
  is_draft: boolean;
  image?: File;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.schedule}/admin/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.schedule}/admin/delete/${slug}`;
const addUrl = `${adminPaths.schedule}/admin/add`;

const ScheduleUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (slugId) {
      setLoading(true);
      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title } = response.data;
          form.setFieldsValue({ title });
        })
        .catch((error) => {
          message.error(`Failed to load data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleFinish = (values: NewsData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", values.title);

    if (fileList.length > 0) {
      formData.append("document", fileList[0].originFileObj);
    }

    const request = api.post(addUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    request
      .then(() => {
        message.success("saved successfully!");
        navigate("/admin/schedule");
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
          navigate("/admin/schedule");
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Document" name="document">
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose document</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
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
              <Button type="primary" htmlType="submit" loading={loading}>
                {slugId ? "Yenilə" : "Yaratmaq"}
              </Button>
            )}
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default ScheduleUpsetPage;
