import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Flex,
  Select,
  Image,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import api from "@/services/request";
import TextRedactor from "@/components/AdminComponents/TextRedactor";
import { adminPaths } from "@/routers/helpers";
import { NoneDiv } from "./styled";

const { Option } = Select;

interface StaffMember {
  id?: number;
  first_name: string;
  last_name: string;
  position: string;
  department_id: number;
  phone_number: string;
  email: string;
  description: string;
  image?: File;
}

interface DepartmentData {
  id: number;
  name: string;
  slug?: string;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.staff}/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.staff}/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.staff}/delete/${slug}`;
const addUrl = `${adminPaths.staff}/add`;
const getDepartmentUrl = `${adminPaths.department}`;

const StaffUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState<DepartmentData[]>(
    []
  );
  const [desc, setDesc] = useState<string>(" ");
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    if (slugId) {
      setLoading(true);

      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const {
            first_name,
            last_name,
            image,
            description,
            position,
            phone_number,
            email,
            department_id,
          } = response.data;
          setDesc(description);
          setImageId(image);

          form.setFieldsValue({
            first_name: first_name,
            last_name: last_name,
            position: position,
            phone_number: phone_number,
            email: email,
            department_id: department_id,
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

  useEffect(() => {
    api
      .get(getDepartmentUrl, { withCredentials: true })
      .then((response) => {
        setDepartmentOptions(response.data);
      })
      .catch(() => {
        message.error("Ошибка загрузки данных сотрудников");
      });
  }, []);

  const handleFinish = (values: StaffMember) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("position", values.position);
    formData.append("phone_number", values.phone_number);
    formData.append("email", values.email);
    formData.append("description", desc);
    formData.append("department_id", String(values.department_id));

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
        navigate(`/admin/${adminPaths.staff}`);
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
          navigate(`/admin/${adminPaths.staff}`);
        })
        .catch((error) => {
          message.error(`Failed to delete news. \n${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <>
      <h1>{slugId ? "Redak elə" : "Yaratmaq"}</h1>

      <Form
        form={form}
        layout="vertical"
        {...formItemLayout}
        onFinish={handleFinish}
        initialValues={{ defaultValue: 0 }}
      >
        <Form.Item
          label="Adı"
          name="first_name"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        <Form.Item
          label="Soyad"
          name="last_name"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        <Form.Item
          label="Vəzifə"
          name="position"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        <Form.Item
          label="Telefon nömrəsi"
          name="phone_number"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        <Form.Item label="Təsvir" name="description">
          <NoneDiv>{desc}</NoneDiv>
          <TextRedactor
            value={desc}
            onChange={(value: string) => setDesc(value)}
          />
        </Form.Item>

        <Form.Item
          name="department_id"
          label="Şöbələr"
          rules={[{ required: true, message: "Выберите отдел" }]}
        >
          <Select placeholder="Выберите" loading={loading}>
            <Option key={0} value={"0"}>
              None
            </Option>

            {departmentOptions.map((department) => (
              <Option key={department.id} value={department.id}>
                {department.name}
              </Option>
            ))}
          </Select>
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
              <Button icon={<UploadOutlined />}>Şəkil seçin</Button>
            )}
          </Upload>
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

export default StaffUpsetPage;
