import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, message, Image, Flex, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

interface NewsData {
  title: string;
  image?: File;
  is_first: boolean;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.gallerySlider}/id/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.gallerySlider}/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.gallerySlider}/delete/${slug}`;
const addUrl = `${adminPaths.gallerySlider}/add`;

const GallerySliderUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    if (slugId) {
      setLoading(true);
      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title, image_id, is_first } = response.data;
          setImageId(image_id);
          form.setFieldsValue({ title, is_first });
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

    if (values.is_first === undefined)
      values.is_first = false

    formData.append("title", values.title);
    formData.append("is_first", String(values.is_first));

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
        message.success("saved successfully!");
        navigate(`/admin/${adminPaths.gallerySlider}`);
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
          message.success("Delete successfully!");
          navigate(`/admin/${adminPaths.gallerySlider}`);
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
          label="Başlıq"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
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

        <Form.Item label="Birinci" name="is_first" valuePropName="checked">
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

export default GallerySliderUpsetPage;
