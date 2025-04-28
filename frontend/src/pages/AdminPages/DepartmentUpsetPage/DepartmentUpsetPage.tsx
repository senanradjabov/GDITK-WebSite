import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Flex, Select, InputNumber } from "antd";

import api from "@/services/request";
import TextRedactor from "@/components/AdminComponents/TextRedactor";
import { adminPaths } from "@/routers/helpers";
import { NoneDiv } from "./styled";

const { Option } = Select;

interface StaffMember {
  id: number;
  first_name: string;
  last_name: string;
}

interface DepartmentData {
  id: number;
  name: string;
  slug?: string;
  description: string;
  head_of_department_id: number;
  order: number;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.department}/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.department}/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.department}/delete/${slug}`;
const addUrl = `${adminPaths.department}/add`;
const getStaffUrl = `${adminPaths.staff}`;

const DepartmentUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [staffOptions, setStaffOptions] = useState<StaffMember[]>([]);
  const [desc, setDesc] = useState<string>(" ");

  useEffect(() => {
    if (slugId) {
      setLoading(true);

      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { name, description, head_of_department_id, order } = response.data;
          setDesc(description);

          form.setFieldsValue({
            name: name,
            head_of_department_id: head_of_department_id,
            order: order
          });
        })
        .catch((error) => {
          message.error(`Failed to load news data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);

  useEffect(() => {
    api
      .get(getStaffUrl, { withCredentials: true })
      .then((response) => {
        setStaffOptions(response.data);
      })
      .catch(() => {
        message.error("Ошибка загрузки данных сотрудников");
      });
  }, []);

  const handleFinish = (values: DepartmentData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("order", String(values.order));
    formData.append("description", desc);
    formData.append(
      "head_of_department_id",
      String(values.head_of_department_id)
    );

    const request = slugId
      ? api.put(updateUrl(slugId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      : api.post(
        addUrl,
        {
          name: values.name,
          description: desc,
          head_of_department_id: values.head_of_department_id, // Отправляется как число
          order: values.order
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

    request
      .then(() => {
        message.success("Saved successfully!");
        navigate(`/admin/${adminPaths.department}`);
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
          message.success("News delete successfully!");
          navigate(`/admin/${adminPaths.department}`);
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
      >
        <Form.Item
          label="Başlıq"
          name="name"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Order"
          name="order"
          rules={[{ required: true, message: "Please enter the order number" }]}
        >
          <InputNumber placeholder="Enter order number" style={{ width: '100%' }} />
        </Form.Item>


        <Form.Item label="Təsvir" name="description">
          <NoneDiv>{desc}</NoneDiv>
          <TextRedactor
            value={desc}
            onChange={(value: string) => setDesc(value)}
          />
        </Form.Item>

        <Form.Item
          name="head_of_department_id"
          label="Rəhbər"
          rules={[{ required: true, message: "Şöbə müdirini seçin" }]}
        >
          <Select placeholder="Выберите руководителя" loading={loading}>
            {staffOptions.map((staff) => (
              <Option key={staff.id} value={staff.id}>
                {staff.first_name} {staff.last_name}
              </Option>
            ))}
          </Select>
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

export default DepartmentUpsetPage;
