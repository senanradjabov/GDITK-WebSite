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
  del_image_1?: boolean;
  del_image_2?: boolean;
  del_image_3?: boolean;
  del_image_4?: boolean;
  del_image_5?: boolean;
  del_image_6?: boolean;
  del_image_7?: boolean;
  del_image_8?: boolean;
  del_image_9?: boolean;
  del_image_10?: boolean;

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
  const [fileList1, setFileList1] = useState<any[]>([]);
  const [fileList2, setFileList2] = useState<any[]>([]);
  const [fileList3, setFileList3] = useState<any[]>([]);
  const [fileList4, setFileList4] = useState<any[]>([]);
  const [fileList5, setFileList5] = useState<any[]>([]);
  const [fileList6, setFileList6] = useState<any[]>([]);
  const [fileList7, setFileList7] = useState<any[]>([]);
  const [fileList8, setFileList8] = useState<any[]>([]);
  const [fileList9, setFileList9] = useState<any[]>([]);
  const [fileList10, setFileList10] = useState<any[]>([]);

  const [desc, setDesc] = useState<string>(" ");
  const [imageId, setImageId] = useState<string>("");

  const [imageId1, setImageId1] = useState<string>("");
  const [imageId2, setImageId2] = useState<string>("");
  const [imageId3, setImageId3] = useState<string>("");
  const [imageId4, setImageId4] = useState<string>("");
  const [imageId5, setImageId5] = useState<string>("");
  const [imageId6, setImageId6] = useState<string>("");
  const [imageId7, setImageId7] = useState<string>("");
  const [imageId8, setImageId8] = useState<string>("");
  const [imageId9, setImageId9] = useState<string>("");
  const [imageId10, setImageId10] = useState<string>("");

  useEffect(() => {
    if (slugId) {
      setLoading(true);
      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title, description, is_draft, image_id, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10 } = response.data;
          setDesc(description);
          setImageId(image_id);
          setImageId1(image_1)
          setImageId2(image_2)
          setImageId3(image_3)
          setImageId4(image_4)
          setImageId5(image_5)
          setImageId6(image_6)
          setImageId7(image_7)
          setImageId8(image_8)
          setImageId9(image_9)
          setImageId10(image_10)
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
  const handleUploadChange1 = ({ fileList }: any) => {
    setFileList1(fileList);
  };
  const handleUploadChange2 = ({ fileList }: any) => {
    setFileList2(fileList);
  };
  const handleUploadChange3 = ({ fileList }: any) => {
    setFileList3(fileList);
  };
  const handleUploadChange4 = ({ fileList }: any) => {
    setFileList4(fileList);
  };
  const handleUploadChange5 = ({ fileList }: any) => {
    setFileList5(fileList);
  };
  const handleUploadChange6 = ({ fileList }: any) => {
    setFileList6(fileList);
  };
  const handleUploadChange7 = ({ fileList }: any) => {
    setFileList7(fileList);
  };
  const handleUploadChange8 = ({ fileList }: any) => {
    setFileList8(fileList);
  };
  const handleUploadChange9 = ({ fileList }: any) => {
    setFileList9(fileList);
  };
  const handleUploadChange10 = ({ fileList }: any) => {
    setFileList10(fileList);
  };

  const handleFinish = (values: NewsData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", desc);
    formData.append("is_draft", String(values.is_draft));

    formData.append("del_image_1", values.del_image_1 == undefined ? "False" : String(values.del_image_1));
    formData.append("del_image_2", values.del_image_2 == undefined ? "False" : String(values.del_image_2));
    formData.append("del_image_3", values.del_image_3 == undefined ? "False" : String(values.del_image_3));
    formData.append("del_image_4", values.del_image_4 == undefined ? "False" : String(values.del_image_4));
    formData.append("del_image_5", values.del_image_5 == undefined ? "False" : String(values.del_image_5));
    formData.append("del_image_6", values.del_image_6 == undefined ? "False" : String(values.del_image_6));
    formData.append("del_image_7", values.del_image_7 == undefined ? "False" : String(values.del_image_7));
    formData.append("del_image_8", values.del_image_8 == undefined ? "False" : String(values.del_image_8));
    formData.append("del_image_9", values.del_image_9 == undefined ? "False" : String(values.del_image_9));
    formData.append("del_image_10", values.del_image_10 == undefined ? "False" : String(values.del_image_10));

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }
    if (fileList1.length > 0) {
      formData.append("image_1", fileList1[0].originFileObj);
    }
    if (fileList2.length > 0) {
      formData.append("image_2", fileList2[0].originFileObj);
    }
    if (fileList3.length > 0) {
      formData.append("image_3", fileList3[0].originFileObj);
    }
    if (fileList4.length > 0) {
      formData.append("image_4", fileList4[0].originFileObj);
    }
    if (fileList5.length > 0) {
      formData.append("image_5", fileList5[0].originFileObj);
    }
    if (fileList6.length > 0) {
      formData.append("image_6", fileList6[0].originFileObj);
    }
    if (fileList7.length > 0) {
      formData.append("image_7", fileList7[0].originFileObj);
    }
    if (fileList8.length > 0) {
      formData.append("image_8", fileList8[0].originFileObj);
    }
    if (fileList9.length > 0) {
      formData.append("image_9", fileList9[0].originFileObj);
    }
    if (fileList10.length > 0) {
      formData.append("image_10", fileList10[0].originFileObj);
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

        {/* 0 */}
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
        <Form.Item label="Bas Şəkil" name="image">
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

        {/* 1 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId1}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 1" name="image1">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange1}
            maxCount={1}
          >
            {fileList1.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>
        {/* 2 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId2}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 2" name="image2">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange2}
            maxCount={1}
          >
            {fileList2.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>
        {/* 3 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId3}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 3" name="image3">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange3}
            maxCount={1}
          >
            {fileList3.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 4 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId4}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 4" name="image4">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange4}
            maxCount={1}
          >
            {fileList4.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 5 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId5}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 5" name="image5">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange5}
            maxCount={1}
          >
            {fileList5.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 6 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId6}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 6" name="image6">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange6}
            maxCount={1}
          >
            {fileList6.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 7 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId7}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 7" name="image7">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange7}
            maxCount={1}
          >
            {fileList7.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 8 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId8}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 8" name="image8">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange8}
            maxCount={1}
          >
            {fileList8.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 9 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId9}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil" name="image9">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange9}
            maxCount={1}
          >
            {fileList9.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {/* 10 */}
        {slugId && (
          <Form.Item
            label="Şəkil Preview"
            name="image-preview"
            valuePropName="imagePreview"
          >
            <Image
              width={200}
              src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${imageId10}`}
            />
          </Form.Item>
        )}
        <Form.Item label="Şəkil 10" name="image10">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange10}
            maxCount={1}
          >
            {fileList10.length < 1 && (
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            )}
          </Upload>
        </Form.Item>

        {slugId && (
          <>
            <Form.Item label="Del image 1" name="del_image_1" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 2" name="del_image_2" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 3" name="del_image_3" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 4" name="del_image_4" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 5" name="del_image_5" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 6" name="del_image_6" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 7" name="del_image_7" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 8" name="del_image_8" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 9" name="del_image_9" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Del image 10" name="del_image_10" valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        )}

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
