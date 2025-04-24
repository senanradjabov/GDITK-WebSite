import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Switch,
  Button,
  Upload,
  message,
  Image,
  Flex,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import api from "@/services/request";
import TextRedactor from "@/components/AdminComponents/TextRedactor";
import { adminPaths } from "@/routers/helpers";
import { NoneDiv } from "./styled";

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

const getUrl = (slug: string) => `${adminPaths.newsList}/admin/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.newsList}/admin/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.newsList}/admin/delete/${slug}`;
const addUrl = `${adminPaths.newsList}/admin/add`;

const NewsForm: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [desc, setDesc] = useState<string>(" ");
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    if (slugId) {
      setLoading(true);
      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title, description, is_draft, image_id } = response.data;
          setDesc(description);
          setImageId(image_id);
          form.setFieldsValue({ title, is_draft });
        })
        .catch((error) => {
          message.error(`Failed to load news data.\n ${error}`);
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
    formData.append("description", desc);
    formData.append("is_draft", String(values.is_draft));

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    const request = slugId
      ? api.put(updateUrl(slugId), formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
      : api.post(addUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

    request
      .then(() => {
        message.success("News saved successfully!");
        navigate("/admin/news");
      })
      .catch((error) => {
        message.error(`Failed to save news. \n${error}`);
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
          message.success("News delete successfully!");
          navigate("/admin/news");
        })
        .catch((error) => {
          message.error(`Failed to delete news. \n${error}`);
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
          label="Başlıq"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Təsvir" name="description">
          <NoneDiv>{desc}</NoneDiv>
          <TextRedactor
            value={desc}
            onChange={(value: string) => setDesc(value)}
          />
        </Form.Item>

        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil" name="image">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Qaralama" name="is_draft" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              {slugId ? "Yenilə" : "Yaratmaq"}
            </Button>
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

export default NewsForm;
